/**
 * Pipeline Composition Utilities
 * 
 * Utilities for composing and analyzing multi-extension pipelines.
 * These help test composition patterns and discover ergonomic issues.
 */

import type { GLOSTExtension } from "glost-plugins";
import type { GLOSTRoot, GLOSTWord } from "glost";
import { NODE_TYPES, getAllWords } from "glost";
import { processGLOST } from "glost-plugins";

/**
 * Pipeline execution result with timing and metadata
 */
export interface PipelineResult {
  /** Processed document */
  document: GLOSTRoot;
  /** Total execution time in milliseconds */
  totalTime: number;
  /** Per-extension timing */
  extensionTimes: Array<{
    id: string;
    name: string;
    time: number;
  }>;
  /** Number of words processed */
  wordCount: number;
  /** Extensions applied */
  extensionsApplied: string[];
}

/**
 * Execute pipeline with timing and analysis
 * 
 * This utility processes a document with multiple extensions and
 * provides detailed timing information for performance analysis.
 * 
 * @param document - GLOST document to process
 * @param extensions - Array of extensions to apply
 * @returns Pipeline result with timing data
 * 
 * @example
 * ```typescript
 * const result = await executePipeline(doc, [
 *   transcriptionExt,
 *   translationExt,
 *   frequencyExt
 * ]);
 * 
 * console.log(`Total time: ${result.totalTime}ms`);
 * console.log(`Words processed: ${result.wordCount}`);
 * ```
 */
export async function executePipeline(
  document: GLOSTRoot,
  extensions: GLOSTExtension[]
): Promise<PipelineResult> {
  const startTime = performance.now();
  const extensionTimes: Array<{ id: string; name: string; time: number }> = [];

  // Process with each extension, timing individually
  let currentDoc = document;
  for (const ext of extensions) {
    const extStart = performance.now();
    currentDoc = await processGLOST(currentDoc, [ext]); // Using new simplified API
    const extEnd = performance.now();

    extensionTimes.push({
      id: ext.id,
      name: ext.name,
      time: extEnd - extStart,
    });
  }

  const endTime = performance.now();

  // Count words in document - using new getAllWords helper
  const wordCount = getAllWords(currentDoc).length;

  return {
    document: currentDoc,
    totalTime: endTime - startTime,
    extensionTimes,
    wordCount,
    extensionsApplied: extensions.map((e) => e.id),
  };
}

/**
 * Create a pipeline from extension factory functions
 * 
 * Helper to create extension instances and compose them into a pipeline.
 * Useful for testing different composition patterns.
 * 
 * @param factories - Array of functions that create extensions
 * @returns Array of extension instances
 * 
 * @example
 * ```typescript
 * const pipeline = createPipeline([
 *   () => createThaiTranscriptionExtension(),
 *   () => createThaiTranslationExtension(),
 *   () => createThaiFrequencyExtension()[0] // Just the generator
 * ]);
 * ```
 */
export function createPipeline(
  factories: Array<() => GLOSTExtension | GLOSTExtension[]>
): GLOSTExtension[] {
  const extensions: GLOSTExtension[] = [];

  for (const factory of factories) {
    const result = factory();
    if (Array.isArray(result)) {
      extensions.push(...result);
    } else {
      extensions.push(result);
    }
  }

  return extensions;
}

/**
 * Analyze word enrichment
 * 
 * Analyzes how many words were enriched by each extension.
 * Useful for understanding extension effectiveness.
 * 
 * @param document - Processed GLOST document
 * @returns Enrichment statistics
 */
export function analyzeWordEnrichment(document: GLOSTRoot): {
  total: number;
  withTranscription: number;
  withTranslation: number;
  withFrequency: number;
  fullyEnriched: number;
} {
  let total = 0;
  let withTranscription = 0;
  let withTranslation = 0;
  let withFrequency = 0;
  let fullyEnriched = 0;

  // Using new getAllWords helper for cleaner code
  const words = getAllWords(document);
  
  for (const node of words) {
    total++;

    const hasTranscription =
      node.transcription && Object.keys(node.transcription).length > 0;
    const hasTranslation =
      node.extras?.translations &&
      Object.keys(node.extras.translations).length > 0;
    const hasFrequency = node.extras?.metadata?.frequency !== undefined;

    if (hasTranscription) withTranscription++;
    if (hasTranslation) withTranslation++;
    if (hasFrequency) withFrequency++;
    if (hasTranscription && hasTranslation && hasFrequency) fullyEnriched++;
  }

  return {
    total,
    withTranscription,
    withTranslation,
    withFrequency,
    fullyEnriched,
  };
}

/**
 * Format pipeline result for display
 * 
 * Creates a human-readable summary of pipeline execution.
 * 
 * @param result - Pipeline result
 * @returns Formatted string
 */
export function formatPipelineResult(result: PipelineResult): string {
  const lines: string[] = [];

  lines.push(`Pipeline Execution Summary`);
  lines.push(`=========================`);
  lines.push(`Total time: ${result.totalTime.toFixed(2)}ms`);
  lines.push(`Words processed: ${result.wordCount}`);
  lines.push(`Extensions applied: ${result.extensionsApplied.length}`);
  lines.push(``);
  lines.push(`Per-Extension Timing:`);

  for (const ext of result.extensionTimes) {
    const percentage = ((ext.time / result.totalTime) * 100).toFixed(1);
    lines.push(`  ${ext.name}: ${ext.time.toFixed(2)}ms (${percentage}%)`);
  }

  const enrichment = analyzeWordEnrichment(result.document);
  lines.push(``);
  lines.push(`Word Enrichment:`);
  lines.push(`  Total words: ${enrichment.total}`);
  lines.push(`  With transcription: ${enrichment.withTranscription}`);
  lines.push(`  With translation: ${enrichment.withTranslation}`);
  lines.push(`  With frequency: ${enrichment.withFrequency}`);
  lines.push(`  Fully enriched: ${enrichment.fullyEnriched}`);

  return lines.join("\n");
}
