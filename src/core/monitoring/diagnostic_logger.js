"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosticLogger = void 0;
class DiagnosticLogger {
    logError(error, context) {
        console.error(`[DIAGNOSTIC][${context}] ${error.message}`);
    }
}
exports.DiagnosticLogger = DiagnosticLogger;
