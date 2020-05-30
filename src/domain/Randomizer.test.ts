import { Distribution, Group } from "./Randomizer";
import { Mouse, Tumor } from "./Mouse";

const m1 = new Mouse('1', [new Tumor(1, 2)]);
const m2 = new Mouse('2', [new Tumor(2.5, 2.2), new Tumor(3.3, 2.1)]);
const m3 = new Mouse('3', [new Tumor(3, 4)]);
const m4 = new Mouse('4', [new Tumor(1, 0.5)]);
const m5 = new Mouse('5', [new Tumor(3, 1.1)]);
const m6 = new Mouse('6', [new Tumor(5, 6)]);

describe('Distribution', () => {
    test('penalty', () => {
        const groups = [new Group([m1, m2]), new Group([m3, m4]), new Group([m5, m6])];

        const distribution = new Distribution(groups);

        expect(distribution.penalty()).resolves.toBeCloseTo(249.954);
    });
});
