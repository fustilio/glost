/**
 * Shared logger utility for GLOST packages
 *
 * Provides centralized logging with verbosity control across the entire repository.
 */
/**
 * Log verbosity levels
 * - "silent": No logs
 * - "error": Only error logs
 * - "warn": Warning and error logs
 * - "info": Info, warning, and error logs (default)
 * - "debug": All logs including debug information
 */
export type LogVerbosity = "silent" | "error" | "warn" | "info" | "debug";
/**
 * Logger class for GLOST packages
 *
 * Provides methods for logging at different levels with verbosity control.
 * Can be instantiated with a prefix to identify the source of logs.
 */
export declare class Logger {
    private verbosity;
    private prefix;
    /**
     * Create a new logger instance
     *
     * @param verbosity - Log verbosity level (default: "info")
     * @param prefix - Optional prefix for log messages (default: "")
     *
     * @example
     * ```typescript
     * const logger = new Logger("debug", "[Transcription]");
     * logger.info("Processing word");
     * // Output: [Transcription] Processing word
     * ```
     */
    constructor(verbosity?: LogVerbosity, prefix?: string);
    /**
     * Set the verbosity level
     */
    setVerbosity(verbosity: LogVerbosity): void;
    /**
     * Get the current verbosity level
     */
    getVerbosity(): LogVerbosity;
    /**
     * Set the log prefix
     */
    setPrefix(prefix: string): void;
    /**
     * Get the current log prefix
     */
    getPrefix(): string;
    /**
     * Check if a log level should be output based on verbosity
     */
    private shouldLog;
    /**
     * Format log message with prefix
     */
    private formatMessage;
    /**
     * Log an error message
     */
    error(...args: unknown[]): void;
    /**
     * Log a warning message
     */
    warn(...args: unknown[]): void;
    /**
     * Log an info message
     */
    info(...args: unknown[]): void;
    /**
     * Log a debug message
     */
    debug(...args: unknown[]): void;
    /**
     * Log a message with a specific level
     */
    log(level: LogVerbosity, ...args: unknown[]): void;
}
/**
 * Create a logger instance with a prefix
 *
 * Convenience function for creating a logger with a prefix.
 *
 * @param prefix - Prefix for log messages
 * @param verbosity - Log verbosity level (default: "info")
 * @returns Logger instance
 *
 * @example
 * ```typescript
 * const logger = createLogger("[MyPackage]", "debug");
 * logger.info("Message");
 * // Output: [MyPackage] Message
 * ```
 */
export declare function createLogger(prefix: string, verbosity?: LogVerbosity): Logger;
//# sourceMappingURL=logger.d.ts.map