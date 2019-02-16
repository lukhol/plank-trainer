import { Plank } from '../models';
import * as Actions from '../../src/actions/names';

export function chooseTrainingItems(items: Plank[], name: string) {
    return {
        type: Actions.CHOOSE_TRAINING_ITEMS_ACTION,
        payload: {
            items,
            name
        }
    }
}