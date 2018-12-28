import { AsyncStorage } from 'react-native';
import { expect } from 'chai';
import sinon from 'sinon';
import * as HistoryService from '../../src/services/HistoryService';
import { HistoryItem, Plank, Training, TrainingType } from '../../src/models';

describe(' ------ HistoryService ------ ', () => {
    const historyItem1 = { datetime: new Date().toISOString(), name: 'somename', items: [] };
    const historyItem2 = { datetime: new Date().toISOString(), name: 'somename2', items: [] };

    it('Can findAllHistory if nothing exists', async () => {
        sinon.stub(AsyncStorage, 'getItem').resolves(null);
        const trainings = await HistoryService.findAllHistory();
        expect(trainings).to.deep.equal([]);
        (AsyncStorage.getItem as any).restore();
    });

    it('Can findAllHistory when something exists', async () => {
        const expected = [historyItem1, historyItem2];
        sinon.stub(AsyncStorage, 'getItem').resolves(JSON.stringify(expected));
        
        const actual = await HistoryService.findAllHistory();
        expect(actual).to.deep.equal(expected);
        (AsyncStorage.getItem as any).restore();
    });

    it('Cannot findAllHistory - error occured and return empty array', async () => {
        sinon.stub(AsyncStorage, 'getItem').rejects();
        const actual = await HistoryService.findAllHistory();
        expect(actual).to.deep.equal([]);
        (AsyncStorage.getItem as any).restore();
    });

    it('Can saveHistory when nothing exists yet', async () => {
        sinon.stub(AsyncStorage, 'getItem').resolves(null);
        const setItemStub = sinon.stub(AsyncStorage, 'setItem')
        setItemStub.resolves();
        const result = await HistoryService.saveHistory(historyItem1);
    
        expect(result).to.be.true;
        sinon.assert.calledWith(setItemStub, 'TrainingHistory', JSON.stringify([historyItem1]));

        (AsyncStorage.getItem as any).restore();
        (AsyncStorage.setItem as any).restore();
    });

    it('Can saveHistory when something alredy exists', async () => {
        sinon.stub(AsyncStorage, 'getItem').resolves(JSON.stringify([historyItem1]));
        const setItemStub = sinon.stub(AsyncStorage, 'setItem');
        setItemStub.resolves();
        const result = await HistoryService.saveHistory(historyItem2);

        expect(result).to.be.true;

        sinon.assert.calledWith(setItemStub, 'TrainingHistory', JSON.stringify([historyItem1, historyItem2]));

        (AsyncStorage.getItem as any).restore();
        (AsyncStorage.setItem as any).restore();
    });

    it('Cannot saveHistry - error occured', async () => {
        sinon.stub(AsyncStorage, 'getItem').rejects();
        const result = await HistoryService.saveHistory(historyItem1);
        expect(result).to.be.false;
        (AsyncStorage.getItem as any).restore();
    });
});