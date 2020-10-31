import { Mouse } from "../domain/Mouse";
import { Distribution, RandomizationSettings } from "../domain/Randomizer";
import { RandomizationAlgorithm  } from "./RandomizationAlgorithm";

export class SnakeAlgorithm implements RandomizationAlgorithm {
    name(): string {
        return "snake";
    }
    randomize(mice: Mouse[], settings: RandomizationSettings): Promise<Distribution> {
        throw new Error("Method not implemented.");
    }

}
