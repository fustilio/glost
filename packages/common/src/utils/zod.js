import { z } from "zod";
function isValidZodLiteralUnion(literals) {
    return literals.length >= 2;
}
// @see https://github.com/colinhacks/zod/issues/831#issuecomment-1773734131
export function constructZodLiteralUnionType(constArray) {
    const literalsArray = constArray.map((literal) => z.literal(literal));
    if (!isValidZodLiteralUnion(literalsArray)) {
        throw new Error("Literals passed do not meet the criteria for constructing a union schema, the minimum length is 2");
    }
    return z.union(literalsArray);
}
//# sourceMappingURL=zod.js.map