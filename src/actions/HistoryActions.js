import * as HistoryService from '../services/HistoryService';
import * as Actions from './names';

export const insert = (historyItem) => async dispatch => {
    dispatch({ type: Actions.SAVE_HISTORY_ITEM_START});
    await HistoryService.saveTraining(historyItem);
    dispatch({type: Actions.SAVE_HISTORY_ITEM_END});
}

export const getAll = () => async dispatch => {
    dispatch({ type: Actions.LOAD_HISTORY_ITEM_START});
    const historyItems = await HistoryService.getAllTrainings();
    dispatch({type: Actions.LOAD_HISTORY_ITEM_END, payload: historyItems});
}