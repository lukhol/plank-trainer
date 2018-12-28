import { expect } from 'chai';

import * as TrainingActions from '../../src/actions/TrainingActions';
import * as Actions from '../../src/actions/names';

describe(' ------ HISTORY ACTIONS ------', () => {

    it('Can choose training items', () => {
        const plank =  {  id: 'someid', name: 'plankname', imageName: 'image', duration: 15};
        const action = TrainingActions.chooseTrainingItems([plank], 'somename');
        expect(action.type).to.equal(Actions.CHOOSE_TRAINING_ITEMS_ACTION);
        expect(action.payload.name).to.equal('somename');
        expect(action.payload.items).to.deep.equal([plank]);
    });
});