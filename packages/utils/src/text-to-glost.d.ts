/**
 * Framework-Agnostic Text-to-GLOST Converter
 *
 * Provides utilities for converting text (plain strings or RubySegment arrays)
 * into GLOST documents using pluggable language strategies and transcription providers.
 * This ensures consistent GLOST creation across the codebase while remaining framework-agnostic.
 */
import type { RubySegment } from "./script-conversion.js";
import type { GLOSTRoot } from "glost";
import type { ILanguageStrategy, ITranscriptionProvider } from "./interfaces.js";
/**
 * Options for converting text to GLOST
 */
export type ConvertTextToGLOSTOptions = {
    /**
     * Language code (e.g., "th-TH", "ja-JP")
     */
    language: string;
    /**
     * Language strategy instance (required)
     */
    languageStrategy: ILanguageStrategy;
    /**
     * Transcription provider instance (optional, only needed if fetchTranscription is true)
     */
    transcriptionProvider?: ITranscriptionProvider;
    /**
     * Transcription scheme to use (optional)
     */
    transcriptionScheme?: string;
    /**
     * Gender filter - only include terms matching this gender
     */
    genderFilter?: "male" | "female";
    /**
     * Whether to fetch transcription from providers if not provided in RubySegment
     */
    fetchTranscription?: boolean;
};
/**
 * Convert text (string or RubySegment array) to GLOST document
 *
 * This is the main standardized converter that:
 * - Uses language strategy for script detection and gender terms
 * - Uses transcription providers for fetching transcription data
 * - Uses standardized GLOST node creation utilities
 * - Handles both plain strings and RubySegment arrays
 * - Supports gender filtering
 */
export declare function convertTextToGLOST(script: string | (string | RubySegment)[], options: ConvertTextToGLOSTOptions): GLOSTRoot;
//# sourceMappingURL=text-to-glost.d.ts.map