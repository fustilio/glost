/**
 * Provider testing utilities
 * 
 * Helpers for testing GLOST providers consistently
 * 
 * @packageDocumentation
 */

import type { GlostLanguage } from "../languages/index.js";

/**
 * Test case for provider testing
 */
export interface ProviderTestCase<TInput, TOutput> {
  /**
   * Input to test
   */
  input: TInput;

  /**
   * Expected output
   */
  expected: TOutput | undefined;

  /**
   * Test description
   */
  description?: string;

  /**
   * Language for this test
   */
  language?: GlostLanguage;
}

/**
 * Test result
 */
export interface ProviderTestResult {
  /**
   * Whether test passed
   */
  passed: boolean;

  /**
   * Test description
   */
  description: string;

  /**
   * Error message if failed
   */
  error?: string;

  /**
   * Actual output received
   */
  actual?: any;

  /**
   * Expected output
   */
  expected?: any;
}

/**
 * Test suite results
 */
export interface ProviderTestSuiteResult {
  /**
   * Total tests run
   */
  total: number;

  /**
   * Tests passed
   */
  passed: number;

  /**
   * Tests failed
   */
  failed: number;

  /**
   * Individual test results
   */
  results: ProviderTestResult[];

  /**
   * Overall pass/fail
   */
  success: boolean;
}

/**
 * Test a provider with multiple test cases
 * 
 * @param providerFn - Provider function to test
 * @param testCases - Test cases
 * @param options - Test options
 * @returns Test results
 * 
 * @example
 * ```typescript
 * const results = await testProvider(
 *   async (word, lang) => provider.getData(word),
 *   [
 *     { input: 'hello', expected: 'สวัสดี', language: 'en' },
 *     { input: 'world', expected: 'โลก', language: 'en' },
 *     { input: 'unknown', expected: undefined, language: 'en' }
 *   ]
 * );
 * 
 * console.log(`Passed: ${results.passed}/${results.total}`);
 * ```
 */
