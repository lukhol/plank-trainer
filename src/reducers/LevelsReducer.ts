import { LevelType } from '../common/constants';
import * as Actions from '../actions/names';
import { Training, TrainingType } from '../models';

export interface LevelState {
    choosenLevelId: string,
    isFethingCustom: boolean,
    customLevels: Array<Training>,
    levels: Array<Training>
}

const initialState: LevelState = {
    choosenLevelId: '0',
    isFethingCustom: false,
    customLevels: [],
    levels: [
        {
            id: "1",
            name: "Level 1",
            type: TrainingType.DEFAULT,
            planks: [
                {
                    id: "full",
                    duration: 20,
                    imageName: 'full',
                    name: 'full'
                },
                {
                    id: "elbow",
                    duration: 20,
                    imageName: 'elbow',
                    name: 'elbow'
                },
                {
                    id: "full",
                    duration: 20,
                    imageName: 'full',
                    name: 'full'
                },
                {
                    id: "elbow",
                    duration: 20,
                    imageName: 'elbow',
                    name: 'elbow'
                }
            ]
        },
        {
            id: "2",
            name: "Level 2",
            type: TrainingType.DEFAULT,
            planks: [
                {
                    id: "full",
                    duration: 30,
                    imageName: 'full',
                    name: 'full'
                },
                {
                    id: "elbow",
                    duration: 25,
                    imageName: 'elbow',
                    name: 'elbow'
                },
                {
                    id: "full",
                    duration: 30,
                    imageName: 'full',
                    name: 'full'
                },
                {
                    id: "elbow",
                    duration: 25,
                    imageName: 'elbow',
                    name: 'elbow'
                },
                {
                    id: "reverse",
                    duration: 40,
                    imageName: 'reverse',
                    name: 'reverse'
                }
            ]
        },
        {
            id: "3",
            name: "Level3",
            type: TrainingType.DEFAULT,
            planks: [
                {
                    id: "full",
                    duration: 45,
                    imageName: 'full',
                    name: 'full'
                },
                {
                    id: "elbow",
                    duration: 60,
                    imageName: 'elbow',
                    name: 'elbow'
                },
                {
                    id: "full",
                    duration: 45,
                    imageName: 'full',
                    name: 'full'
                },
                {
                    id: "elbow",
                    duration: 60,
                    imageName: 'elbow',
                    name: 'elbow'
                },
                {   
                    id: "reverse",
                    duration: 45,
                    imageName: 'reverse',
                    name: 'reverse'
                }
            ]
        }
    ]
};

export default function(state: LevelState = initialState, action: any) {
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