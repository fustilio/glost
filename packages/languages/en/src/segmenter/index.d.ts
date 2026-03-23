/**
 * English clause segmenter provider
 *
 * @packageDocumentation
 */
import type { ClauseSegmenterProvider } from "glost-clause-segmenter";
/**
 * English clause markers
 */
declare const ENGLISH_MARKERS: {
    subordinators: string[];
    causal: string[];
    conditional: string[];
    temporal: string[];
    relatives: string[];
    complementizers: string[];
    coordinators: string[];
};
/**
 * English clause segmenter provider
 */
export declare const englishSegmenterProvider: ClauseSegmenterProvider;
/**
 * Create a custom English segmenter with additional rules
 */
export declare function createEnglishSegmenterProvider(customMarkers?: Partial<typeof ENGLISH_MARKERS>): ClauseSegmenterProvider;
export {};
//# sourceMappingURL=index.d.ts.map