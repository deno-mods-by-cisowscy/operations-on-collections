import type {
    is_oneSet, is_oneMap, isInvalid,
    oneSet, oneMap
} from "../types-shared.ts";

export type TypeGenerate<K, V = undefined> = V extends undefined
    ? oneSet<K>
    : oneMap<K, V>
    ;
export type ValidationReturn = is_oneSet | is_oneMap | isInvalid;
export function validationTypeGenerate<K, V = undefined>(data: TypeGenerate<K, V>): ValidationReturn {
    switch (true) {
        case data instanceof Set: return "is_oneSet";
        case data instanceof Map: return "is_oneMap";
        default: return "isInvalid";
    }
}
