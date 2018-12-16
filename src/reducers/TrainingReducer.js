const initialState = {
    items: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case 'CHOOSE_TRAINING_ITEMS_ACTION': {
            return {
                ...state,
                items: action.payload
            }
        }
    }
    return state;
}