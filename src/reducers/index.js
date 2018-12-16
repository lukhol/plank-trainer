import { combineReducers } from 'redux';
import planks from './PlanksReducer';
import levels from './LevelsReducer';
import training from './TrainingReducer';

const rootReducer = combineReducers({
    planks,
    levels,
    training
});

export default rootReducer;