export async function testProvider<TInput, TOutput>(
  providerFn: (input: TInput, language?: GlostLanguage) => Promise<TOutput | undefined>,
  testCases: ProviderTestCase<TInput, TOutput>[],
  options: {
    /**
     * Deep equality check for objects
     */
    deepEqual?: boolean;
  } = {}
): Promise<ProviderTestSuiteResult> {
  const results: ProviderTestResult[] = [];

  for (const testCase of testCases) {
    const description =
      testCase.description ||
      `${String(testCase.input)}${testCase.language ? ` (${testCase.language})` : ''}`;

    try {
      const actual = await providerFn(testCase.input, testCase.language);

      const isEqual = options.deepEqual
        ? deepEqual(actual, testCase.expected)
        : actual === testCase.expected;

      if (isEqual) {
        results.push({
          passed: true,
          description,
          actual,
          expected: testCase.expected,
        });
      } else {
        results.push({
          passed: false,
          description,
          error: `Expected ${JSON.stringify(testCase.expected)}, got ${JSON.stringify(actual)}`,
          actual,
          expected: testCase.expected,
        });
      }
    } catch (error) {
      results.push({
        passed: false,
        description,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  return {
    total: results.length,
    passed,
    failed,
    results,
    success: failed === 0,
  };
}

/**
 * Deep equality check
 */
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
}

/**
 * Test that a provider returns undefined for unsupported languages
 * 
 * @param providerFn - Provider function
 * @param supportedLanguages - Languages that should be supported
 * @param testInput - Sample input to test with
 * @returns Test results
 * 
 * @example
 * ```typescript
 * const results = await testLanguageSupport(
 *   async (word, lang) => provider.getData(word, lang),
 *   ['th'],
 *   'test'
 * );
 * ```
 */
export async function testLanguageSupport<TInput>(
  providerFn: (input: TInput, language: GlostLanguage) => Promise<any>,
  supportedLanguages: readonly GlostLanguage[],
  testInput: TInput
): Promise<ProviderTestSuiteResult> {
  const commonLanguages: GlostLanguage[] = ['en', 'th', 'ja', 'ko', 'zh', 'es', 'fr', 'de'];
  const testCases: ProviderTestCase<[TInput, GlostLanguage], any>[] = [];

  for (const lang of commonLanguages) {
    const isSupported = supportedLanguages.includes(lang);
    testCases.push({
      input: [testInput, lang],
      expected: isSupported ? 'any' : undefined,
      description: `${lang} (${isSupported ? 'supported' : 'unsupported'})`,
    });
  }

  return testProvider(
    async ([input, lang]) => {
      const result = await providerFn(input, lang);
      // For supported languages, just check it's not undefined
      if (supportedLanguages.includes(lang)) {
        return result !== undefined ? 'any' : undefined;
      }
      return result;
    },
    testCases
  );
}

/**
 * Benchmark provider performance
 * 
 * @param providerFn - Provider function to benchmark
 * @param inputs - Inputs to test
 * @param options - Benchmark options
 * @returns Performance metrics
 * 
 * @example
 * ```typescript
 * const metrics = await benchmarkProvider(
 *   async (word) => provider.getData(word),
 *   ['word1', 'word2', 'word3'],
 *   { iterations: 100 }
 * );
 * 
 * console.log(`Average: ${metrics.averageMs}ms`);
 * ```
 */
export async function benchmarkProvider<TInput>(
  providerFn: (input: TInput) => Promise<any>,
  inputs: TInput[],
  options: {
    /**
     * Number of iterations per input
     */
    iterations?: number;
  } = {}
): Promise<{
  totalMs: number;
  averageMs: number;
  minMs: number;
  maxMs: number;
  callCount: number;
}> {
  const { iterations = 10 } = options;
  const times: number[] = [];

  for (let i = 0; i < iterations; i++) {
    for (const input of inputs) {
      const start = performance.now();
      await providerFn(input);
      const end = performance.now();
      times.push(end - start);
    }
  }

  const totalMs = times.reduce((sum, t) => sum + t, 0);
  const averageMs = totalMs / times.length;
  const minMs = Math.min(...times);
  const maxMs = Math.max(...times);

  return {
    totalMs,
    averageMs,
    minMs,
    maxMs,
    callCount: times.length,
  };
}

/**
 * Validate that a provider follows "No Data > Bad Data" philosophy
 * 
 * Tests that provider returns undefined rather than guessing/throwing
 * 
 * @param providerFn - Provider function
 * @param invalidInputs - Inputs that should return undefined
 * @returns Test results
 * 
 * @example
 * ```typescript
 * const results = await testNoDataBadData(
 *   async (word) => provider.getData(word),
 *   ['', null, undefined, '###invalid###']
 * );
 * ```
 */
export async function testNoDataBadData<TInput>(
  providerFn: (input: TInput) => Promise<any>,
  invalidInputs: TInput[]
): Promise<ProviderTestSuiteResult> {
  const testCases: ProviderTestCase<TInput, undefined>[] = invalidInputs.map((input) => ({
    input,
    expected: undefined,
    description: `Should return undefined for: ${String(input)}`,
  }));

  return testProvider(providerFn, testCases);
}

/**
 * Print test results to console
 * 
 * @param results - Test suite results
 * @param options - Print options
 */
export function printTestResults(
  results: ProviderTestSuiteResult,
  options: {
    /**
     * Show only failures
     */
    failuresOnly?: boolean;
    /**
     * Verbose output
     */
    verbose?: boolean;
  } = {}
): void {
  const { failuresOnly = false, verbose = false } = options;

  console.log('\n=== Provider Test Results ===');
  console.log(`Total: ${results.total}`);
  console.log(`Passed: ${results.passed}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Success: ${results.success ? '✓' : '✗'}`);

  if (verbose || !results.success) {
    console.log('\n--- Details ---');
    for (const result of results.results) {
      if (failuresOnly && result.passed) continue;

      const icon = result.passed ? '✓' : '✗';
      console.log(`${icon} ${result.description}`);

      if (!result.passed && result.error) {
        console.log(`  Error: ${result.error}`);
      }

      if (verbose) {
        console.log(`  Expected: ${JSON.stringify(result.expected)}`);
        console.log(`  Actual: ${JSON.stringify(result.actual)}`);
      }
    }
  }
}
