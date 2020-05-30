import { Distribution, Group, randomize, RandomizationError } from "./Randomizer";
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

        expect(distribution.penalty()).toBeCloseTo(249.954);
    });
});

describe('randomize', () => {

    const mice = [m1, m2, m3, m4, m5, m6];

    test('sample randomization', async () => {
        const distribution = await (randomize(mice, { numberOfGroups: 2, micePerGroup: 3 }) as Promise<Distribution>);

        expect(distribution.penalty()).toBeCloseTo(52.7653);
        expect(distribution.groups).toHaveLength(2);
        expect(distribution.groups[0].mice).toHaveLength(3);
        expect(distribution.groups[1].mice).toHaveLength(3);
        const miceIds = distribution.groups.flatMap(g => g.mice).map(m => m.id);
        expect(miceIds.sort()).toEqual(["1", "2", "3", "4", "5", "6"]);
    });

    test('use only allowed number of mice', async () => {
        const distribution = await (randomize(mice, { numberOfGroups: 2, micePerGroup: 2 }) as Promise<Distribution>);

        expect(distribution.groups).toHaveLength(2);
        expect(distribution.groups[0].mice).toHaveLength(2);
        expect(distribution.groups[1].mice).toHaveLength(2);
    });

    test('honor tumor size constraints', async () => {
        const distribution = await (randomize(mice, { numberOfGroups: 2, micePerGroup: 2, minTumorsVolume: 1, maxTumorsVolume: 74 }) as Promise<Distribution>);
        const miceIds = distribution.groups.flatMap(g => g.mice).map(m => m.id);
        expect(miceIds.sort()).toEqual(["1", "2", "3", "5"]);

    });

    test('not enough mice', async () => {
        const error = randomize(mice, { numberOfGroups: 2, micePerGroup: 4 }) as RandomizationError;

        expect(error.message).toEqual('Number of mice meeting criteria (6) is less than number of groups x number of mice per group (8)');
    });
});
