import { GenerateOptions } from "rxjs/internal/observable/generate";
import { Mouse } from "../domain/Mouse";
import { Distribution, Group, RandomizationSettings } from "../domain/Randomizer";
import { RandomizationAlgorithm } from "./RandomizationAlgorithm";
import { abs, min, max, sum } from "mathjs";
import { map, mergeMap, reduce, min as rxMin, take, bufferCount, toArray } from "rxjs/operators";
import * as rxjs from 'rxjs';

export class ExperimentalAlgorithm implements RandomizationAlgorithm {
    name(): string {
        return "experimental";
    }
    randomize(mice: Mouse[], settings: RandomizationSettings): Promise<Distribution> {
        const numberOfIterations = max(1000, min(mice.length * mice.length, 10000));
        const gen: GenerateOptions<Mouse[], Mouse[]> = {
            initialState: [...mice],
            iterate: p => this.shuffle(p),
            resultSelector: m => m,
            scheduler: rxjs.asyncScheduler
        };


        return rxjs.generate(gen).pipe(
            take(numberOfIterations),
            mergeMap(mice => this.createDistribution(mice, settings)),
            rxMin((d1, d2) => ExperimentalAlgorithm.penalty(d1) - ExperimentalAlgorithm.penalty(d2))
        ).toPromise();
    }

    public static penalty(distribution: Distribution): number {
        let res = 0;
        const meanNorm = sum(distribution.groups.map((g) => g.tumorsMean()));
        const medianNorm = sum(distribution.groups.map((g) => g.tumorsMedian()));

        function distance(g1: Group, g2: Group) {
            const mean = abs(g1.tumorsMean() - g2.tumorsMean()) / meanNorm;
            const med = abs(g1.tumorsMedian() - g2.tumorsMedian()) / medianNorm;
            return med * 2 + mean;
        }

        rxjs.from(distribution.groups).pipe(
            mergeMap(g => rxjs.from(distribution.groups)
                .pipe(map(g1 => [g, g1]))))
            .pipe(
                reduce((acc, [g1, g2]) => acc + distance(g1, g2), 0))
            .subscribe(v => { res = v });
        return res;
    }

    private createDistribution(mice: Mouse[], settings: RandomizationSettings) {
        const expectedMiceCount = settings.micePerGroup * settings.numberOfGroups;
        const distribution = rxjs.from(mice)
            .pipe(
                take(expectedMiceCount),
                bufferCount(settings.micePerGroup),
                toArray(),
                map(buffered => buffered.map(g => new Group(g))),
                map(groups => new Distribution(groups)))
        return distribution;
    }
    private shuffle<T>(arr: T[]): T[] {
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

}
