/**
 * Language Code Migration Utilities
 *
 * Utilities for migrating GLOST documents to use BCP-47 standard language codes
 *
 * @packageDocumentation
 */
import { normalizeLanguageCode } from 'glost-common';
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
export function migrateLanguageCodes(doc, options = {}) {
    const { addDefaultRegions = true, convertISO639_3 = true, dryRun = false, } = options;
    const result = {
        nodesUpdated: 0,
        changes: [],
        hasChanges: false,
    };
    /**
     * Recursively process nodes
     */
    function processNode(node, path = []) {
        // Skip if no lang field
        if (!('lang' in node) || !node.lang) {
            // Process children if present
            if ('children' in node && Array.isArray(node.children)) {
                node.children.forEach((child, index) => {
                    processNode(child, [...path, 'children', String(index)]);
                });
            }
            return;
        }
        const oldCode = node.lang;
        const newCode = normalizeLanguageCode(oldCode, { addDefaultRegion: addDefaultRegions });
        // Check if change needed
        if (oldCode !== newCode) {
            const nodePath = path.join('.');
            result.changes.push({
                path: nodePath || 'root',
                oldCode,
                newCode,
            });
            if (!dryRun) {
                node.lang = newCode;
            }
            result.nodesUpdated++;
            result.hasChanges = true;
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
 * Migrate language codes in translation extras
 *
 * @param doc - GLOST document
 * @param options - Migration options
 * @returns Migration result
 */
export function migrateTranslationLanguageCodes(doc, options = {}) {
    const { addDefaultRegions = true, dryRun = false, } = options;
    const result = {
        nodesUpdated: 0,
        changes: [],
        hasChanges: false,
    };
    function processNode(node, path = []) {
        // Check if node has translations in extras
        if ('extras' in node && node.extras && typeof node.extras === 'object') {
            const extras = node.extras;
            if (extras.translations && typeof extras.translations === 'object') {
                const oldTranslations = extras.translations;
                const newTranslations = {};
                let hasTranslationChanges = false;
                for (const [langCode, translation] of Object.entries(oldTranslations)) {
                    if (typeof translation === 'string') {
                        const newCode = normalizeLanguageCode(langCode, { addDefaultRegion: addDefaultRegions });
                        if (langCode !== newCode) {
                            hasTranslationChanges = true;
                            const nodePath = [...path, 'extras', 'translations', langCode].join('.');
                            result.changes.push({
                                path: nodePath,
                                oldCode: langCode,
                                newCode,
                            });
                        }
                        newTranslations[newCode] = translation;
                    }
                }
                if (hasTranslationChanges && !dryRun) {
                    extras.translations = newTranslations;
                    result.nodesUpdated++;
                    result.hasChanges = true;
                }
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
 * Migrate all language codes in a document (both lang fields and translations)
 *
 * @param doc - GLOST document
 * @param options - Migration options
 * @returns Combined migration result
 */
export function migrateAllLanguageCodes(doc, options = {}) {
    const result1 = migrateLanguageCodes(doc, options);
    const result2 = migrateTranslationLanguageCodes(doc, options);
    return {
        nodesUpdated: result1.nodesUpdated + result2.nodesUpdated,
        changes: [...result1.changes, ...result2.changes],
        hasChanges: result1.hasChanges || result2.hasChanges,
    };
}
//# sourceMappingURL=migrate-language-codes.js.map