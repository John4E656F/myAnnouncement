import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getAllStoredData(): Promise<{ categories: Record<string, any[]> }> {
  try {
    const keys = ['@general', '@realTime', '@urgent', '@favorites', '@custom'];
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
    return Array.isArray(parsedData) ? parsedData : [parsedData];
  } catch (error: any) {
    throw new Error(`Error retrieving ${categoryKey} data: ${error.message}`);
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

    console.log('Data stored successfully:', categories);
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
