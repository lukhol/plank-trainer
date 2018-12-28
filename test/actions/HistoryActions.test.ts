import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as HistoryActions from '../../src/actions/HistoryActions';
import * as Actions from '../../src/actions/names';
import { HistoryState } from '../../src/reducers/HistoryReducer';
import { HistoryItem } from '../../src/models';
import { expect } from 'chai';
import sinon from 'sinon';
import * as HistoryService from '../../src/services/HistoryService';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe(' ------ HISTORY ACTIONS ------', () => {
    const initialState: HistoryState = {
        historyItems: []
    };

    let store: any;

    beforeEach(() => {
        store = mockStore(initialState);
    })

    it('Can get all history - empty', () => {
        sinon.stub(HistoryService, 'findAllHistory').resolves([]);
        const expectedActions = [
            { type: Actions.LOAD_HISTORY_ITEM_START },
            { type: Actions.LOAD_HISTORY_ITEM_END, payload: [] }
        ];
        
        return store.dispatch(HistoryActions.getAll()).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
            (HistoryService.findAllHistory as any).restore();
        });
    });

    it('Can insert', () => {
        sinon.stub(HistoryService, 'saveHistory').resolves(true);
        const expectedActions = [
            { type: Actions.SAVE_HISTORY_ITEM_START },
            { type: Actions.SAVE_HISTORY_ITEM_END }
        ];

        const historyItem: HistoryItem = {
            datetime: 'somedatetime',
            name: 'somename',
            items: []
        };

        return store.dispatch(HistoryActions.insert(historyItem)).then(() => {
            expect(store.getActions()).to.deep.equals(expectedActions);
            (HistoryService.saveHistory as any).restore();
        });
    });
});