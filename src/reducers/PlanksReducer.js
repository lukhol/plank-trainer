const initialState = [
    { id: "full", name: "Full", duration: 30, },
    { id: "sideLeft", name: "Side left", duration: 110 },
    { id: "sideRight", name: "Side right", duration: 30 },
    { id: "elbow", name: "Elbow", duration: 30 },
    { id: "reverse", name: "Reverse", duration: 30 },
    { id: "raisedLeftLeg", name: "Raised left leg", duration: 30 },
    { id: "raisedRightLeg", name: "Raised right leg", duration: 30 },
    { id: "basic", name: "Basic", duration: 30 },
    { id: "raisedLeftHand", name: "Raised left hand", duration: 30 },
    { id: "raisedRightHand", name: "Raised right hand", duration: 30 },
];

export default function(state = initialState, action) {
    return state;
}