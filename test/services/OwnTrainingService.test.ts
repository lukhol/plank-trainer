import { AsyncStorage } from 'react-native';
import { expect } from 'chai';
import sinon from 'sinon';
import * as OwnTrainingService from '../../src/services/OwnTrainingService';
import { HistoryItem, Plank, Training, TrainingType } from '../../src/models';

describe(' ------ OwnTrainingService ------ ', () => {
    const training1: Training = {
        id: 'some-id-1',
        name: 'some-name-1',
        planks: [],
        type: TrainingType.CUSTOM
    };

    const training2: Training = {
        id: 'some-id-2',
        name: 'some-name-2',
        planks: [],
        type: TrainingType.DEFAULT
    };

    it('Can findAll when no training exists', async () => {
        sinon.stub(AsyncStorage, 'getItem').resolves(null);
        const result = await OwnTrainingService.findAll();
        expect(result).to.deep.equal([]);
        (AsyncStorage.getItem as any).restore();
    });

    it('Can findAll when some training already exists', async () => {
        sinon.stub(AsyncStorage, 'getItem').resolves(JSON.stringify([training1]));
        const result = await OwnTrainingService.findAll();
        expect(result).to.deep.equal([training1]);
        (AsyncStorage.getItem as any).restore();
    });

    it('Cannot findAll - error occured', async () => {
        sinon.stub(AsyncStorage, 'getItem').rejects();
        const result = await OwnTrainingService.findAll();
        expect(result).to.deep.equal([]);
        (AsyncStorage.getItem as any).restore();
    });

    it('Can insert when nothing exists yet', async () => {
        sinon.stub(AsyncStorage, 'getItem').resolves(null);
        const setItemStub = sinon.stub(AsyncStorage, 'setItem');
        setItemStub.resolves();

        const result = await OwnTrainingService.insert(training1);
        expect(result).to.be.true;
        sinon.assert.calledWith(setItemStub, 'Training', JSON.stringify([training1]));
        (AsyncStorage.getItem as any).restore();
        (AsyncStorage.setItem as any).restore();
    });

    it('Can insert when something already exists', async () => {
        sinon.stub(AsyncStorage, 'getItem').resolves(JSON.stringify([training1]));
        const setItemStub = sinon.stub(AsyncStorage, 'setItem');
        setItemStub.resolves();

        const result = await OwnTrainingService.insert(training2);
        expect(result).to.be.true;
        sinon.assert.calledWith(setItemStub, 'Training', JSON.stringify([training1, training2]));
        (AsyncStorage.getItem as any).restore();
        (AsyncStorage.setItem as any).restore();
    });

    it('Cannot insert - error occured', async () => {
        sinon.stub(AsyncStorage, 'getItem').rejects();
        const result = await OwnTrainingService.insert(training1);
        expect(result).to.be.false;
        (AsyncStorage.getItem as any).restore();
    });

    it('Can delete', async () => {
        sinon.stub(AsyncStorage, 'getItem').resolves(JSON.stringify([training1, training2]));
        const setItemStub = sinon.stub(AsyncStorage, 'setItem');
        setItemStub.resolves();

        const result = await OwnTrainingService.deleteById(training1.id);
        expect(result).to.be.true;
        sinon.assert.calledWith(setItemStub, 'Training', JSON.stringify([training2]));
        (AsyncStorage.getItem as any).restore();
        (AsyncStorage.setItem as any).restore();
    });

    it('Cannot delete if id not exists', async () => {
        sinon.stub(AsyncStorage, 'getItem').resolves(null);
        const result = await OwnTrainingService.deleteById('some-id');
        expect(result).to.be.false;
        (AsyncStorage.getItem as any).restore();
    });

    it('Cannot delete - error occured', async () => {
        sinon.stub(AsyncStorage, 'getItem').rejects();
        const result = await OwnTrainingService.deleteById('some-id');
        expect(result).to.be.false;
        (AsyncStorage.getItem as any).restore();
    });
});