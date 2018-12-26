import { AsyncStorage } from 'react-native';
import * as Actions from './names';
import { Settings } from '../models';
import { Dispatch } from 'redux';

const key = 'Settings';

const initialState: Settings = {
    loaded: false,
    defaultWaitTime: 10,
    gender: 'FEMALE',
    sound: true,
    readyDuration: 3
};

export const save = (settings: Settings) => async (dispatch: Dispatch) => {
    dispatch({type: Actions.SAVE_SETTINGS_START});
    try {
        await AsyncStorage.setItem(key, JSON.stringify(settings));
        dispatch({type: Actions.SAVE_SETTINGS_END, payload: settings});
    } catch (e) {
        console.log(e);
        //TODO:
        dispatch({type: Actions.SAVE_SETTINGS_END, payload: settings});
    }
}

export const load = () => async (dispatch: Dispatch) => {
    dispatch({type: Actions.LOAD_SETTINGS_START});
    try {
        let settings: any = await AsyncStorage.getItem(key);
        if (settings == null) {
            settings = {...initialState};
        } else {
            settings = JSON.parse(settings);
        }
        dispatch({type: Actions.LOAD_SETTINGS_END, payload: settings});
    } catch (e) {
        dispatch({type: Actions.LOAD_SETTINGS_END, payload: null});
    }
}