const initialState = [
    { id: "full", name: "Full", duration: 30, imageName: 'full' },
    { id: "sideLeft", name: "Side left", duration: 110, imageName: 'sideLeft' },
    { id: "sideRight", name: "Side right", duration: 30, imageName: 'sideRight' },
    { id: "elbow", name: "Elbow", duration: 30, imageName: 'elbow' },
    { id: "reverse", name: "Reverse", duration: 30, imageName: 'reverse' },
    { id: "raisedLeftLeg", name: "Raised left leg", duration: 30, imageName: 'raisedLeftLeg' },
    { id: "raisedRightLeg", name: "Raised right leg", duration: 30, imageName: 'raisedRightLeg' },
    { id: "basic", name: "Basic", duration: 30, imageName: 'basic' },
    { id: "raisedLeftHand", name: "Raised left hand", duration: 30, imageName: 'raisedLeftHand' },
    { id: "raisedRightHand", name: "Raised right hand", duration: 30, imageName: 'raisedRightHand' },
];

export default function(state = initialState, action) {
    return state;
}