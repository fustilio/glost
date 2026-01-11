/**
 * Processor exports
 * 
 * Re-exports the processor API for convenient access via glost/processor.
 */

export { glost, GLOSTProcessor } from "glost-processor";
export type {
  FrozenProcessor,
  Plugin,
  PluginSpec,
  Preset,
  ProcessorOptions,
  ProcessingResult,
  ProcessingError,
  ProcessingWarning,
  ProcessingStats,
  BeforeHook,
  AfterHook,
  ErrorHook,
  SkipHook,
  ProgressHook,
  ProgressStats,
} from "glost-processor";
