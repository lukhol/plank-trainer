import { Plank } from '../models';

export interface TrainingState {
    items: Array<Plank>,
    name: string | null
}

const initialState: TrainingState = {
    items: [],
    name: null
};

export default function(state: TrainingState = initialState, action: any) {
    switch(action.type) {
        case 'CHOOSE_TRAINING_ITEMS_ACTION': {
            return {
                ...state,
                items: action.payload.items, 
                name: action.payload.name
            }
        }
    }
    return state;
}