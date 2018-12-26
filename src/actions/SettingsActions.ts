import { AsyncStorage } from 'react-native';
import {ThunkAction} from 'redux-thunk';
import {Action, ActionCreator, Dispatch} from 'redux';
import * as Actions from './names';
import { Settings } from '../models';

const key = 'Settings';

interface IState {
    something: boolean
}

const initialState: Settings = {
    loaded: false,
    defaultWaitTime: 10,
    gender: 'FEMALE',
    sound: true,
    readyDuration: 3
};

export const save = (settings: Settings): any => async (dispatch: Dispatch) => {
    dispatch({type: Actions.SAVE_SETTINGS_START});
    try {
        await AsyncStorage.setItem(key, JSON.stringify(settings));
        dispatch({type: Actions.SAVE_SETTINGS_END, payload: settings});
    } catch (e) {
        console.log(e);
        //TODO:
        dispatch({type: Actions.SAVE_SETTINGS_END, payload: settings});
    }
};

export const load = (): any => async (dispatch: Dispatch) => {
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
};

const reduxAction: ActionCreator<Action> = (text: string) => {
    return {
        type: ''
    }
}

const thunkAction: ActionCreator<ThunkAction<Action, IState, void, any>> = (
    text: string
  ) => {
    return (dispatch: Dispatch<Action<any>>): Action => {
      return dispatch({
        type: 'boolean',
        text
      });
    };
  };