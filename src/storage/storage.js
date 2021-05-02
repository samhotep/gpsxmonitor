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
  getUserInfo: () => {
    return AsyncStorage.getItem('userinfo');
  },
  setUserInfo: (data) => {
    AsyncStorage.setItem('userinfo', JSON.stringify(data));
  },
  removeUserInfo: async () => {
    try {
      await AsyncStorage.removeItem('userinfo');
    } catch (e) {
      console.log(e);
    }
  },
  getLastDate: () => {
    return AsyncStorage.getItem('lastdate');
  },
  setLastDate: (data) => {
    AsyncStorage.setItem('lastdate', JSON.stringify(data));
  },
  removeLastDate: async () => {
    try {
      await AsyncStorage.removeItem('lastdate');
    } catch (e) {
      console.log(e);
    }
  },
  // Billing
  getBillingToken: () => {
    return AsyncStorage.getItem('billingtoken');
  },
  setBillingToken: (data) => {
    AsyncStorage.setItem('billingtoken', JSON.stringify(data));
  },
  removeBillingToken: async () => {
    try {
      await AsyncStorage.removeItem('billingtoken');
    } catch (e) {
      console.log(e);
    }
  },
  getUserEmail: () => {
    return AsyncStorage.getItem('useremail');
  },
  setUserEmail: (data) => {
    AsyncStorage.setItem('useremail', JSON.stringify(data));
  },
  removeUserEmail: async () => {
    try {
      await AsyncStorage.removeItem('useremail');
    } catch (e) {
      console.log(e);
    }
  },
  getRemainingDays: () => {
    return AsyncStorage.getItem('days');
  },
  setRemainingDays: (data) => {
    AsyncStorage.setItem('days', JSON.stringify(data));
  },
  removeRemainingDays: async () => {
    try {
      await AsyncStorage.removeItem('days');
    } catch (e) {
      console.log(e);
    }
  },
};

export default Storage;
