import { Plank } from '../models';

export function chooseTrainingItems(items: Plank[], name: string) {
    return {
        type: "CHOOSE_TRAINING_ITEMS_ACTION",
        payload: {
            items,
            name
        }
    }
};