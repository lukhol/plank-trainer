import { AsyncStorage } from "react-native"
import { HistoryItem } from '../models';

const key = "TrainingHistory";

export async function getAllTrainings() {
    try {
        const allJson= await AsyncStorage.getItem(key);
        if(allJson !=  null) {
            const all = JSON.parse(allJson);
            return all;
        }

        return [];
    } catch (e) {
        console.log(e);
    }
}

export async function saveTraining(training: HistoryItem) {
    try {
        let allJson = await AsyncStorage.getItem(key);
        if(allJson == null) {
            allJson = '[]';
        }
        const all = JSON.parse(allJson);
        all.push(training);
        await AsyncStorage.setItem(key, JSON.stringify(all));
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}