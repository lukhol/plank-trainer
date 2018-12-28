import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as LevelActions from '../../src/actions/LevelsActions';
import * as Actions from '../../src/actions/names';
import { expect } from 'chai';
import sinon from 'sinon';
import OwnTrainingService from '../../src/services/OwnTrainingService';
import { TrainingType } from '../../src/models';
import { LevelState } from '../../src/reducers/LevelsReducer';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe(' ------ HISTORY ACTIONS ------', () => {
    const level1 = {id: '1', name: '1', planks: [], type: TrainingType.CUSTOM };
    const level2 = {id: '2', name: '2', planks: [], type: TrainingType.CUSTOM };
    const levelState: LevelState = {
        choosenLevelId: '',
        isFethingCustom: false,
        customLevels: [level1, level2],
        levels: []
    };

    let store: any;

    beforeEach(() => {
        store = mockStore({levels: levelState});
    })

    it('Can choose level', () => {
        const action = LevelActions.chooseLevel('1');
        expect(action.type).to.equal(Actions.CHOSSE_LEVEL_ACTION);
        expect(action.payload).to.equal('1');
    });

    it('Find all custom - empty', () => {
        const training = {id: 'someid', name: 'somename', planks: [], type: TrainingType.CUSTOM};
        sinon.stub(OwnTrainingService, 'findAll').resolves([training]);
        
        const expectedActions = [
            { type: Actions.FETCH_CUSTOM_LEVELS_START },
            { type: Actions.FETCH_CUSTOM_LEVELS_SUCCESS , payload: [training] }
        ];

        return store.dispatch(LevelActions.findAllCustom()).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
            (OwnTrainingService.findAll as any).restore();
        });
    });

    it('Cannot delete by id - failed to delete', () => {
        const idToDelete = '123';
        sinon
            .stub(OwnTrainingService, 'deleteById')
            .withArgs(idToDelete)
            .resolves(false);
            
        const expectedActions = [
            { type: Actions.DELETE_CUSTOM_LEVEL_START, payload: idToDelete },
            { type: Actions.DELETE_CUSTOM_LEVEL_ERROR }
        ];

        return store.dispatch(LevelActions.deleteById(idToDelete)).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
            (OwnTrainingService.deleteById as any).restore();
        });
    });

    it('Can delete by id', () => {
        sinon
            .stub(OwnTrainingService, 'deleteById')
            .withArgs(level1.id)
            .resolves(true);
            
        const expectedActions = [
            { type: Actions.DELETE_CUSTOM_LEVEL_START, payload: level1.id },
            { type: Actions.DELETE_CUSTOM_LEVEL_SUCCESS, payload: [level2] }
        ];

        return store.dispatch(LevelActions.deleteById(level1.id)).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
            (OwnTrainingService.deleteById as any).restore();
        });
    });

    it('Can insert', () => {
        sinon
            .stub(OwnTrainingService, 'insert')
            .withArgs(level2)
            .resolves(true);
        
        sinon
            .stub(OwnTrainingService, 'findAll')
            .resolves([level1, level2]);

        const expectedActions = [
            { type: Actions.SAVE_CUSTOM_LEVEL_START, payload: level2 },
            { type: Actions.SAVE_CUSTOM_LEVEL_SUCCCESS, payload: [level1, level2] }
        ];

        return store.dispatch(LevelActions.insert(level2)).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
            (OwnTrainingService.insert as any).restore();
            (OwnTrainingService.findAll as any).restore();
        });
    });

    it('Cannot insert', () => {
        sinon
            .stub(OwnTrainingService, 'insert')
            .withArgs(level2)
            .resolves(false);

        const expectedActions = [
            { type: Actions.SAVE_CUSTOM_LEVEL_START, payload: level2 },
            { type: Actions.SAVE_CUSTOM_LEVEL_ERROR }
        ];

        return store.dispatch(LevelActions.insert(level2)).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
            (OwnTrainingService.insert as any).restore();
        });
    });
});