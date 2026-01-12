/**
 * API data loader
 * 
 * Loads data from HTTP APIs with retry and timeout support
 * 
 * @packageDocumentation
 */

import type { DataLoader, ApiLoaderOptions, DataSourceMetadata } from "./types.js";

/**
 * API data loader with retry logic
 * 
 * @example
 * ```typescript
 * const loader = new ApiLoader({
 *   url: 'https://api.example.com/dictionary',
 *   headers: { 'Authorization': 'Bearer token' },
 *   retry: { maxAttempts: 3, delayMs: 1000 }
 * });
 * 
 * const data = await loader.load();
 * ```
 */
export class ApiLoader<TData = any> implements DataLoader<TData> {
  private options: ApiLoaderOptions;

  constructor(options: ApiLoaderOptions) {
    this.options = {
      method: 'GET',
      timeout: 30000, // 30 seconds default
      ...options,
    };
  }

  /**
   * Load data from API
   */
  async load(): Promise<TData> {
    const { retry } = this.options;
    
    if (retry) {
      return this.loadWithRetry(retry.maxAttempts, retry.delayMs);
    }
    
    return this.fetchData();
  }

  /**
   * Load with retry logic
   */
  private async loadWithRetry(maxAttempts: number, delayMs: number): Promise<TData> {
    let lastError: Error | undefined;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await this.fetchData();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt < maxAttempts) {
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }
      }
    }
    
    throw new Error(
      `Failed to load data after ${maxAttempts} attempts: ${lastError?.message}`
    );
  }

  /**
   * Fetch data from API
   */
  private async fetchData(): Promise<TData> {
    const { url, method, headers, body, timeout, transform } = this.options;

    try {
      const controller = new AbortController();
      const timeoutId = timeout ? setTimeout(() => controller.abort(), timeout) : undefined;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      let data = await response.json();

      // Transform if transformer provided
      if (transform) {
        data = transform(data);
      }

      return data as TData;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`);
      }
      throw error;
    }
  }

  /**
   * Check if API is available
   */
  async isAvailable(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second check

      const response = await fetch(this.options.url, {
        method: 'HEAD',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get API metadata
   */
  async getMetadata(): Promise<DataSourceMetadata> {
    return {
      name: this.options.url,
    };
  }
}

/**
 * Create an API loader
 * 
 * @param options - Loader options
 * @returns ApiLoader instance
 * 
 * @example
 * ```typescript
 * const loader = createApiLoader({
 *   url: 'https://api.example.com/data',
 *   headers: { 'API-Key': 'xxx' },
 *   retry: { maxAttempts: 3, delayMs: 1000 }
 * });
 * ```
 */
export function createApiLoader<TData = any>(
  options: ApiLoaderOptions
): ApiLoader<TData> {
  return new ApiLoader<TData>(options);
}
