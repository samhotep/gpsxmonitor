/* CRUD for authentication tokens */

import AsyncStorage from '@react-native-community/async-storage';

const Storage = {
  getUserToken: () => {
    return AsyncStorage.getItem('hash');
  },
  setUserToken: (data) => {
    AsyncStorage.setItem('hash', JSON.stringify(data));
  },
  removeUserToken: async () => {
    try {
      await AsyncStorage.removeItem('hash');
    } catch (e) {
      console.log(e);
    }
  },
  getURL: () => {
    return AsyncStorage.getItem('url');
  },
  setURL: (data) => {
    AsyncStorage.setItem('url', JSON.stringify(data));
  },
  removeURL: async () => {
    try {
      await AsyncStorage.removeItem('url');
    } catch (e) {
      console.log(e);
    }
  },
};

export default Storage;
