import * as HistoryService from '../services/HistoryService';
import * as Actions from './names';
import { Dispatch } from 'redux';
import { HistoryItem } from '../models';

export const insert = (historyItem: HistoryItem) => async (dispatch: Dispatch) => {
    dispatch({ type: Actions.SAVE_HISTORY_ITEM_START});
    await HistoryService.saveTraining(historyItem);
    dispatch({type: Actions.SAVE_HISTORY_ITEM_END});
}

export const getAll = () => async (dispatch: Dispatch) => {
    dispatch({ type: Actions.LOAD_HISTORY_ITEM_START});
    const historyItems = await HistoryService.getAllTrainings();
    dispatch({type: Actions.LOAD_HISTORY_ITEM_END, payload: historyItems});
}