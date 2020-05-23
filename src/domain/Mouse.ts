
export class Tumor {
    readonly width: number;
    readonly height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public volume(): number {
        const shorter = Math.min(this.width, this.height);
        const longer = Math.max(this.width, this.height);
        return 0.5 * shorter * shorter * longer
    }
}

export class Mouse {
    readonly id: string;
    readonly tumors: Array<Tumor>;

    constructor(id: string, tumors: Array<Tumor>) {
        this.id = id;
        this.tumors = Array.from(tumors);
    }

    public tumorsVolume(): number {
        return this.tumors.map(t => t.volume()).reduce((a, v) => v + a, 0);
    }
}

