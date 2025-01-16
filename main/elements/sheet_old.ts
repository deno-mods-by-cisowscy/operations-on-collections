export enum SheetMode {
    AB = 0,
    A = 1,
    B = 2,
}

export enum SheetUnit {
    SET = 0,
    MAP = 1,
}

abstract class AbstractSheet<K, V = undefined> {
    #mode: SheetMode;
    #unit: SheetUnit;
    #emptyAsNull: boolean;

    constructor() {
        this.#emptyAsNull = false;
        this.#mode = SheetMode.AB;
        this.#unit = SheetUnit.SET; // Default value, to be updated in subclasses
    }
    set EmptyAsNull(newEmptyAsNull: boolean) {
        if (typeof newEmptyAsNull === "boolean") {
            this.#emptyAsNull = newEmptyAsNull;
        } else {
            throw new Error(`Invalid value of EmptyAsNul: ${ newEmptyAsNull }`);
        }
    }
    get EmptyAsNull(): boolean {
        return this.#emptyAsNull;
    }

    set Mode(newMode: SheetMode) {
        if (Object.values(SheetMode).includes(newMode)) {
            this.#mode = newMode;
        } else {
            throw new Error(`Invalid Mode: ${ newMode }`);
        }
    }

    get Mode(): SheetMode {
        return this.#mode;
    }

    set Unit(newUnit: SheetUnit) {
        if (Object.values(SheetUnit).includes(newUnit)) {
            this.#unit = newUnit;
        } else {
            throw new Error(`Invalid Unit: ${ newUnit }`);
        }
    }

    get Unit(): SheetUnit {
        return this.#unit;
    }

    abstract log(): void;

    abstract add(elements: V extends undefined ? K[] : [K, V][]): void;

    abstract getSet(): V extends undefined ? Set<K> | [Set<K>, Set<K>] : never;
    abstract getMap(): V extends undefined ? never : Map<K, V> | [Map<K, V>, Map<K, V>];

    protected forEveryCase<TArgs>(
        args: TArgs,
        callbacks: {
            callbackMapAB?: (args: TArgs) => void;
            callbackSetAB?: (args: TArgs) => void;
            callbackMapA?: (args: TArgs) => void;
            callbackSetA?: (args: TArgs) => void;
            callbackMapB?: (args: TArgs) => void;
            callbackSetB?: (args: TArgs) => void;
        }
    ): void {
        switch (this.Mode) {
            case SheetMode.AB:
                if (this.Unit === SheetUnit.MAP && callbacks.callbackMapAB) {
                    callbacks.callbackMapAB(args);
                } else if (this.Unit === SheetUnit.SET && callbacks.callbackSetAB) {
                    callbacks.callbackSetAB(args);
                }
                break;
            case SheetMode.A:
                if (this.Unit === SheetUnit.MAP && callbacks.callbackMapA) {
                    callbacks.callbackMapA(args);
                } else if (this.Unit === SheetUnit.SET && callbacks.callbackSetA) {
                    callbacks.callbackSetA(args);
                }
                break;
            case SheetMode.B:
                if (this.Unit === SheetUnit.MAP && callbacks.callbackMapB) {
                    callbacks.callbackMapB(args);
                } else if (this.Unit === SheetUnit.SET && callbacks.callbackSetB) {
                    callbacks.callbackSetB(args);
                }
                break;
            default:
                throw new Error("Unsupported Mode or Unit.");
        }
    }
}

interface IAbstractSheet<K, V = undefined> {
    Mode: SheetMode;
    Unit: SheetUnit;
    add(elements: V extends undefined ? K[] : [K, V][]): void;
    log(): void;
    getSet(): V extends undefined ? Set<K> | [Set<K>, Set<K>] : never;
    getMap(): V extends undefined ? never : Map<K, V> | [Map<K, V>, Map<K, V>];
}

export class Sheet<K, V = undefined> extends AbstractSheet<K, V> implements IAbstractSheet<K, V> {
    A_Key: Set<K>;
    B_Key: Set<K>;
    A_Map: Map<K, V> | null;
    B_Map: Map<K, V> | null;

    constructor(
        emptyAsNull: boolean, // Obowiązkowy argumen
        A_initialElements?: V extends undefined ? K[] : [K, V][],
        B_initialElements?: V extends undefined ? K[] : [K, V][]
    ) {
        super();

        // Domyślne wartości dla A_Map i B_Map
        this.A_Key = new Set<K>();
        this.B_Key = new Set<K>();

        // Sprawdź, czy A_initialElements zawiera pary klucz-wartość (czyli V istnieje)
        if (A_initialElements && Array.isArray(A_initialElements[0]) && typeof A_initialElements[0][1] !== "undefined") {
            this.A_Map = new Map<K, V>();
            this.Unit = SheetUnit.MAP;
        } else {
            this.EmptyAsNull = true;
            this.A_Map = this.EmptyAsNull ? null : new Map<K, V>();
        }

        // Sprawdź B_initialElements podobnie
        if (B_initialElements && Array.isArray(B_initialElements[0]) && typeof B_initialElements[0][1] !== "undefined") {
            this.B_Map = new Map<K, V>();
            this.Unit = SheetUnit.MAP;
        } else {
            this.EmptyAsNull = true;
            this.B_Map = this.EmptyAsNull ? null : new Map<K, V>();
        }

        // Tryb Mode
        if (A_initialElements && B_initialElements) {
            this.Mode = SheetMode.AB;
        } else if (A_initialElements) {
            this.Mode = SheetMode.A;
        } else if (B_initialElements) {
            this.Mode = SheetMode.B;
        }

        // Dodaj elementy początkowe
        if (A_initialElements) {
            this.add(A_initialElements);
        }
        if (B_initialElements) {
            this.add(B_initialElements);
        }
    }



