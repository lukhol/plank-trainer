const initialState = {
    choosenLevelId: 0,
    levels: [
        {
            id: 1,
            planks: [
                {
                    id: "full",
                    duration: 20
                },
                {
                    id: "elbow",
                    duration: 20
                },
                {
                    id: "full",
                    duration: 20
                },
                {
                    id: "elbow",
                    duration: 20
                }
            ]
        },
        {
            id: 2,
            planks: [
                {
                    id: "full",
                    duration: 30
                },
                {
                    id: "elbow",
                    duration: 25
                },
                {
                    id: "full",
                    duration: 30
                },
                {
                    id: "elbow",
                    duration: 25
                },
                {
                    id: "reverse",
                    duration: 40
                }
            ]
        },
        {
            id: 3,
            planks: [
                {
                    id: "full",
                    duration: 45
                },
                {
                    id: "elbow",
                    duration: 60
                },
                {
                    id: "full",
                    duration: 45
                },
                {
                    id: "elbow",
                    duration: 60
                },
                {
                    id: "reverse",
                    duration: 45
                }
            ]
        }
    ]
}

export default function(state = initialState, action) {
    switch(action.type) {
        case "CHOSSE_LEVEL_ACTION": 
            return {
                ...state,
                choosenLevelId: action.payload
            }
    }

    return state;
}