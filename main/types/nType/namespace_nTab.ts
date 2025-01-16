import type {
    is_tabSet, is_tabMap, isInvalid,
    tabSet, tabMap,
} from "../types-shared.ts";

export type TypeGenerate<K, V = undefined> = V extends undefined
    ? tabSet<K>
    : tabMap<K, V>
    ;
export type ValidationReturnType = is_tabSet | is_tabMap | isInvalid;
export enum ValidationReturnText {
    is_tabSet = "is_tabSet",
    is_tabMap = "is_tabMap",
    //is_oneSet = "is_oneSet",
    //is_oneMap = "is_oneMap",
    isInvalid = "isInvalid"
}
export function validationTypeGenerate<K, V = undefined>(data: TypeGenerate<K, V>): ValidationReturnType {
    switch (true) {
        case Array.isArray(data) && data.length === 2 && data[0] instanceof Set: return ValidationReturnText.is_tabSet;
        case Array.isArray(data) && data.length === 2 && data[0] instanceof Map: return ValidationReturnText.is_tabMap;
        default: return ValidationReturnText.isInvalid;
    }
}
