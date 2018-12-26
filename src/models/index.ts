export enum TrainingType {
    CUSTOM, DEFAULT
}

export interface Plank {
    id: string,
    name: string,
    imageName: string,
    duration: number
};

export interface Training {
    id: string,
    name: string,
    planks: Array<Plank>
    type: TrainingType,
}

export interface Settings {
    loaded: boolean,
    defaultWaitTime: number,
    gender: string,
    sound: boolean,
    readyDuration: number
}

export interface HistoryItem {
    datetime: string,
    name: string,
    items: Array<Plank>
}