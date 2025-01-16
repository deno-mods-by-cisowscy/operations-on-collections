import { nType } from "../types/mod.ts";

export class AB<K,V = undefined> {
    #print:boolean = false;
    #name_keyA: string = "A";
    #name_keyB: string = "B";

    #data_type: nType.nTab.ValidationReturnType;
    #data_keyA: nType.oneSet<K>;
    #data_keyB: nType.oneSet<K>;
    #data_mapA: nType.oneMap<K, V> | undefined = undefined;
    #data_mapB: nType.oneMap<K, V> | undefined = undefined;

    constructor(
        newNames:[string,string], 
        newData:nType.nTab.TypeGenerate<K,V>
    ){
        this.setNameA = newNames[0];
        this.setNameB = newNames[1];

        const validationNewData = nType.nTab.validationTypeGenerate(newData);
        switch (validationNewData) {
            case nType.nTab.ValidationReturnText.is_tabSet: {
                // newData is a tabSet
                this.#data_type = nType.nTab.ValidationReturnText.is_tabSet;
                const [setA, setB] = newData as nType.tabSet<K>;
                this.#data_keyA = setA;
                this.#data_keyB = setB;
                break;
            }
            case nType.nTab.ValidationReturnText.is_tabMap: {
                // newData is a tabMap
                this.#data_type = nType.nTab.ValidationReturnText.is_tabMap;
                const [mapA, mapB] = newData as nType.tabMap<K, V>;
                const keyA = new Set<K>(mapA.keys());
                const keyB = new Set<K>(mapB.keys());
                this.#data_keyA = keyA;
                this.#data_keyB = keyB;
                this.#data_mapA = mapA;
                this.#data_mapB = mapB;
                break;
            }
            //default:
            //    // Invalid input
            //    throw new Error("Invalid input for newData");
        }
    }

    // Setter dla #nameKeyA
    set setNameA(newName:string){
        this.#name_keyA = this.#validateName(newName, "name_keyA");
    }

    // Setter dla #nameKeyB
    set setNameB(newName: string) {
        this.#name_keyB = this.#validateName(newName, "name_keyB");
    }

    // Getter do pobierania nazw
    get getNames(): [string, string] {
        if (this.#print) {
            console.log("Current names:");
            console.log("  #name_keyA:", this.#name_keyA);
            console.log("  #name_keyB:", this.#name_keyB);
        }
        return [this.#name_keyA, this.#name_keyB];
    }
    // Getter do pobierania danych Set
    get getDataSet(): nType.tabSet<K> {
        const result: nType.tabSet<K> = [this.#data_keyA, this.#data_keyB];
        if (this.#print) {
            console.log("Current tabSet<K>:");
            console.log(result);
        }
        return result;
    }
    // Getter do pobierania danych Map
    get getDataMap(): nType.tabMap<K, V> | undefined {
        if (this.#data_type != nType.nTab.ValidationReturnText.is_tabMap) {
            return undefined;
        }
        const result: nType.tabMap<K, V> = [this.#data_mapA, this.#data_mapB] as nType.tabMap<K, V>;
        if (this.#print) {
            console.log("Current tabMap<K, V>:");
            console.log(result);
        }
        return result;
    }


    // Setter dla trybu debugowania
    set setPrintMode(enable: boolean) {
        this.#print = enable;
        console.log(`Print mode is now ${enable ? "enabled" : "disabled"}.`);
    }

    // Prywatna metoda walidująca nazwy
    #validateName(name: string, fieldName: string): string {
        if (!name || typeof name !== "string") {
            throw new Error(`Invalid value for ${fieldName}. It must be a non-empty string.`);
        }
        return name.trim();
    }

}