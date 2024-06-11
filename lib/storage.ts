import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AnnounceProps } from '../types';

export async function getAllStoredData(): Promise<{ categories: Record<string, any[]> }> {
  try {
    const keys = ['@general', '@realTime', '@urgent', '@favorite', '@custom'];
    const dataPairs = await AsyncStorage.multiGet(keys);

    const categories: Record<string, any[]> = {
      general: [],
      realTime: [],
      urgent: [],
      favorite: [],
      custom: [],
    };

    dataPairs.forEach(([key, value]) => {
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        const categoryKey = key.slice(1); // Remove "@" from the key to get the category name
        categories[categoryKey].push(parsedValue);
      }
    });

    // Convert each category to an array of separate items
    for (const category in categories) {
      if (categories.hasOwnProperty(category)) {
        categories[category] = categories[category].flat(); // Flatten the array
      }
    }

    return { categories };
  } catch (error: any) {
    throw new Error('Error retrieving data: ' + error.message);
  }
}

export async function getStoredData(categoryKey: string): Promise<any[]> {
  try {
    const key = `@${categoryKey}`;
    const data = await AsyncStorage.getItem(key);

    if (data === null) {
      return []; // Return an empty array if no data found for the category
    }

    const parsedData = JSON.parse(data);
    // console.log(parsedData);

    return Array.isArray(parsedData) ? parsedData : [parsedData];
  } catch (error: any) {
    throw new Error(`Error retrieving ${categoryKey} data: ${error.message}`);
  }
}

export async function getStoredFavoriteData(): Promise<any[]> {
  try {
    const data = await AsyncStorage.getItem('@favorite');

    if (data === null) {
      return []; // Return an empty array if no data found for the category
    }

    const parsedData = JSON.parse(data);

    return Array.isArray(parsedData) ? parsedData : [parsedData];
  } catch (error: any) {
    throw new Error(`Error retrieving favorites data: ${error.message}`);
  }
}

export async function getStoredFavoriteDataById(_id: string): Promise<AnnounceProps | null> {
  try {
    const data = await AsyncStorage.getItem('@favorite');
    // console.log(data);

    if (data === null) {
      console.log('Error: No data found for favorites.');
      return null; // Return null if no data found for the category
    }

    // Parse the data as JSON
    const parsedData: AnnounceProps[] | AnnounceProps = JSON.parse(data);
    // console.log(parsedData);

    // Check if parsedData is an array or a single object
    if (Array.isArray(parsedData)) {
      // Find the announcement by _id
      const announcement = parsedData.find((item: AnnounceProps) => item._id === _id);
      return announcement || null; // Return null if no data found for the specified ID
    } else if (parsedData._id === _id) {
      return parsedData; // Return the single object if its _id matches the input _id
    } else {
      return null;
    }
  } catch (error: any) {
    throw new Error(`Error retrieving favorite data: ${error.message}`);
  }
}

export async function getStoredDataById(categoryKey: string, _id: string, customId?: string): Promise<any | null> {
  try {
    const key = `@${categoryKey}`;
    const data = await AsyncStorage.getItem(key);

    if (data === null) {
      return null; // Return null if no data found for the category
    }

    const parsedData = JSON.parse(data);
    // console.log(parsedData);

    if (!Array.isArray(parsedData)) {
      return parsedData;
    }

    let announcement;
    if (_id) {
      announcement = parsedData.find((item: any) => item._id === _id);
    } else {
      announcement = parsedData.find((item: any) => item.id === customId);
    }

    return announcement || null; // Return null if no data found for the specified ID
  } catch (error: any) {
    throw new Error(`Error retrieving ${categoryKey} data: ${error.message}`);
  }
}

export async function getStoredCustomData(): Promise<any[]> {
  try {
    const data = await AsyncStorage.getItem('@custom');

    if (data === null) {
      return []; // Return an empty array if no data found for the category
    }

    const parsedData = JSON.parse(data);

    return Array.isArray(parsedData) ? parsedData : [parsedData];
  } catch (error: any) {
    throw new Error(`Error retrieving favorites data: ${error.message}`);
  }
}

export async function storeData(params: any) {
  try {
    const jsonValue = JSON.stringify(params.data);
    await AsyncStorage.setItem(params.key, jsonValue);
    return { type: 'Success', message: 'Data stored successfully' };
  } catch (e) {
    return { type: 'Error', message: e };
  }
}

export async function storeFavoriteData(data: any) {
  try {
    // Fetch existing favorite data
    let existingData = await AsyncStorage.getItem('@favorite');
    // console.log('Existing data:');

    // console.log(existingData);

    let newData: any[] = [];
    // If there is existing data, parse it and append our data to it
    if (existingData) {
      // console.log('data exist');

      const parsedExistingData = JSON.parse(existingData);
      // console.log('First PArse');

      // console.log(parsedExistingData);

      if (Array.isArray(parsedExistingData)) {
        newData = [...parsedExistingData, data];
        // If existing data is an array, simply append our data to it
        // newData = [...parsedExistingData, data];
      } else {
        // If existing data is an object, convert it into an array and append our data
        newData = [parsedExistingData, data];
      }
    } else {
      // console.log('no data');

      // If no existing data, just use our data as an array
      newData = data;
    }
    // console.log('new data');
    // console.log(newData);

    // Stringify the new data before storing it
    // const newDataString = JSON.stringify(newData);
    // Store the new data
    await storeData({ key: '@favorite', data: newData });
    // let existingDatas = await AsyncStorage.getItem('@favorite');
    // console.log(existingDatas);
    // const parsedExistingData = JSON.parse(existingDatas!);
    // console.log(parsedExistingData);
  } catch (e) {
    return { type: 'Error', message: e };
  }
}

