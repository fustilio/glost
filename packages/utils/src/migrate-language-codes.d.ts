/**
 * Language Code Migration Utilities
 *
 * Utilities for migrating GLOST documents to use BCP-47 standard language codes
 *
 * @packageDocumentation
 */
import type { GLOSTRoot } from 'glost';
/**
 * Options for language code migration
 */
export interface MigrateLanguageCodesOptions {
    /** Add default regions to bare language codes (e.g., "en" → "en-US") */
    addDefaultRegions?: boolean;
    /** Convert ISO 639-3 codes to ISO 639-1 (e.g., "tha" → "th") */
    convertISO639_3?: boolean;
    /** Dry run - return what would change without modifying */
    dryRun?: boolean;
}
/**
 * Migration result information
 */
export interface MigrationResult {
    /** Number of nodes updated */
    nodesUpdated: number;
    /** Changes made */
    changes: Array<{
        path: string;
        oldCode: string;
        newCode: string;
    }>;
    /** Whether any changes were made */
    hasChanges: boolean;
}
/**
 * Migrate language codes in a GLOST document to BCP-47 standard
 *
 * @param doc - GLOST document to migrate
 * @param options - Migration options
 * @returns Migration result with statistics
 *
 * @example
 * ```typescript
 * import { migrateLanguageCodes } from 'glost-utils';
 *
 * const result = migrateLanguageCodes(document, {
 *   addDefaultRegions: true,
 *   convertISO639_3: true
 * });
 *
 * console.log(`Updated ${result.nodesUpdated} nodes`);
 * result.changes.forEach(change => {
 *   console.log(`${change.path}: ${change.oldCode} → ${change.newCode}`);
 * });
 * ```
 */
export declare function migrateLanguageCodes(doc: GLOSTRoot, options?: MigrateLanguageCodesOptions): MigrationResult;
/**
 * Migrate language codes in translation extras
 *
 * @param doc - GLOST document
 * @param options - Migration options
 * @returns Migration result
 */
export declare function migrateTranslationLanguageCodes(doc: GLOSTRoot, options?: MigrateLanguageCodesOptions): MigrationResult;
/**
 * Migrate all language codes in a document (both lang fields and translations)
 *
 * @param doc - GLOST document
 * @param options - Migration options
 * @returns Combined migration result
 */
export declare function migrateAllLanguageCodes(doc: GLOSTRoot, options?: MigrateLanguageCodesOptions): MigrationResult;
//# sourceMappingURL=migrate-language-codes.d.ts.map