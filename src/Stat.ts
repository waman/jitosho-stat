export class Stat{

    private n = 0;
    private s1 = 0.0;
    private s2 = 0.0;

    constructor(){}

    add(data: number){
        this.n++;
        const x = data - this.s1;
        this.s1 += x / this.n;
        this.s2 += (this.n - 1) * x * x / this.n;
    }

    dataCount(): number { return this.n; }
    mean(): number { return this.s1; }
    standardDeviation(): number { return Math.sqrt(this.s2/(this.n-1)); }

    toString(): string {
        return `{"n": ${this.dataCount()}, "mean": ${this.mean()}, "standard deviation": ${this.standardDeviation()}}`
    }
}