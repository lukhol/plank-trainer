import * as Actions from '../actions/names';

const initialState = {
    loaded: false,
    defaultWaitTime: 10,
    gender: 'FEMALE',
    sound: true,
    readyDuration: 3
};

export default function(state = initialState, action) {
    switch(action.type) {
        case Actions.LOAD_SETTINGS_START:
            return {
                ...state,
                ...action.payload
            }
        case Actions.LOAD_SETTINGS_END: 
            return {
                ...state,
                ...action.payload,
                loaded: true
            }
        case Actions.SAVE_SETTINGS_START: 
            return {
                ...state,
                ...action.payload
            }
        case Actions.SAVE_SETTINGS_END:
            return {
                ...state,
                ...action.payload
            }
    }

    return state;
}