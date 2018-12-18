import * as Actions from '../actions/names';
import OwnTrainingService from '../services/OwnTrainingService'
const uuid = require('uuid/v4');

export function chooseLevel(id) {
    return {
        type: "CHOSSE_LEVEL_ACTION",
        payload: id
    }
}

export const findAllCustom = () => async dispatch => {
    dispatch({ type: Actions.FETCH_CUSTOM_LEVELS_START});
    const allCustom = await OwnTrainingService.findAll();
    dispatch({ type: Actions.FETCH_CUSTOM_LEVELS_SUCCESS, payload: allCustom });
}

export const deleteById = id => async (dispatch, getState) => {
    dispatch({ type: Actions.DELETE_CUSTOM_LEVEL_START, payload: id});
    const result = await OwnTrainingService.deleteById(id);
    if(result) {
        const { customLevels } = getState().levels;
        const afterDelete = customLevels.filter(i => i.id !== id);
        dispatch({type: Actions.DELETE_CUSTOM_LEVEL_SUCCESS, payload: afterDelete});
    }
}

export const insert = (level) => async dispatch => {
    dispatch({ type: Actions.SAVE_CUSTOM_LEVEL_START, payload: level });
    const levelWithId = {...level, id: uuid() };
    await OwnTrainingService.insert(levelWithId);
    const all = await OwnTrainingService.findAll();
    dispatch({type: Actions.SAVE_CUSTOM_LEVEL_SUCCCESS, payload: all});
}