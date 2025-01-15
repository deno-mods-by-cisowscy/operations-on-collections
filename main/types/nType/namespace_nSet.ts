import type {
    is_tabSet, is_oneSet, isInvalid,
    tabSet, oneSet
} from "../types-shared.ts";

export type TypeGenerate<N extends "one" | "tab", K> = N extends "tab"
    ? tabSet<K>
    : oneSet<K>
    ;
export type ValidationReturn = is_tabSet | is_oneSet | isInvalid;
export function validationTypeGenerate<N extends "one" | "tab", K>(data: TypeGenerate<N, K>): ValidationReturn {
    switch (true) {
        case Array.isArray(data) && data.length === 2 && data[0] instanceof Set: return "is_tabSet";
        case data instanceof Set: return "is_oneSet";
        default: return "isInvalid";
    }
}
