import { LevelType } from '../common/constants';
import * as Actions from '../actions/names';

const initialState = {
    choosenLevelId: 0,
    isFethingCustom: false,
    customLevels: [],
    levels: [
        {
            id: "1",
            name: "Level 1",
            type: LevelType.DEFAULT,
            planks: [
                {
                    id: "full",
                    duration: 20,
                    imageName: 'full'
                },
                {
                    id: "elbow",
                    duration: 20,
                    imageName: 'elbow'
                },
                {
                    id: "full",
                    duration: 20,
                    imageName: 'full'
                },
                {
                    id: "elbow",
                    duration: 20,
                    imageName: 'elbow'
                }
            ]
        },
        {
            id: "2",
            name: "Level 2",
            type: LevelType.DEFAULT,
            planks: [
                {
                    id: "full",
                    duration: 30,
                    imageName: 'full'
                },
                {
                    id: "elbow",
                    duration: 25,
                    imageName: 'elbow'
                },
                {
                    id: "full",
                    duration: 30,
                    imageName: 'full'
                },
                {
                    id: "elbow",
                    duration: 25,
                    imageName: 'elbow'
                },
                {
                    id: "reverse",
                    duration: 40,
                    imageName: 'reverse'
                }
            ]
        },
        {
            id: "3",
            name: "Level3",
            type: LevelType.DEFAULT,
            planks: [
                {
                    id: "full",
                    duration: 45,
                    imageName: 'full'
                },
                {
                    id: "elbow",
                    duration: 60,
                    imageName: 'elbow'
                },
                {
                    id: "full",
                    duration: 45,
                    imageName: 'full'
                },
                {
                    id: "elbow",
                    duration: 60,
                    imageName: 'elbow'
                },
                {   
                    id: "reverse",
                    duration: 45,
                    imageName: 'reverse'
                }
            ]
        }
    ]
}

export default function(state = initialState, action) {
    switch(action.type) {
        case Actions.CHOSSE_LEVEL_ACTION: 
            return {
                ...state,
                choosenLevelId: action.payload
            };
        case Actions.FETCH_CUSTOM_LEVELS_START: 
            return {
                ...state,
                isFethingCustom: true
            };
        case Actions.FETCH_CUSTOM_LEVELS_SUCCESS:
            return {
                ...state,
                isFethingCustom: false,
                customLevels: action.payload
            };
        case Actions.DELETE_CUSTOM_LEVEL_START:
            return {
                ...state,
                isFethingCustom: true
            }
        case Actions.DELETE_CUSTOM_LEVEL_SUCCESS: 
            return {
                ...state, 
                isFethingCustom: false,
                customLevels: action.payload
            }
        case Actions.SAVE_CUSTOM_LEVEL_START: 
            return {
                ...state,
                isFethingCustom: true
            }
        case Actions.SAVE_CUSTOM_LEVEL_SUCCCESS:
            return {
                ...state,
                isFethingCustom: false,
                customLevels: action.payload
            }
    }

    return state;
}