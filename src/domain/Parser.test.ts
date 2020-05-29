import { parseCSV } from "./Parser";
import { Mouse, Tumor } from "./Mouse";

describe('Parser', () => {
    test("parse correct file", () => {
        const content = `
          1;2.3;3.0
          ;2.0;3,1
          2;5;
          ;2;`

        const mice = parseCSV(content);
        const expected = [new Mouse("1", [new Tumor(2.3, 2.0), new Tumor(3.0, 3.1)]), new Mouse("2", [new Tumor(5, 2)])];
        expect(mice).toEqual<Mouse[]>(expected);
    });
});
