import historyReducer from '../../src/reducers/HistoryReducer';
import { expect } from  'chai';
import * as Actions from '../../src/actions/names';

describe(' ----- HistoryReducer ----- ', () => {
    it('LOAD_HISTORY_ITEM_END', () => {
        const newState = historyReducer(undefined, {type: Actions.LOAD_HISTORY_ITEM_END});
        console.log(newState);
        expect(newState.historyItems).to.be.an('array');
    });
});