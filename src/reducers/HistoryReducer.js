import * as Actions from '../actions/names';

const initialState = {
    historyItems: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case Actions.LOAD_HISTORY_ITEM_END:
            return {
                ...state, 
                historyItems: action.payload
            }
    }

    return state;
}