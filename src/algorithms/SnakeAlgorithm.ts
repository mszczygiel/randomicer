import { Mouse } from "../domain/Mouse";
import { Distribution, Group, RandomizationSettings } from "../domain/Randomizer";
import { RandomizationAlgorithm } from "./RandomizationAlgorithm";

export class SnakeAlgorithm implements RandomizationAlgorithm {
    name(): string {
        return "snake";
    }
    randomize(mice: Mouse[], settings: RandomizationSettings): Promise<Distribution> {
        const sorted = [...mice].sort((m1, m2) => m2.tumorsVolume() - m1.tumorsVolume());
        const groups: Mouse[][] = [];
        for (let i = 0; i < settings.numberOfGroups; i++) {
            groups.push([]);
        }
        const toTake = settings.micePerGroup * settings.numberOfGroups;
        var groupIndex = 0;
        var direction = 1;
        for (let i = 0; i < toTake; i++) {
            groups[groupIndex].push(sorted[i]);
            if (direction === 1 && groupIndex === settings.numberOfGroups - 1) {
                direction = -1;
            } else if (direction === -1 && groupIndex === 0) {
                direction = 1
            } else {
                groupIndex += direction;
            }
        }
        const resultGroups = groups.map(g => new Group(g));
        return Promise.resolve(new Distribution(resultGroups));
    }

}
