import { combineReducers } from 'redux';
import planks from './PlanksReducer';
import levels from './LevelsReducer';
import training from './TrainingReducer';
import settings from './SettingsReducer';

const rootReducer = combineReducers({
    planks,
    levels,
    training,
    settings
});

export default rootReducer;