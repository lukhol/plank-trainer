import { combineReducers } from 'redux';
import planks from './PlanksReducer';
import levels, { LevelState } from './LevelsReducer';
import training, { TrainingState } from './TrainingReducer';
import settings, { SettingsState } from './SettingsReducer';
import history, { HistoryState } from './HistoryReducer';
import * as Models from '../models';

export interface RootState {
    readonly planks: Array<Models.Plank>,
    readonly levels: LevelState,
    readonly training: TrainingState,
    readonly settings: SettingsState,
    readonly history: HistoryState,
}

const rootReducer = combineReducers({
    planks,
    levels,
    training,
    settings,
    history
});

export default rootReducer;