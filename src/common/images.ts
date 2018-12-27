const imageDirName = 'img2';

export const full = require(`../../${imageDirName}/full.png`);
export const sideLeft = require(`../../${imageDirName}/sideLeft.png`);
export const sideRight = require(`../../${imageDirName}/sideRight.png`);
export const elbow = require(`../../${imageDirName}/elbow.png`);
export const reverse = require(`../../${imageDirName}/reverse.png`);
export const raisedLeftLeg = require(`../../${imageDirName}/raisedLeftLeg.png`);
export const raisedRightLeg = require(`../../${imageDirName}/raisedRightLeg.png`);
export const basic = require(`../../${imageDirName}/reverse.png`);
export const raisedLeftHand = require(`../../${imageDirName}/raisedLeftLeg.png`);
export const raisedRightHand = require(`../../${imageDirName}/raisedRightLeg.png`);
export const defaultImage = require(`../../${imageDirName}/basic.png`);

export function getById(id: string) {
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

export default {
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