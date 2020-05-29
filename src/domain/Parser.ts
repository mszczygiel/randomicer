import { Mouse, Tumor } from "./Mouse";
import { parse } from "papaparse";
import * as rxjs from "rxjs";
import { bufferCount, map, skip, filter, toArray } from "rxjs/operators";

export function parseCSV(content: string): Mouse[] {
    const config = { delimiter: ";", skipEmptyLines: true };
    const parseResult = parse(content, config);
    let mice: Mouse[] = [];
    rxjs.from(parseResult.data)
        .pipe(
            bufferCount(2),
            map(w => readMouse(w[0], w[1])),
            toArray())
        .subscribe(m => mice = m);
    return mice;
}

function readMouse(l1: string[], l2: string[]): Mouse {
    const id = l1[0].trim();
    let tumors: Tumor[] = [];
    rxjs.zip(rxjs.from(l1), rxjs.from(l2))
        .pipe(skip(1),
            map(([v1, v2]) => [v1.trim().replace(",", "."), v2.trim().replace(",", ".")]),
            filter(([v1, v2]) => v1.length > 0 && v2.length > 0),
            map(([v1, v2]) => new Tumor(Number.parseFloat(v1), Number.parseFloat(v2))),
            toArray()).subscribe(x => tumors = x);

    return new Mouse(id, tumors);
}
