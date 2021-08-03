import AsyncStorage from '@react-native-async-storage/async-storage';




const set_storage = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
    }
  }

  export default set_storage;