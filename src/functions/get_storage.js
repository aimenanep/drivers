import AsyncStorage from '@react-native-async-storage/async-storage';

const get_storage = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      return null
    }
  }
  export default get_storage;