/**
 * Thai clause segmenter provider
 *
 * @packageDocumentation
 */
import type { ClauseSegmenterProvider } from "glost-clause-segmenter";
/**
 * Thai clause markers (particles and conjunctions)
 */
declare const THAI_MARKERS: {
    causal: string[];
    conditional: string[];
    temporal: string[];
    relative: string[];
    complement: string[];
    concessive: string[];
    coordinators: string[];
};
/**
 * Thai clause segmenter provider
 */
export declare const thaiSegmenterProvider: ClauseSegmenterProvider;
/**
 * Create a custom Thai segmenter with additional rules
 */
export declare function createThaiSegmenterProvider(customMarkers?: Partial<typeof THAI_MARKERS>): ClauseSegmenterProvider;
export {};
//# sourceMappingURL=index.d.ts.map