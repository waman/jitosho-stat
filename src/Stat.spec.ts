import { Stat } from './Stat';
import { assert, expect } from 'chai';
// import chai from 'chai';
import 'mocha';

// chai.should();

describe('Stat', () => {
    const n = 200;
    it('should calculate mean and standard deviation', () => {
        // SetUp
        const data = new Array<number>(n);
        for(let i = 0; i < n; i++){
            const r = Math.random() * 3.0;
            data[i] = r < 1.0 ? 999 : r < 2.0 ? 1000 : 1001;  // series of 999, 1000, or 1001
        }
        // Exercise
        const stat = new Stat();
        for(let i = 0; i < n; i++){
            stat.add(data[i]);
        }
        // Verify
        const sd = stat.standardDeviation(), sd1 = calcStat1(data).sd, sd2 = calcStat2(data).sd;
        assert(Math.abs(sd-sd1) < Math.abs(sd2-sd1));
    });

    type StatResult = {mean: number, sd: number}

    function calcStat1(data: Array<number>): StatResult{
        let s1 = 0.0;

        for(let i = 0; i < n; i++){
            s1 += data[i];
        }
        const mean = s1/n;
        
        let s2 = 0.0;
        for(let i = 0; i < n; i++){
            const x = data[i] - mean;
            s2 += x*x;
        }

        return {mean: mean, sd: Math.sqrt(s2/(n-1))};
    }
    
    function calcStat2(data: Array<number>): StatResult{
        let s1 = 0.0, s2 = 0.0;
        for(let i = 0; i < n; i++){
            const x = data[i];
            s1 += x;
            s2 += x*x;
        }
        const mean = s1/n;
        const sd2 = (s2 - mean * s1) / (n-1);
        return {mean: mean, sd: s2 > 0.0 ? Math.sqrt(sd2) : 0.0};
    }
});