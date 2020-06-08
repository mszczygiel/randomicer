import { Mouse } from "./Mouse";
import { abs, mean, median, std, min, max } from "mathjs";
import * as rxjs from 'rxjs';
import { map, mergeMap, reduce, min as rxMin, take, bufferCount, toArray } from "rxjs/operators";
import { GenerateOptions } from "rxjs/internal/observable/generate";
export interface RandomizationSettings {
    minTumorsVolume?: number;
    maxTumorsVolume?: number;
    micePerGroup: number;
    numberOfGroups: number;
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

    public penalty(): number {
        let res = 0;
        rxjs.from(this.groups).pipe(
            mergeMap(g => rxjs.from(this.groups)
                .pipe(map(g1 => [g, g1]))))
            .pipe(
                reduce((acc, [g1, g2]) => acc + abs(g1.tumorsMean() - g2.tumorsMean()) + abs(g1.tumorsMedian() - g2.tumorsMedian()), 0))
            .subscribe(v => { res = v });
        return res;
    }
};

export class RandomizationError {
    readonly message: string;

    constructor(message: string) {
        this.message = message;
    }
};

export function randomize(mice: Mouse[], settings: RandomizationSettings): Promise<Distribution> | RandomizationError {
    const numberOfIterations = max(1000, min(mice.length * mice.length, 10000));
    const qualifiedMice = mice.filter(mouse => settings.minTumorsVolume == null ? true : mouse.tumorsVolume() >= settings.minTumorsVolume)
        .filter(mouse => settings.maxTumorsVolume == null ? true : mouse.tumorsVolume() <= settings.maxTumorsVolume);
    const expectedMiceCount = settings.micePerGroup * settings.numberOfGroups;
    if (expectedMiceCount > qualifiedMice.length) {
        return new RandomizationError(`Number of mice meeting criteria (${qualifiedMice.length}) is less than number of groups x number of mice per group (${expectedMiceCount})`);
    }
    const gen: GenerateOptions<Mouse[], Mouse[]> = {
        initialState: [...qualifiedMice],
        iterate: p => shuffle(p),
        resultSelector: m => m,
        scheduler: rxjs.asyncScheduler
    };

    function createDistribution(mice: Mouse[]) {
        const distribution = rxjs.from(mice)
            .pipe(
                take(expectedMiceCount),
                bufferCount(settings.micePerGroup),
                toArray(),
                map(buffered => buffered.map(g => new Group(g))),
                map(groups => new Distribution(groups)))
        return distribution;
    }

    return rxjs.generate(gen).pipe(
        take(numberOfIterations),
        mergeMap(mice => createDistribution(mice)),
        rxMin((d1, d2) => d1.penalty() - d2.penalty())
    ).toPromise();
}

function shuffle<T>(arr: T[]): T[] {
    let currentIndex = arr.length;
    const res = [...arr];
    while (0 !== currentIndex) {

        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        const temporaryValue = res[currentIndex];
        res[currentIndex] = res[randomIndex];
        res[randomIndex] = temporaryValue;
    }

    return res;
}
