import * as mod from "../mod.ts";

console.log(" ");
console.log(" ");
console.log(" ");
console.log(" ");
const abInstance = new mod.AB<string>(
    ["zbiorA", "zbiorB"], 
    [
        new Set(["apple", "banana"]),
        new Set(["banana", "cherry"])
    ]
);

// Włączanie trybu debugowania
abInstance.setPrintMode = true; // Print mode is now enabled.
console.log(abInstance.getNames); // Wypisze nazwy w konsoli z debugowaniem

console.log(abInstance.getDataSet);
console.log(abInstance.getDataMap);

// Wyłączanie trybu debugowania
abInstance.setPrintMode = false; // Print mode is now disabled.
console.log(abInstance.getNames); // Wypisze nazwy bez dodatkowych informacji

console.log(abInstance.getDataSet);
console.log(abInstance.getDataMap);

//-----------------------------
console.log(" ");
console.log(" ");
console.log(" ");
console.log(" ");

interface cccc {
    v:number;
} 

const cdInstance = new mod.AB<string, cccc>(
    ["zbiorC", "zbiorD"],
    [
        new Map([["apple",{v:1}], ["banana",{v:1}]]),
        new Map([["banana",{v:1}], ["cherry",{v:1}]])
    ]
);

// Włączanie trybu debugowania
cdInstance.setPrintMode = true; // Print mode is now enabled.
console.log(cdInstance.getNames); // Wypisze nazwy w konsoli z debugowaniem

console.log(cdInstance.getDataSet);
console.log(cdInstance.getDataMap);

// Wyłączanie trybu debugowania
cdInstance.setPrintMode = false; // Print mode is now disabled.
console.log(cdInstance.getNames); // Wypisze nazwy bez dodatkowych informacji

console.log(cdInstance.getDataSet);
console.log(cdInstance.getDataMap);