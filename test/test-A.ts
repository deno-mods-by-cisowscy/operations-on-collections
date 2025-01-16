import { Logger } from '../main/elements/logger.ts';
import { Sheet, SheetMode } from "../main/elements/sheet.ts";

Logger.logBlank(null, 70, 2);
Logger.logBlank("rgb(106, 175, 166)", 70, 2);
Logger.logTitle("rgb(106, 175, 166)", "TESTOWANIE KONSTRUKTORA KLASY SHEET", 70);
Logger.logBlank("rgb(106, 175, 166)", 70, 2);
Logger.logBlank(null, 70, 2);


// Tworzymy instancje klasy Sheet

const t = false;
const sheetTwoMap_string_number = new Sheet<string, number>(t, 
    [['A', 1], ['B', 2]], 
    [['C', 3], ['D', 4]]
);
const sheetTwoSet_string = new Sheet<string>(t, 
    ["apple", "banana", "mango"], 
    ["banana", "cherry"]
);

const sheetOneMap_string_object = new Sheet<number, { a: boolean }>(t,
    [[1, { a: true }], [2, { a: false }], [4, { a: true }]]
);
const sheetOneSet_number = new Sheet<number>(t,
    [1, 2, 4, 6, 8]
);


const sheetOneMapA_string_object = new Sheet<number, { a: boolean }>(t,
    [[1, { a: true }], [2, { a: false }], [4, { a: true }]],
    undefined
);
const sheetOneSetA_number = new Sheet<number>(t,
    [1, 2, 4, 6, 8],
    undefined
);


const sheetOneMapB_string_object = new Sheet<number, { a: boolean }>(t,
    undefined,
    [[1, { a: true }], [2, { a: false }], [4, { a: true }]]
);
const sheetOneSetB_number = new Sheet<number>(t,
    undefined,
    [1, 2, 4, 6, 8]
);

Logger.logTitle("rgb(197, 196, 136)", "Tworzymy instancje klasy Sheet", 70);
Logger.logBlank(null, 70, 1);
Logger.logVariable("rgb(197, 196, 136)", { sheetTwoMap_string_number });
Logger.logVariable("rgb(197, 196, 136)", { sheetTwoSet_string });
Logger.logBlank("rgb(197, 196, 136)", 70, 1);
Logger.logBlank(null, 70, 1);
Logger.logVariable("rgb(197, 196, 136)", { sheetOneMap_string_object });
Logger.logVariable("rgb(197, 196, 136)", { sheetOneSet_number });
Logger.logBlank("rgb(197, 196, 136)", 70, 1);
Logger.logBlank(null, 70, 3);


Logger.logVariable("rgb(197, 196, 136)", { sheetOneMapA_string_object });
Logger.logVariable("rgb(197, 196, 136)", { sheetOneSetA_number });
Logger.logBlank("rgb(197, 196, 136)", 70, 1);
Logger.logBlank(null, 70, 1);
Logger.logVariable("rgb(197, 196, 136)", { sheetOneMapB_string_object });
Logger.logVariable("rgb(197, 196, 136)", { sheetOneSetB_number });
Logger.logBlank("rgb(197, 196, 136)", 70, 1);
Logger.logBlank(null, 70, 1);


Logger.logBlank(null, 70, 8);
Logger.logBlank("rgb(106, 175, 166)", 70, 2);
Logger.logTitle("rgb(106, 175, 166)", "TESTOWANIE METODY LOG KLASY SHEET", 70);
Logger.logBlank("rgb(106, 175, 166)", 70, 2);
Logger.logBlank(null, 70, 2);




Logger.logBlank("rgb(175, 175, 175)", 70, 2);
sheetTwoMap_string_number.log();
Logger.logBlank(null, 70, 2);

Logger.logBlank("rgb(175, 175, 175)", 70, 2);
sheetTwoSet_string.log();
Logger.logBlank(null, 70, 2);

Logger.logBlank("rgb(175, 175, 175)", 70, 2);
sheetOneMap_string_object.log();
Logger.logBlank(null, 70, 2);

Logger.logBlank("rgb(175, 175, 175)", 70, 2);
sheetOneSet_number.log();
Logger.logBlank(null, 70, 6);





Logger.logBlank("rgb(175, 175, 175)", 70, 2);
sheetOneMapA_string_object.log();
Logger.logBlank(null, 70, 2);

Logger.logBlank("rgb(175, 175, 175)", 70, 2);
sheetOneSetA_number.log();
Logger.logBlank(null, 70, 2);

Logger.logBlank("rgb(175, 175, 175)", 70, 2);
sheetOneMapB_string_object.log();
Logger.logBlank(null, 70, 2);

Logger.logBlank("rgb(175, 175, 175)", 70, 2);
sheetOneSetB_number.log();





Logger.logBlank(null, 70, 10);
Logger.logBlank("rgb(106, 175, 166)", 70, 2);
Logger.logTitle("rgb(106, 175, 166)", "TESTOWANIE METODY ADD KLASY SHEET", 70);
Logger.logBlank("rgb(106, 175, 166)", 70, 2);
Logger.logBlank(null, 70, 2);


Logger.logTitle("rgb(189, 223, 236)", "przed zmianą", 2);
sheetTwoMap_string_number.log();

//executeWithMode
sheetTwoMap_string_number.atMode(SheetMode.A, () => sheetTwoMap_string_number.add([['ZZZZ', 777], ['RRRR', 9999]]));

//sheetTwoMap_string_number.Mode = SheetMode.A;
//sheetTwoMap_string_number.add([['ZZZZ', 777], ['RRRR', 9999]]);
//sheetTwoMap_string_number.Mode = SheetMode.AB;

Logger.logTitle("rgb(189, 223, 236)", "po zmianie", 2);
sheetTwoMap_string_number.log();


