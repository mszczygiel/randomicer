import { Mouse, Tumor } from "../domain/Mouse";
import { SnakeAlgorithm } from "./SnakeAlgorithm";

const m1 = new Mouse('1', [new Tumor(1, 2)]);
const m2 = new Mouse('2', [new Tumor(2, 3)]);
const m3 = new Mouse('3', [new Tumor(3, 4)]);
const m4 = new Mouse('4', [new Tumor(4, 5)]);
const m5 = new Mouse('5', [new Tumor(5, 6)]);
const m6 = new Mouse('6', [new Tumor(7, 8)]);


describe('SnakeAlgorithm.randomize', () => {

    const mice = [m1, m2, m3, m4, m5, m6];
    const algorithm = new SnakeAlgorithm();

    test('sample randomization', async () => {
        const distribution = await (algorithm.randomize(mice, { numberOfGroups: 2, micePerGroup: 3 }));

        expect(distribution.groups).toHaveLength(2);
        expect(distribution.groups[0].mice).toHaveLength(3);
        expect(distribution.groups[1].mice).toHaveLength(3);
        const miceIds = distribution.groups.flatMap(g => g.mice).map(m => m.id);
        expect(miceIds).toEqual(["6", "3", "2", "5", "4", "1"]);
    });
});
