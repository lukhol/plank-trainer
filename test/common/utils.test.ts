import { expect } from 'chai';
import * as Utils from '../../src/common/utils';

describe(' ------ Utils ------ ', () => {
    it('Can convert seconds to formated time text', () => {
        expect(Utils.sec2time(0)).to.equal("00:00");
        expect(Utils.sec2time(45)).to.equal('00:45');
        expect(Utils.sec2time(60)).to.equal("01:00");
        expect(Utils.sec2time(126)).to.equal("02:06");
        expect(Utils.sec2time(890)).to.equal("14:50");
    });
});