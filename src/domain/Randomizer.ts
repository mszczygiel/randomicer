import { Mouse } from "./Mouse";
import { abs, mean, median, std } from "mathjs";
import * as rxjs from 'rxjs';
import { map, mergeMap, reduce } from "rxjs/operators";
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

    public penalty(): Promise<number> {
        return rxjs.from(this.groups).pipe(
            mergeMap(g => rxjs.from(this.groups)
                .pipe(map(g1 => [g, g1]))))
            .pipe(
                reduce((acc, [g1, g2]) => acc + abs(g1.tumorsMean() - g2.tumorsMean()) + abs(g1.tumorsMedian() - g2.tumorsMedian()), 0))
            .toPromise();
    }
};

export interface RandomizationError {
    message: string;
};

export function randomize(mice: Mouse[], settings: RandomizationSettings): Distribution | RandomizationError {
    return { message: "fail" };
}
