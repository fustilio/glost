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
export class Logger {
  private verbosity: LogVerbosity;
  private prefix: string;

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
  constructor(verbosity: LogVerbosity = "info", prefix: string = "") {
    this.verbosity = verbosity;
    this.prefix = prefix;
  }

  /**
   * Set the verbosity level
   */
  setVerbosity(verbosity: LogVerbosity): void {
    this.verbosity = verbosity;
  }

  /**
   * Get the current verbosity level
   */
  getVerbosity(): LogVerbosity {
    return this.verbosity;
  }

  /**
   * Set the log prefix
   */
  setPrefix(prefix: string): void {
    this.prefix = prefix;
  }

  /**
   * Get the current log prefix
   */
  getPrefix(): string {
    return this.prefix;
  }

  /**
   * Check if a log level should be output based on verbosity
   */
  private shouldLog(level: LogVerbosity): boolean {
    const levels: LogVerbosity[] = ["silent", "error", "warn", "info", "debug"];
    const verbosityIndex = levels.indexOf(this.verbosity);
    const levelIndex = levels.indexOf(level);
    return levelIndex <= verbosityIndex;
  }

  /**
   * Format log message with prefix
   */
  private formatMessage(...args: unknown[]): unknown[] {
    if (this.prefix) {
      return [this.prefix, ...args];
    }
    return args;
  }

  /**
   * Log an error message
   */
  error(...args: unknown[]): void {
    if (this.shouldLog("error")) {
      console.error(...this.formatMessage(...args));
    }
  }

  /**
   * Log a warning message
   */
  warn(...args: unknown[]): void {
    if (this.shouldLog("warn")) {
      console.warn(...this.formatMessage(...args));
    }
  }

  /**
   * Log an info message
   */
  info(...args: unknown[]): void {
    if (this.shouldLog("info")) {
      console.log(...this.formatMessage(...args));
    }
  }

  /**
   * Log a debug message
   */
  debug(...args: unknown[]): void {
    if (this.shouldLog("debug")) {
      console.debug(...this.formatMessage(...args));
    }
  }

  /**
   * Log a message with a specific level
   */
  log(level: LogVerbosity, ...args: unknown[]): void {
    switch (level) {
      case "error":
        this.error(...args);
        break;
      case "warn":
        this.warn(...args);
        break;
      case "info":
        this.info(...args);
        break;
      case "debug":
        this.debug(...args);
        break;
      case "silent":
        // No-op
        break;
    }
  }
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
export function createLogger(
  prefix: string,
  verbosity: LogVerbosity = "info",
): Logger {
  return new Logger(verbosity, prefix);
}
