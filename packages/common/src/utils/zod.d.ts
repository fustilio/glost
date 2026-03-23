import { z } from "zod";
import type { Primitive } from "zod";
export declare function constructZodLiteralUnionType<T extends Primitive>(constArray: readonly T[]): z.ZodUnion<[z.ZodLiteral<T>, z.ZodLiteral<T>, ...z.ZodLiteral<T>[]]>;
//# sourceMappingURL=zod.d.ts.map