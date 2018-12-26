import { AsyncStorage } from "react-native"
import  { Plank, Training } from '../models';

const key = "Training";

export async function deleteById(id: string) {
    try {
        const allJson = await AsyncStorage.getItem(key);
        if(allJson != null) {
            let all = JSON.parse(allJson);
            all = all.filter(i => i.id !== id);
            await AsyncStorage.setItem(key, JSON.stringify(all));
        }
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function insert(training: Training) {
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

export async function findAll() {
    try {
        const allJson = await AsyncStorage.getItem(key);
        if(allJson == null) {
            return [];
        }
        console.log('allJson', JSON.parse(allJson));
        return JSON.parse(allJson);
    } catch (e) {
        console.log(e);
        return [];
    }
}

export default {
    deleteById, 
    insert,
    findAll
};