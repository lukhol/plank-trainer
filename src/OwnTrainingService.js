import { AsyncStorage } from "react-native"

const key = "Training";

export async function deleteById(id) {
    try {
        const allJson = await AsyncStorage.getItem(key);
        if(allJson != null) {
            const all = JSON.parse(allJson);
            all = all.filter(i => i.id !== id);
            await AsyncStorage.setItem(key, JSON.stringify(all));
        }
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function insert(training) {
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

        return JSON.parse(allJson);
    } catch (e) {
        console.log(e);
        return null;
    }
}

export default {
    deleteById, 
    insert,
    findAll
};