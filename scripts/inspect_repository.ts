/**
 * scripts/inspect_repository.ts
 *
 * Produces:
 * - module_imports.json
 * - module_revdeps.json
 * - exports.json
 * - reachability.json
 * - duplicate_pairs.json
 * - cycles.json
 * - broken_imports.json
 * - runtime_side_effects.json
 *
 * Usage: npx ts-node scripts/inspect_repository.ts
 */

import fs from 'fs';
import path from 'path';
import ts from 'typescript';

const repoRoot = path.resolve(__dirname, '..');

function readAllFiles(dir: string, files: string[] = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['.git', 'node_modules', 'archive', 'dist'].includes(e.name)) continue;
      readAllFiles(p, files);
    } else {
      files.push(p);
    }
  }
  return files;
}

function isTextFile(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  return ['.ts', '.tsx', '.js', '.jsx', '.json', '.mjs', '.cjs', '.md', '.html', '.css', '.sh', '.py', '.txt'].includes(ext);
}

function parseFileImports(filePath: string) {
  const text = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, text, ts.ScriptTarget.ESNext, true);
  const imports: string[] = [];
  const exports: string[] = [];
  let hasTopLevelSideEffects = false;

  function visit(node: ts.Node) {
    if (ts.isImportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      imports.push(node.moduleSpecifier.text);
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      imports.push(node.moduleSpecifier.text);
    } else if (ts.isCallExpression(node)) {
      const expr = node.expression.getText(sourceFile);
      if (expr === 'require' && node.arguments.length > 0) {
        const arg = node.arguments[0];
        if (ts.isStringLiteral(arg)) imports.push(arg.text);
      } else if (expr === 'import' && node.arguments.length > 0) {
        const arg = node.arguments[0];
        if (ts.isStringLiteral(arg)) imports.push(arg.text);
      }
    } else if (ts.isExportAssignment(node) || ts.isExportDeclaration(node) || ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isVariableStatement(node)) {
      // crude detection of an exported symbol name
      if ((node as any).name && (node as any).name.escapedText) {
        exports.push((node as any).name.escapedText.toString());
      }
    } else if (ts.isExpressionStatement(node)) {
      // Top-level expression -> side effect
      const parent = node.parent;
      if (parent && parent.kind === ts.SyntaxKind.SourceFile) {
        hasTopLevelSideEffects = true;
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return { imports, exports, hasTopLevelSideEffects, text };
}

function resolveImport(fromFile: string, importPath: string): string | null {
  if (importPath.startsWith('.') || importPath.startsWith('/')) {
    const candidateExts = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '/index.ts', '/index.tsx', '/index.js', '/index.jsx'];
    const base = path.resolve(path.dirname(fromFile), importPath);
    for (const ext of candidateExts) {
      const p = base.endsWith(ext) ? base : base + ext;
      if (fs.existsSync(p)) return path.relative(repoRoot, p);
    }
    // also try as-is
    if (fs.existsSync(base)) return path.relative(repoRoot, base);
    return null;
  } else {
    // external module
    return importPath;
  }
}

function main() {
  const allFiles = readAllFiles(repoRoot).filter(isTextFile);
  const modules: Record<string, any> = {};
  for (const f of allFiles) {
    const rel = path.relative(repoRoot, f);
    try {
      const { imports, exports, hasTopLevelSideEffects, text } = parseFileImports(f);
      modules[rel] = { imports, exports, hasTopLevelSideEffects };
    } catch (err) {
      modules[rel] = { imports: [], exports: [], hasTopLevelSideEffects: false, parseError: String(err) };
    }
  }

  // Resolve imports
  const module_imports: Record<string, string[]> = {};
  for (const [mod, meta] of Object.entries(modules)) {
    module_imports[mod] = [];
    for (const imp of meta.imports) {
      const resolved = resolveImport(path.join(repoRoot, mod), imp);
      module_imports[mod].push(resolved || `UNRESOLVED:${imp}`);
    }
  }

  const module_revdeps: Record<string, string[]> = {};
  for (const [mod, imports] of Object.entries(module_imports)) {
    for (const imp of imports) {
      if (!module_revdeps[imp]) module_revdeps[imp] = [];
      module_revdeps[imp].push(mod);
    }
  }

  // Find .ts/.js pairs
  const byBase: Record<string, string[]> = {};
  for (const f of Object.keys(modules)) {
    const base = f.replace(/(\.ts|\.tsx|\.js|\.jsx)$/, '');
    (byBase[base] ||= []).push(f);
  }
  const duplicate_pairs: Record<string, string[]> = {};
  for (const [base, files] of Object.entries(byBase)) {
    if (files.length > 1) duplicate_pairs[base] = files;
  }

  // Reachability: start from src/index.ts and src/core/maleka_engine.ts and frontend entry if present
  const entrypoints = ['src/index.ts', 'src/core/maleka_engine.ts'];
  // detect frontend entry (vite typical entries)
  const frontendCandidates = Object.keys(modules).filter(p => p.startsWith('frontend/') && (p.endsWith('main.tsx') || p.endsWith('main.ts') || p.endsWith('index.tsx') || p.endsWith('index.ts')));
  if (frontendCandidates.length) frontendCandidates.forEach(e => entrypoints.push(e));
  // also consider src/ui/pages/Dashboard.tsx referenced in root package.json scripts (if present)
  if (fs.existsSync(path.join(repoRoot, 'src', 'ui', 'pages', 'Dashboard.tsx'))) {
    entrypoints.push('src/ui/pages/Dashboard.tsx');
  }

  function computeReachable(starts: string[]) {
    const seen = new Set<string>();
    const stack = starts.slice();
    while (stack.length) {
      const cur = stack.pop()!;
      if (!cur || seen.has(cur)) continue;
      seen.add(cur);
      const imports = module_imports[cur] || [];
      for (const imp of imports) {
        if (!imp) continue;
        // only traverse internal modules
        if (!imp.startsWith('UNRESOLVED:') && !(imp.startsWith('.') || imp.startsWith('/')) && !imp.includes('/')) {
          // external: skip
          continue;
        }
        // normalize
        const target = imp.startsWith('UNRESOLVED:') ? null : imp;
        if (target && !seen.has(target)) stack.push(target);
      }
    }
    return Array.from(seen);
  }

  const reachable = computeReachable(entrypoints);

  // detect cycles (simple DFS)
  const cycles: string[][] = [];
  function dfs(node: string, stack: string[], visited: Set<string>) {
    if (stack.includes(node)) {
      const idx = stack.indexOf(node);
      cycles.push(stack.slice(idx).concat(node));
      return;
    }
    if (visited.has(node)) return;
    visited.add(node);
    const imports = module_imports[node] || [];
    for (const imp of imports) {
      if (imp && !imp.toString().startsWith('UNRESOLVED:')) {
        dfs(imp.toString(), stack.concat(node), visited);
      }
    }
  }
  dfs(entrypoints[0], [], new Set());

  // broken imports: any import that resolved to UNRESOLVED:...
  const broken_imports: Record<string, string[]> = {};
  for (const [mod, imports] of Object.entries(module_imports)) {
    for (const imp of imports) {
      if (typeof imp === 'string' && imp.startsWith('UNRESOLVED:')) {
        (broken_imports[mod] ||= []).push(imp.replace('UNRESOLVED:', ''));
      }
    }
  }

  // runtime side effects
  const runtime_side_effects: string[] = [];
  for (const [mod, meta] of Object.entries(modules)) {
    if (meta.hasTopLevelSideEffects) runtime_side_effects.push(mod);
  }

  // write artifacts
  const out = path.join(repoRoot, 'analysis');
  if (!fs.existsSync(out)) fs.mkdirSync(out);
  fs.writeFileSync(path.join(out, 'module_imports.json'), JSON.stringify(module_imports, null, 2));
  fs.writeFileSync(path.join(out, 'module_revdeps.json'), JSON.stringify(module_revdeps, null, 2));
  fs.writeFileSync(path.join(out, 'exports.json'), JSON.stringify(Object.fromEntries(Object.entries(modules).map(([k, v]) => [k, v.exports])), null, 2));
  fs.writeFileSync(path.join(out, 'duplicate_pairs.json'), JSON.stringify(duplicate_pairs, null, 2));
  fs.writeFileSync(path.join(out, 'cycles.json'), JSON.stringify(cycles, null, 2));
  fs.writeFileSync(path.join(out, 'broken_imports.json'), JSON.stringify(broken_imports, null, 2));
  fs.writeFileSync(path.join(out, 'runtime_side_effects.json'), JSON.stringify(runtime_side_effects, null, 2));
  fs.writeFileSync(path.join(out, 'entrypoints.json'), JSON.stringify(entrypoints, null, 2));
  fs.writeFileSync(path.join(out, 'reachable.json'), JSON.stringify(reachable, null, 2));

  console.log('Analysis written to analysis/*');
}

main();
