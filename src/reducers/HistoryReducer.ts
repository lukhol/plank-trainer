import * as Actions from '../actions/names';
import { HistoryItem } from '../models';

const initialState = {
    historyItems: []
};

export interface HistoryState {
    historyItems: Array<HistoryItem>
}

export default function(state: HistoryState = initialState, action: any): HistoryState {
    switch(action.type) {
        case Actions.LOAD_HISTORY_ITEM_END:
            return {
                ...state, 
                historyItems: action.payload
            }
    }

    return state;
}