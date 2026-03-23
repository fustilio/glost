/**
 * Pipeline Composition Utilities
 *
 * Utilities for composing and analyzing multi-extension pipelines.
 * These help test composition patterns and discover ergonomic issues.
 */
import type { GLOSTExtension } from "glost-plugins";
import type { GLOSTRoot } from "glost";
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
export declare function executePipeline(document: GLOSTRoot, extensions: GLOSTExtension[]): Promise<PipelineResult>;
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
export declare function createPipeline(factories: Array<() => GLOSTExtension | GLOSTExtension[]>): GLOSTExtension[];
/**
 * Analyze word enrichment
 *
 * Analyzes how many words were enriched by each extension.
 * Useful for understanding extension effectiveness.
 *
 * @param document - Processed GLOST document
 * @returns Enrichment statistics
 */
export declare function analyzeWordEnrichment(document: GLOSTRoot): {
    total: number;
    withTranscription: number;
    withTranslation: number;
    withFrequency: number;
    fullyEnriched: number;
};
/**
 * Format pipeline result for display
 *
 * Creates a human-readable summary of pipeline execution.
 *
 * @param result - Pipeline result
 * @returns Formatted string
 */
export declare function formatPipelineResult(result: PipelineResult): string;
//# sourceMappingURL=pipeline.d.ts.map