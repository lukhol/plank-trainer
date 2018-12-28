import historyReducer from '../../src/reducers/HistoryReducer';
import { expect } from  'chai';
import * as Actions from '../../src/actions/names';

describe(' ----- HistoryReducer ----- ', () => {
    it('Initial state', () => {
        const newState = historyReducer(undefined, {type: 'any'});
        expect(newState.historyItems).to.be.an('array');
        expect(newState.historyItems.length).to.equal(0);
    });

    it('LOAD_HISTORY_ITEM_END', () => {
        const action = {
            type: Actions.LOAD_HISTORY_ITEM_END,
            payload: [
                {
                    datetime: 'somedatetime',
                    name: 'somename',
                    planks: []
                }
            ]
        };

        const newState = historyReducer(undefined, action);

        expect(newState.historyItems).to.be.an('array');
        expect(newState.historyItems.length).to.equal(1);
        expect(newState.historyItems).to.deep.equal(action.payload);
    });
});