    add(elements: V extends undefined ? K[] : [K, V][]): void {
        this.forEveryCase<{ elements: V extends undefined ? K[] : [K, V][] }>(
            { elements },
            {
                callbackMapAB: ({ elements }) =>
                    elements.forEach(([key, value]) => {
                        this.A_Key.add(key);
                        this.B_Key.add(key);
                        this.A_Map?.set(key, value);
                        this.B_Map?.set(key, value);
                    }),
                callbackSetAB: ({ elements }) =>
                    elements.forEach((key) => {
                        this.A_Key.add(key);
                        this.B_Key.add(key);
                    }),
                callbackMapA: ({ elements }) =>
                    elements.forEach(([key, value]) => {
                        this.A_Key.add(key);
                        this.A_Map?.set(key, value);
                    }),
                callbackSetA: ({ elements }) =>
                    elements.forEach((key) => this.A_Key.add(key)),
                callbackMapB: ({ elements }) =>
                    elements.forEach(([key, value]) => {
                        this.B_Key.add(key);
                        this.B_Map?.set(key, value);
                    }),
                callbackSetB: ({ elements }) =>
                    elements.forEach((key) => this.B_Key.add(key)),
            }
        );
    }

    log(): void {
        console.log(`Mode: ${ SheetMode[this.Mode]}`);
        console.log(`Unit: ${ SheetUnit[this.Unit]}`);
        this.forEveryCase<void>(
            undefined, // Brak argumentów
            {
                callbackMapAB: () => {
                    console.log("%c  A  ", "font-weight:bold;background-color:rgb(9, 102, 207);");
                    console.log(this.A_Key);
                    console.log(this.A_Map);
                    console.log("%c  B  ", "font-weight:bold;background-color:rgb(9, 102, 207);");
                    console.log(this.B_Key);
                    console.log(this.B_Map);
                },
                callbackSetAB: () => {
                    console.log("%c  A  ", "font-weight:bold;background-color:rgb(9, 102, 207);");
                    console.log(this.A_Key);
                    console.log("%c  B  ", "font-weight:bold;background-color:rgb(9, 102, 207);");
                    console.log(this.B_Key);
                },
                callbackMapA: () => {
                    console.log("%c  A  ", "font-weight:bold;background-color:rgb(9, 102, 207);");
                    console.log(this.A_Key);
                    console.log(this.A_Map);
                },
                callbackSetA: () => {
                    console.log("%c  A  ", "font-weight:bold;background-color:rgb(9, 102, 207);");
                    console.log(this.A_Key);
                },
                callbackMapB: () => {
                    console.log("%c  B  ", "font-weight:bold;background-color:rgb(9, 102, 207);");
                    console.log(this.B_Key);
                    console.log(this.B_Map);
                },
                callbackSetB: () => {
                    console.log("%c  B  ", "font-weight:bold;background-color:rgb(9, 102, 207);");
                    console.log(this.B_Key);
                },
            }
        );
    }

    getSet(): V extends undefined ? Set<K> | [Set<K>, Set<K>] : Set<K> {
        if (this.Unit === SheetUnit.MAP || this.Unit === SheetUnit.SET) {
            return this.forEveryCase<{}>(
                {},
                {
                    callbackSetAB: () => {
                        return [this.A_Key, this.B_Key] as [Set<K>, Set<K>];
                    },
                    callbackSetA: () => {
                        return this.A_Key as Set<K>;
                    },
                    callbackSetB: () => {
                        return this.B_Key as Set<K>;
                    },
                }
            );
        } else {
            throw new Error("Unsupported Unit.");
        }
    }

    getMap(): V extends undefined ? never : Map<K, V> | [Map<K, V>, Map<K, V>] {
        if (this.Unit === SheetUnit.SET) {
            throw new Error("Maps are not applicable for this type (SET).");
        }

        return this.forEveryCase<{}>(
            {},
            {
                callbackMapAB: () => {
                    return [this.A_Map, this.B_Map] as [Map<K, V>, Map<K, V>];
                },
                callbackMapA: () => {
                    return this.A_Map as Map<K, V>;
                },
                callbackMapB: () => {
                    return this.B_Map as Map<K, V>;
                },
            }
        );
    }

}


// PRZYKŁAD

const t = true;
const sheetTwoMap_string_number = new Sheet<string, number>(t,[['A', 1], ['B', 2]], [['C', 3], ['D', 4]]);
const sheetOneMap_string_object = new Sheet<number, { a: boolean }>(t,[[1, { a: true }], [2, { a: false }], [4, { a: true }]]);
const sheetTwoSet_string = new Sheet<string>(t,["apple", "banana", "mango"], ["banana", "cherry"]);
const sheetOneSet_number = new Sheet<number>(t,[1, 2, 4, 6, 8]);