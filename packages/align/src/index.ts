export type {
  AlignmentEdge,
  AlignmentLevel,
  Confidence,
  LangCode,
  NodeRef,
  ParallelDocument,
  ParallelDocumentMetadata,
  Provenance,
} from "./types.js";

export { isAlignmentEdge, isParallelDocument } from "./guards.js";
export { composeParallelDocument } from "./compose.js";
export type { ComposeParallelDocumentInput } from "./compose.js";
export {
  buildNodeIndex,
  getEdgeById,
  getEdgesForNode,
  nodeId,
  resolveRef,
  walkAlignable,
} from "./walk.js";
export { flattenAlignedPair } from "./flatten.js";
export type { FlattenedPair, FlattenOptions } from "./flatten.js";
export { assertStamped, assertTreeStamped } from "./assert.js";
export { parseParallelDocument, serializeParallelDocument } from "./serialize.js";
export { idStamp, idStampPlugin } from "./id-stamp.js";
export type { IdStampOptions, IdStampStrategy } from "./id-stamp.js";
