from pathlib import Path
import re

patched = 0

for f in Path("dist").rglob("*.js"):
    try:
        txt = f.read_text(encoding="utf-8")
    except:
        continue

    new_txt = re.sub(
        r"(from\s+['\"])(\.[^'\"]+?)(['\"])",
        lambda m: (
            m.group(1)
            + (m.group(2) if m.group(2).endswith(".js")
               else m.group(2) + ".js")
            + m.group(3)
        ),
        txt,
    )

    if new_txt != txt:
        f.write_text(new_txt, encoding="utf-8")
        patched += 1

print("PATCHED_FILES =", patched)
