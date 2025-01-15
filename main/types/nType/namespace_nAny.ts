import type {
    is_tabSet, is_tabMap, is_oneSet, is_oneMap, isInvalid,
    tabSet, tabMap, oneSet, oneMap
} from "../types-shared.ts";

export type TypeGenerate<N extends "one" | "tab", K, V = undefined> =
    N extends "tab"
    ? V extends undefined ? tabSet<K> : tabMap<K, V>
    : V extends undefined ? oneSet<K> : oneMap<K, V>
    ;
export type ValidationReturn = is_tabSet | is_tabMap | is_oneSet | is_oneMap | isInvalid;
export function validationTypeGenerate<N extends "one" | "tab", K, V = undefined>(data: TypeGenerate<N, K, V>): ValidationReturn {
    switch (true) {
        case Array.isArray(data) && data.length === 2 && data[0] instanceof Set: return "is_tabSet";
        case Array.isArray(data) && data.length === 2 && data[0] instanceof Map: return "is_tabMap";
        case data instanceof Set: return "is_oneSet";
        case data instanceof Map: return "is_oneMap";
        default: return "isInvalid";
    }
}
