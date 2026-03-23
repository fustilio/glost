/**
 * Base provider classes for GLOST language extensions
 *
 * These base classes provide common functionality and patterns for
 * implementing language-specific providers.
 *
 * @packageDocumentation
 */
import type { GlostLanguage } from "../languages/index.js";
/**
 * Options for base provider
 */
export interface BaseProviderOptions {
    /**
     * Enable debug logging
     */
    debug?: boolean;
    /**
     * Custom logger function
     */
    logger?: (message: string, level: 'info' | 'warn' | 'error') => void;
}
/**
 * Abstract base class for language-specific providers
 *
 * Provides common functionality:
 * - Language validation
 * - Debug logging
 * - Error handling
 * - "No Data > Bad Data" philosophy enforcement
 *
 * @example
 * ```typescript
 * class MyThaiProvider extends BaseLanguageProvider {
 *   protected supportedLanguages = ['th' as const];
 *
 *   async getData(word: string, language: GlostLanguage) {
 *     if (!this.validateLanguage(language)) {
 *       return undefined;
 *     }
 *
 *     return this.withErrorHandling(async () => {
 *       // Implementation
 *     });
 *   }
 * }
 * ```
 */
export declare abstract class BaseLanguageProvider {
    /**
     * Languages supported by this provider
     * Subclasses must define this
     */
    protected abstract supportedLanguages: readonly GlostLanguage[];
    /**
     * Provider options
     */
    protected options: BaseProviderOptions;
    constructor(options?: BaseProviderOptions);
    /**
     * Validate that the provider supports the given language
     *
     * @param language - Language to validate
     * @returns true if language is supported
     */
    protected validateLanguage(language: GlostLanguage): boolean;
    /**
     * Log a debug message
     *
     * @param message - Message to log
     * @param level - Log level
     */
    protected log(message: string, level?: 'info' | 'warn' | 'error'): void;
    /**
     * Execute a function with error handling
     *
     * Following "No Data > Bad Data" philosophy:
     * - Returns undefined on error (no fallback/guessing)
     * - Logs errors in debug mode
     * - Never throws (graceful degradation)
     *
     * @param fn - Function to execute
     * @returns Result or undefined on error
     */
    protected withErrorHandling<T>(fn: () => Promise<T | undefined>): Promise<T | undefined>;
    /**
     * Execute a function with optional fallback
     *
     * Note: Only use fallback when it provides RELIABLE data,
     * not heuristics or guesses. Prefer returning undefined.
     *
     * @param fn - Function to execute
     * @param fallback - Optional fallback value (use sparingly!)
     * @returns Result, fallback, or undefined
     */
    protected withFallback<T>(fn: () => Promise<T | undefined>, fallback?: T): Promise<T | undefined>;
    /**
     * Validate that a value is not undefined/null
     *
     * @param value - Value to validate
     * @param fieldName - Name of field for error message
     * @returns true if valid
     */
    protected validateRequired<T>(value: T | undefined | null, fieldName: string): value is T;
}
/**
 * Base class for providers that load data from external sources
 *
 * Provides:
 * - Lazy loading
 * - Loading state management
 * - Resource cleanup
 *
 * @example
 * ```typescript
 * class DictionaryProvider extends BaseDataProvider<Map<string, string>> {
 *   protected async loadData(): Promise<Map<string, string>> {
 *     const response = await fetch('/dictionary.json');
 *     const data = await response.json();
 *     return new Map(Object.entries(data));
 *   }
 *
 *   async getTranslation(word: string): Promise<string | undefined> {
 *     const data = await this.ensureLoaded();
 *     return data.get(word);
 *   }
 * }
 * ```
 */
export declare abstract class BaseDataProvider<TData> extends BaseLanguageProvider {
    /**
     * Cached data after loading
     */
    protected data?: TData;
    /**
     * Loading promise (for deduplication)
     */
    protected loadingPromise?: Promise<TData>;
    /**
     * Whether data has been loaded
     */
    protected loaded: boolean;
    /**
     * Load data from source
     * Subclasses must implement this
     */
    protected abstract loadData(): Promise<TData>;
    /**
     * Ensure data is loaded, loading if necessary
     *
     * Uses deduplication to prevent multiple concurrent loads
     *
     * @returns Loaded data
     */
    protected ensureLoaded(): Promise<TData>;
    /**
     * Check if data is loaded
     */
    isLoaded(): boolean;
    /**
     * Preload data (optional performance optimization)
     *
     * Call this before processing to avoid loading delays
     */
    preload(): Promise<void>;
    /**
     * Clear loaded data
     *
     * Useful for memory management or forcing reload
     */
    clearData(): void;
    /**
     * Clean up resources
     *
     * Override this to add custom cleanup logic
     */
    dispose(): Promise<void>;
}
//# sourceMappingURL=base-provider.d.ts.map