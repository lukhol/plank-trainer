import * as Actions from '../actions/names';
import OwnTrainingService from '../services/OwnTrainingService'
import { Dispatch } from 'redux';
import { Training } from '../models';

export function chooseLevel(id: string) {
    return {
        type: "CHOSSE_LEVEL_ACTION",
        payload: id
    }
}

export const findAllCustom = (): any => async (dispatch: Dispatch) => {
    dispatch({ type: Actions.FETCH_CUSTOM_LEVELS_START});
    const allCustom = await OwnTrainingService.findAll();
    dispatch({ type: Actions.FETCH_CUSTOM_LEVELS_SUCCESS, payload: allCustom });
};

export const deleteById = (id: string): any => async (dispatch: Dispatch, getState: any) => {
    dispatch({ type: Actions.DELETE_CUSTOM_LEVEL_START, payload: id});
    const result = await OwnTrainingService.deleteById(id);
    if(result) {
        const { customLevels } = getState().levels;
        const afterDelete = customLevels.filter((i: Training) => i.id !== id);
        dispatch({type: Actions.DELETE_CUSTOM_LEVEL_SUCCESS, payload: afterDelete});
    } else {
        dispatch({type: Actions.DELETE_CUSTOM_LEVEL_ERROR});
    }
};

export const insert = (level: Training): any => async (dispatch: Dispatch) => {
    dispatch({ type: Actions.SAVE_CUSTOM_LEVEL_START, payload: level });
    const result = await OwnTrainingService.insert(level);
    if(result) {
        const all = await OwnTrainingService.findAll();
        dispatch({type: Actions.SAVE_CUSTOM_LEVEL_SUCCCESS, payload: all});
    } else {
        dispatch({type: Actions.SAVE_CUSTOM_LEVEL_ERROR});
    }
};