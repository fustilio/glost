/**
 * Transcription Schema Migration Utilities
 *
 * Utilities for migrating GLOST documents to v0.4.0 transcription schema
 * (removes redundant system field from transcription objects)
 *
 * @packageDocumentation
 */
/**
 * Migrate transcription schema to v0.4.0 format
 *
 * Removes the redundant `system` field from transcription objects.
 * The system is already the key in the transcription record.
 *
 * @param doc - GLOST document to migrate
 * @param options - Migration options
 * @returns Migration result with statistics
 *
 * @example
 * ```typescript
 * // Before (v0.3.x):
 * {
 *   "transcription": {
 *     "ipa": {
 *       "text": "həˈloʊ",
 *       "system": "ipa"  // ← Redundant
 *     }
 *   }
 * }
 *
 * // After (v0.4.0):
 * {
 *   "transcription": {
 *     "ipa": {
 *       "text": "həˈloʊ"
 *     }
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * import { migrateTranscriptionSchema } from 'glost-utils';
 *
 * const result = migrateTranscriptionSchema(document);
 *
 * console.log(`Updated ${result.transcriptionsUpdated} transcriptions`);
 * console.log(`Processed ${result.nodesProcessed} nodes`);
 * ```
 */
export function migrateTranscriptionSchema(doc, options = {}) {
    const { dryRun = false } = options;
    const result = {
        transcriptionsUpdated: 0,
        nodesProcessed: 0,
        hasChanges: false,
        changes: [],
    };
    /**
     * Recursively process nodes
     */
    function processNode(node, path = []) {
        // Check if node has transcription field
        if ('transcription' in node && node.transcription && typeof node.transcription === 'object') {
            const transcription = node.transcription;
            const systemsUpdated = [];
            let nodeHasChanges = false;
            // Process each transcription system
            for (const [system, data] of Object.entries(transcription)) {
                if (data && typeof data === 'object' && 'system' in data) {
                    // Found redundant system field
                    if (!dryRun) {
                        // Remove the system field
                        const { system: _, ...rest } = data;
                        transcription[system] = rest;
                    }
                    systemsUpdated.push(system);
                    nodeHasChanges = true;
                    result.transcriptionsUpdated++;
                }
            }
            if (nodeHasChanges) {
                result.nodesProcessed++;
                result.hasChanges = true;
                const nodePath = path.length > 0 ? path.join('.') : 'root';
                result.changes.push({
                    path: nodePath,
                    systems: systemsUpdated,
                });
            }
        }
        // Process children
        if ('children' in node && Array.isArray(node.children)) {
            node.children.forEach((child, index) => {
                processNode(child, [...path, 'children', String(index)]);
            });
        }
    }
    processNode(doc);
    return result;
}
/**
 * Check if a document needs transcription schema migration
 *
 * @param doc - GLOST document to check
 * @returns True if migration is needed
 */
export function needsTranscriptionMigration(doc) {
    const result = migrateTranscriptionSchema(doc, { dryRun: true });
    return result.hasChanges;
}
/**
 * Get details about transcription schema migration needs
 *
 * @param doc - GLOST document to analyze
 * @returns Migration analysis
 */
export function analyzeTranscriptionMigration(doc) {
    return migrateTranscriptionSchema(doc, { dryRun: true });
}
//# sourceMappingURL=migrate-transcription-schema.js.map