import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer, { RootState } from './reducers/index';
import logger from 'redux-logger';

const configureStore = (preloadedState: any) => createStore(
    rootReducer,
    preloadedState, 
    applyMiddleware(thunk, logger)
);

export default configureStore;