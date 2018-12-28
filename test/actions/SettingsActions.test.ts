import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import sinon from 'sinon';

import * as SettingsActions from '../../src/actions/SettingsActions';
import * as Actions from '../../src/actions/names';
import { AsyncStorage } from 'react-native';
import { Settings } from '../../src/models';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe(' ------ HISTORY ACTIONS ------', () => {
    const initialState: Settings = {
        loaded: false,
        defaultWaitTime: 10,
        gender: 'FEMALE',
        sound: true,
        readyDuration: 3
    };

    let store: any= mockStore({settings: initialState});

    beforeEach(() => {
        store.clearActions();
    })

    it('Can save', () => {
        const newSettings = {
            ...initialState,
            sound: false
        };

        sinon
            .stub(AsyncStorage, 'setItem')
            .withArgs('Settings', JSON.stringify(newSettings))
            .resolves();

        const expectedActions = [
            { type: Actions.SAVE_SETTINGS_START, payload: newSettings },
            { type: Actions.SAVE_SETTINGS_END, payload: newSettings }
        ];
        
        return store.dispatch(SettingsActions.save(newSettings)).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
            (AsyncStorage.setItem as any).restore();
        });
    });

    it('Cannot save', () => {
        const newSettings = {
            ...initialState,
            sound: false
        };

        sinon
            .stub(AsyncStorage, 'setItem')
            .withArgs('Settings', JSON.stringify(newSettings))
            .rejects();
        
        const expectedActions = [
            { type: Actions.SAVE_SETTINGS_START, payload: newSettings },
            { type: Actions.SAVE_SETTINGS_ERROR }
        ];

        return store.dispatch(SettingsActions.save(newSettings)).then(() => {
            const storeActions = store.getActions();
            expect(storeActions.length).to.equal(2);
            expect(storeActions[0]).to.deep.equal(expectedActions[0]);
            expect(storeActions[1].type).to.equal(expectedActions[1].type);
            expect(storeActions[1].payload).to.be.an('error');
            (AsyncStorage.setItem as any).restore();
        });
    });

    it('Cannot load', () => {
        const error = Error('Some error');
        sinon
            .stub(AsyncStorage, 'getItem')
            .withArgs('Settings')
            .rejects(error);
        
        const expectedActions = [
            { type: Actions.LOAD_SETTINGS_START },
            { type: Actions.LOAD_SETTINGS_ERROR, payload: error }
        ];

        return store.dispatch(SettingsActions.load()).then(() =>{
            expect(store.getActions()).to.deep.equal(expectedActions);
            (AsyncStorage.getItem as any).restore();
        })
    });

    it('Can load - with initial default state', () => {
        sinon
            .stub(AsyncStorage, 'getItem')
            .withArgs('Settings')
            .resolves(null);

        const expectedActions = [
            { type: Actions.LOAD_SETTINGS_START },
            { type: Actions.LOAD_SETTINGS_END, payload: initialState }
        ];

        return store.dispatch(SettingsActions.load()).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
            (AsyncStorage.getItem as any).restore();
        });
    });

    it('Can load - settings from memory', () => {
        const newSettings = {
            ...initialState,
            sound: false
        };

        sinon
            .stub(AsyncStorage, 'getItem')
            .withArgs('Settings')
            .resolves(JSON.stringify(newSettings));

        const expectedActions = [
            { type: Actions.LOAD_SETTINGS_START },
            { type: Actions.LOAD_SETTINGS_END, payload: newSettings }
        ];

        return store.dispatch(SettingsActions.load()).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
            (AsyncStorage.getItem as any).restore();
        });
    });
});