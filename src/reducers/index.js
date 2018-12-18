import { combineReducers } from 'redux';
import planks from './PlanksReducer';
import levels from './LevelsReducer';
import training from './TrainingReducer';
import settings from './SettingsReducer';
import history from './HistoryReducer';

const rootReducer = combineReducers({
    planks,
    levels,
    training,
    settings,
    history
});

export default rootReducer;