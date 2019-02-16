import { AsyncStorage } from "react-native"
import { HistoryItem } from '../models';

const key = "TrainingHistory";

export const findAllHistory = async (): Promise<HistoryItem[]> => {
    try {
        const allJson = await AsyncStorage.getItem(key);
        if(allJson !=  null) {
            return JSON.parse(allJson);
        }

        return [];
    } catch (e) {
        return [];
    }
};

export const saveHistory = async (training: HistoryItem): Promise<boolean> => {
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
        return false;
    }
};

export default {
    findAllHistory,
    saveHistory
};