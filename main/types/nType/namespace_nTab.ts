import type {
    is_tabSet, is_tabMap, isInvalid,
    tabSet, tabMap,
} from "../types-shared.ts";

export type TypeGenerate<K, V = undefined> = V extends undefined
    ? tabSet<K>
    : tabMap<K, V>
    ;
export type ValidationReturn = is_tabSet | is_tabMap | isInvalid;
export function validationTypeGenerate<K, V = undefined>(data: TypeGenerate<K, V>): ValidationReturn {
    switch (true) {
        case Array.isArray(data) && data.length === 2 && data[0] instanceof Set: return "is_tabSet";
        case Array.isArray(data) && data.length === 2 && data[0] instanceof Map: return "is_tabMap";
        default: return "isInvalid";
    }
}
