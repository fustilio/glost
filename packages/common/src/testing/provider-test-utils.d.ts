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
export declare function testProvider<TInput, TOutput>(providerFn: (input: TInput, language?: GlostLanguage) => Promise<TOutput | undefined>, testCases: ProviderTestCase<TInput, TOutput>[], options?: {
    /**
     * Deep equality check for objects
     */
    deepEqual?: boolean;
}): Promise<ProviderTestSuiteResult>;
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
export declare function testLanguageSupport<TInput>(providerFn: (input: TInput, language: GlostLanguage) => Promise<any>, supportedLanguages: readonly GlostLanguage[], testInput: TInput): Promise<ProviderTestSuiteResult>;
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
export declare function benchmarkProvider<TInput>(providerFn: (input: TInput) => Promise<any>, inputs: TInput[], options?: {
    /**
     * Number of iterations per input
     */
    iterations?: number;
}): Promise<{
    totalMs: number;
    averageMs: number;
    minMs: number;
    maxMs: number;
    callCount: number;
}>;
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
export declare function testNoDataBadData<TInput>(providerFn: (input: TInput) => Promise<any>, invalidInputs: TInput[]): Promise<ProviderTestSuiteResult>;
/**
 * Print test results to console
 *
 * @param results - Test suite results
 * @param options - Print options
 */
export declare function printTestResults(results: ProviderTestSuiteResult, options?: {
    /**
     * Show only failures
     */
    failuresOnly?: boolean;
    /**
     * Verbose output
     */
    verbose?: boolean;
}): void;
//# sourceMappingURL=provider-test-utils.d.ts.map