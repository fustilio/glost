/**
 * Transcription Schema Migration Utilities
 * 
 * Utilities for migrating GLOST documents to v0.4.0 transcription schema
 * (removes redundant system field from transcription objects)
 * 
 * @packageDocumentation
 */

import type { GLOSTRoot, GLOSTNode } from 'glost-core';

/**
 * Options for transcription schema migration
 */
export interface MigrateTranscriptionSchemaOptions {
  /** Dry run - return what would change without modifying */
  dryRun?: boolean;
}

/**
 * Migration result information
 */
export interface TranscriptionMigrationResult {
  /** Number of transcriptions updated */
  transcriptionsUpdated: number;
  /** Number of nodes with transcriptions */
  nodesProcessed: number;
  /** Whether any changes were made */
  hasChanges: boolean;
  /** Details of changes made */
  changes: Array<{
    path: string;
    systems: string[];
  }>;
}

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
export function migrateTranscriptionSchema(
  doc: GLOSTRoot,
  options: MigrateTranscriptionSchemaOptions = {}
): TranscriptionMigrationResult {
  const { dryRun = false } = options;

  const result: TranscriptionMigrationResult = {
    transcriptionsUpdated: 0,
    nodesProcessed: 0,
    hasChanges: false,
    changes: [],
  };

  /**
   * Recursively process nodes
   */
  function processNode(node: GLOSTNode, path: string[] = []): void {
    // Check if node has transcription field
    if ('transcription' in node && node.transcription && typeof node.transcription === 'object') {
      const transcription = node.transcription as any;
      const systemsUpdated: string[] = [];
      let nodeHasChanges = false;

      // Process each transcription system
      for (const [system, data] of Object.entries(transcription)) {
        if (data && typeof data === 'object' && 'system' in data) {
          // Found redundant system field
          if (!dryRun) {
            // Remove the system field
            const { system: _, ...rest } = data as any;
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
        processNode(child as GLOSTNode, [...path, 'children', String(index)]);
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
export function needsTranscriptionMigration(doc: GLOSTRoot): boolean {
  const result = migrateTranscriptionSchema(doc, { dryRun: true });
  return result.hasChanges;
}

/**
 * Get details about transcription schema migration needs
 * 
 * @param doc - GLOST document to analyze
 * @returns Migration analysis
 */
export function analyzeTranscriptionMigration(doc: GLOSTRoot): TranscriptionMigrationResult {
  return migrateTranscriptionSchema(doc, { dryRun: true });
}
