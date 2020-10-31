import { Mouse } from "./Mouse";
import { mean, median, std } from "mathjs";
import { RandomizationAlgorithm } from "../algorithms/RandomizationAlgorithm";


export interface RandomizationSettings {
    micePerGroup: number;
    numberOfGroups: number;
};

export interface MiceSelectionThresholds {
    minTumorsVolume?: number;
    maxTumorsVolume?: number;
};

export class Group {
    readonly mice: Mouse[];
    constructor(mice: Mouse[]) {
        this.mice = mice;
    }

    public tumorsMedian(): number {
        return median(this.volumes());
    }

    public tumorsMean(): number {
        return mean(this.volumes());
    }

    public tumorsStdDev(): number {
        return std(this.volumes());
    }

    private volumes(): number[] {
        return this.mice.map(m => m.tumorsVolume());
    }
};

export class Distribution {
    readonly groups: Group[];

    constructor(groups: Group[]) {
        this.groups = groups;
    }
};

export class RandomizationError {
    readonly message: string;

    constructor(message: string) {
        this.message = message;
    }
};

export function randomize(mice: Mouse[], algorithm: RandomizationAlgorithm, settings: RandomizationSettings, thresholds: MiceSelectionThresholds): Promise<Distribution> | RandomizationError {
    const qualifiedMice = mice.filter(mouse => thresholds.minTumorsVolume == null ? true : mouse.tumorsVolume() >= thresholds.minTumorsVolume)
        .filter(mouse => thresholds.maxTumorsVolume == null ? true : mouse.tumorsVolume() <= thresholds.maxTumorsVolume);
    const expectedMiceCount = settings.micePerGroup * settings.numberOfGroups;
    if (expectedMiceCount > qualifiedMice.length) {
        return new RandomizationError(`Number of mice meeting criteria (${qualifiedMice.length}) is less than number of groups x number of mice per group (${expectedMiceCount})`);
    }
    return algorithm.randomize(qualifiedMice, settings);
}
