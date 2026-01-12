/**
 * Data loader types and interfaces
 * 
 * @packageDocumentation
 */

/**
 * Generic data loader interface
 * 
 * Abstracts data loading from various sources (JSON, API, database, etc.)
 * 
 * @template TData - Type of data to load
 */
export interface DataLoader<TData> {
  /**
   * Load data from the source
   * 
   * @returns Loaded data
   * @throws Error if loading fails
   */
  load(): Promise<TData>;

  /**
   * Check if the data source is available
   * 
   * @returns true if source is accessible
   */
  isAvailable?(): Promise<boolean>;

  /**
   * Get metadata about the data source
   */
  getMetadata?(): Promise<DataSourceMetadata>;
}

/**
 * Metadata about a data source
 */
export interface DataSourceMetadata {
  /**
   * Data source name
   */
  name: string;

  /**
   * Data source version (if applicable)
   */
  version?: string;

  /**
   * Last updated timestamp
   */
  lastUpdated?: Date;

  /**
   * Number of entries (if applicable)
   */
  entryCount?: number;

  /**
   * Languages supported
   */
  languages?: string[];

  /**
   * Additional metadata
   */
  [key: string]: any;
}

/**
 * Options for JSON file loader
 */
export interface JsonLoaderOptions {
  /**
   * Path to JSON file (Node.js) or URL (browser)
   */
  path: string;

  /**
   * Transform function to process loaded data
   */
  transform?: (data: any) => any;

  /**
   * Validate function to check data integrity
   */
  validate?: (data: any) => boolean;
}

/**
 * Options for API loader
 */
export interface ApiLoaderOptions {
  /**
   * API endpoint URL
   */
  url: string;

  /**
   * HTTP method (default: GET)
   */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';

  /**
   * Request headers
   */
  headers?: Record<string, string>;

  /**
   * Request body (for POST/PUT)
   */
  body?: any;

  /**
   * Transform response data
   */
  transform?: (data: any) => any;

  /**
   * Timeout in milliseconds
   */
  timeout?: number;

  /**
   * Retry configuration
   */
  retry?: {
    maxAttempts: number;
    delayMs: number;
  };
}

/**
 * Options for cached loader
 */
export interface CachedLoaderOptions<TData> {
  /**
   * Base loader to wrap with caching
   */
  loader: DataLoader<TData>;

  /**
   * Cache duration in milliseconds (undefined = cache forever)
   */
  ttl?: number;

  /**
   * Storage key for persistent cache
   */
  storageKey?: string;
}
