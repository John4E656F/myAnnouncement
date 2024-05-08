import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getAllData() {
  try {
    const allData = await AsyncStorage.multiGet(['@general', '@realTime', '@urgent', '@favorites', '@custom']);
    return allData != null ? allData : null;
  } catch (e) {
    return { type: 'Error', message: e };
  }
}

export async function storeData(params: any) {
  try {
    const jsonValue = JSON.stringify(params.data);
    await AsyncStorage.setItem(params.key, jsonValue);
  } catch (e) {
    return { type: 'Error', message: e };
  }
}

export async function storeAllData(params: any) {
  try {
    console.log(params);
  } catch (e) {
    return { type: 'Error', message: e };
  }
}
