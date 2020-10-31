import { Mouse } from "../domain/Mouse";
import { Distribution, RandomizationSettings } from "../domain/Randomizer";
import { ExperimentalAlgorithm } from "./ExperimentalAlgorithm";
import { SnakeAlgorithm } from "./SnakeAlgorithm";


export interface RandomizationAlgorithm {
    name(): string;
    randomize(mice: Mouse[], settings: RandomizationSettings): Promise<Distribution>;
};


const randomizationAlgorithms: RandomizationAlgorithm[] = [new ExperimentalAlgorithm(), new SnakeAlgorithm()];
export const randomizationAlgorithmNames = randomizationAlgorithms.map(a => a.name());
export const defaultRandomizationAlgorithm = randomizationAlgorithms[0];
export function findAlgorithm(name: string): RandomizationAlgorithm {
    const alg = randomizationAlgorithms.find(a => a.name() === name);
    if (alg === undefined) {
        throw new Error(`algorithm ${name} not found`);
    } else {
        return alg;
    }
}
