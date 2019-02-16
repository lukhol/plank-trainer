import * as Actions from '../actions/names';
import { Settings } from '../models';

export interface SettingsState {
    loaded: false,
    defaultWaitTime: 10,
    gender: string,
    sound: boolean,
    readyDuration: number
} 

const initialState: SettingsState = {
    loaded: false,
    defaultWaitTime: 10,
    gender: 'FEMALE',
    sound: true,
    readyDuration: 3
};

export default function(state: SettingsState = initialState, action: any) {
    switch(action.type) {
        case Actions.LOAD_SETTINGS_START:
            return {
                ...state,
                ...action.payload
            };
        case Actions.LOAD_SETTINGS_END: 
            return {
                ...state,
                ...action.payload,
                loaded: true
            };
        case Actions.SAVE_SETTINGS_START: 
            return {
                ...state,
                ...action.payload
            };
        case Actions.SAVE_SETTINGS_END:
            return {
                ...state,
                ...action.payload
            };
    }

    return state;
}