export async function storeCustomData(data: any) {
  try {
    // Fetch existing favorite data
    let existingData = await AsyncStorage.getItem('@custom');
    // console.log('Existing data:');

    // console.log(existingData);

    let newData: any[] = [];
    // If there is existing data, parse it and append our data to it
    if (existingData) {
      // console.log('data exist');

      const parsedExistingData = JSON.parse(existingData);
      // console.log('First PArse');

      // console.log(parsedExistingData);

      if (Array.isArray(parsedExistingData)) {
        newData = [...parsedExistingData, data];
        // If existing data is an array, simply append our data to it
        // newData = [...parsedExistingData, data];
      } else {
        // If existing data is an object, convert it into an array and append our data
        newData = [parsedExistingData, data];
      }
    } else {
      // console.log('no data');

      // If no existing data, just use our data as an array
      newData = data;
    }
    // console.log('new data');
    // console.log(newData);

    // Stringify the new data before storing it
    // const newDataString = JSON.stringify(newData);
    // Store the new data
    await storeData({ key: '@custom', data: newData });
    // let existingDatas = await AsyncStorage.getItem('@favorite');
    // console.log(existingDatas);
    // const parsedExistingData = JSON.parse(existingDatas!);
    // console.log(parsedExistingData);
  } catch (e) {
    return { type: 'Error', message: e };
  }
}

export async function storeAllData(params: any) {
  try {
    const { data } = params;
    if (!data || !data.data) {
      throw new Error('Invalid data format');
    }

    // Define type for categories object
    interface Categories {
      [category: string]: any[]; // Here you can replace `any[]` with the type of your data items
    }

    // Separate data by category
    const categories: Categories = {};
    data.data.forEach((item: any) => {
      const category = item.category;
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(item);
    });

    // Save each category data to AsyncStorage
    for (const category in categories) {
      if (categories.hasOwnProperty(category)) {
        await storeData({ key: `@${category}`, data: categories[category] });
      }
    }

    // console.log('Data stored successfully:', categories);
    return { type: 'Success', message: 'Data stored successfully' };
  } catch (error: any) {
    console.error('Error storing data:', error);
    return { type: 'Error', message: error.message };
  }
}

export async function clearAll() {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  console.log('Done.');
}

export async function removeValue() {
  try {
    await AsyncStorage.removeItem('@favorite');
  } catch (e) {
    // remove error
  }

  console.log('Done.');
}

export async function removeFavoriteData(_id: string) {
  try {
    let existingData = await AsyncStorage.getItem('@favorite');

    if (existingData) {
      const parsedExistingData: any[] = JSON.parse(existingData);
      // console.log(parsedExistingData);

      // Find the index of the item with the specified _id
      const indexToRemove = parsedExistingData.findIndex((item: any) => item._id === _id);

      if (indexToRemove !== -1) {
        // If the item exists, remove it from the array
        parsedExistingData.splice(indexToRemove, 1);

        // const newData = JSON.stringify(parsedExistingData);
        // Save the modified data back to AsyncStorage
        await storeData({ key: '@favorite', data: parsedExistingData });
      }
    }

    return { type: 'Success', message: 'Data removed successfully' };
  } catch (e) {
    return { type: 'Error', message: e };
  }
}

export async function removeCustomData(id: string) {
  try {
    let existingData = await AsyncStorage.getItem('@custom');

    if (existingData) {
      const parsedExistingData: any[] = JSON.parse(existingData);
      // console.log(parsedExistingData);

      // Find the index of the item with the specified _id
      const indexToRemove = parsedExistingData.findIndex((item: any) => item.id === id);

      if (indexToRemove !== -1) {
        // If the item exists, remove it from the array
        parsedExistingData.splice(indexToRemove, 1);

        // const newData = JSON.stringify(parsedExistingData);
        // Save the modified data back to AsyncStorage
        await storeData({ key: '@custom', data: parsedExistingData });
      }
    }

    return { type: 'Success', message: 'Data removed successfully' };
  } catch (e) {
    return { type: 'Error', message: e };
  }
}

export async function adminLogin(code: string) {
  try {
    const jsonValue = JSON.stringify({
      isAdmin: true,
      secretCode: code,
    });
    await AsyncStorage.setItem('@isAdmin', jsonValue);
    return { type: 'Success', message: 'Successful login' };
  } catch (e) {
    return { type: 'Error', message: e };
  }
}

export async function isAdmin(): Promise<any> {
  try {
    const data = await AsyncStorage.getItem('@isAdmin');

    if (data === null) {
      return { type: 'Error', message: 'Not Admin' };
    }

    const parsedData = JSON.parse(data);

    return parsedData;
  } catch (error: any) {
    throw new Error(`Error retrieving favorites data: ${error.message}`);
  }
}
