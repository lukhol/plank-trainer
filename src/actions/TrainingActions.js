export function chooseTrainingItems(items, name) {
    return {
        type: "CHOOSE_TRAINING_ITEMS_ACTION",
        payload: {
            items,
            name
        }
    }
};