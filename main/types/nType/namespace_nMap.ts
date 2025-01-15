import type {
    is_tabMap, is_oneMap, isInvalid,
    tabMap, oneMap
} from "../types-shared.ts";

export type TypeGenerate<N extends "one" | "tab", K, V> = N extends "tab"
    ? tabMap<K, V>
    : oneMap<K, V>
    ;
export type ValidationReturn = is_tabMap | is_oneMap | isInvalid;
export function validationTypeGenerate<N extends "one" | "tab", K, V>(data: TypeGenerate<N, K, V>): ValidationReturn {
    switch (true) {
        case Array.isArray(data) && data.length === 2 && data[0] instanceof Map: return "is_tabMap";
        case data instanceof Map: return "is_oneMap";
        default: return "isInvalid";
    }
}
