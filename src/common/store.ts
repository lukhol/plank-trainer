import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer, { RootState } from '../reducers/index';

const configureStore = (preloadedState: any) => createStore(
    rootReducer,
    preloadedState, 
    applyMiddleware(thunk)
);

export default configureStore;