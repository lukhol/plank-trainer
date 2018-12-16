

export const full = require('../img/full.png');
export const sideLeft = require('../img/sideLeft.png');
export const sideRight = require('../img/sideRight.png');
export const elbow = require('../img/elbow.png');
export const reverse = require('../img/reverse.png');
export const raisedLeftLeg = require('../img/raisedLeftLeg.png');
export const raisedRightLeg = require('../img/raisedRightLeg.png');
export const basic = require('../img/reverse.png');
export const raisedLeftHand = require('../img/raisedLeftLeg.png');
export const raisedRightHand = require('../img/raisedRightLeg.png');
export const defaultImage = require('../img/full.png');

export function getById(id) {
    switch(id) {
        case 'full': return full;
        case 'sideLeft': return sideLeft;
        case 'sideRight': return sideRight;
        case 'elbow': return elbow;
        case 'reverse': return reverse;
        case 'raisedLeftLeg': return raisedLeftLeg;
        case 'raisedRightLeg': return raisedRightLeg;
        case 'basic': return basic;
        case 'raisedLeftHand': return raisedLeftHand;
        case 'raisedRightHand': return raisedRightHand;
        default: return defaultImage;
    }
}

export default images = {
    full: full,
    sideLeft: sideLeft,
    sideRight: sideRight,
    elbow: elbow,
    reverse: reverse,
    raisedLeftLeg: raisedLeftLeg,
    raisedRightLeg: raisedRightLeg,
    basic: basic,
    raisedLeftHand: raisedLeftHand,
    raisedRightHand: raisedRightHand,
    defaultImage: defaultImage,
    getById: getById
};