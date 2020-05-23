import { Tumor, Mouse } from "./Mouse";

describe('Tumor', () => {
    test('tumor of zero size should have zero volume', () => {
        const tumor = new Tumor(0, 0);

        expect(tumor.volume()).toEqual(0);
    });

    test('some sample tumor should have correct volume', () => {
        const tumor = new Tumor(1.2, 3.6);

        expect(tumor.volume()).toEqual(2.592);
    });
});

describe('Mouse', () => {
    test('mouse without tumors should have 0 tumor volume', () => {
        const mouse = new Mouse('1', []);

        expect(mouse.tumorsVolume()).toEqual(0);
    });

    test('mouse with some tumors should calculate tumors volume', () => {
        const mouse = new Mouse('1', [new Tumor(1, 1), new Tumor(2, 2), new Tumor(3, 3)]);

        expect(mouse.tumorsVolume()).toEqual(18);
    });
});