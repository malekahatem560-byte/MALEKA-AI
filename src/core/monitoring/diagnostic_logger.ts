export class DiagnosticLogger {
    public logError(error: Error, context: string) {
        console.error(`[DIAGNOSTIC][${context}] ${error.message}`);
    }
}
