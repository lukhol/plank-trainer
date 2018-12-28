import { AsyncStorage } from "react-native"
import  {  Training } from '../models';

const key = "Training";

export const deleteById = async (id: string): Promise<boolean> => {
    try {
        const allJson = await AsyncStorage.getItem(key);
        if(allJson != null) {
            let all = JSON.parse(allJson);
            all = all.filter((i: any) => i.id !== id);
            await AsyncStorage.setItem(key, JSON.stringify(all));
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
}

export const insert = async (training: Training): Promise<boolean> => {
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
}

export const findAll = async (): Promise<Training[]> => {
    try {
        const allJson = await AsyncStorage.getItem(key);
        if(allJson == null) {
            return [];
        }
        return JSON.parse(allJson);
    } catch (e) {
        return [];
    }
}

export default {
    deleteById, 
    insert,
    findAll
};