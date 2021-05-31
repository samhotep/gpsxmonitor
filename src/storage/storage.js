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
  getLoginImageURL: () => {
    return AsyncStorage.getItem('loginimageurl');
  },
  setLoginImageURL: (data) => {
    AsyncStorage.setItem('loginimageurl', JSON.stringify(data));
  },
  removeLoginImageURL: async () => {
    try {
      await AsyncStorage.removeItem('loginimageurl');
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
  getCurrentTracker: () => {
    return AsyncStorage.getItem('tracker');
  },
  setCurrentTracker: (data) => {
    AsyncStorage.setItem('tracker', JSON.stringify(data));
  },
  removeCurrentTracker: async () => {
    try {
      await AsyncStorage.removeItem('tracker');
    } catch (e) {
      console.log(e);
    }
  },
  getAllTrackers: () => {
    return AsyncStorage.getItem('trackerset');
  },
  setAllTrackers: (data) => {
    AsyncStorage.setItem('trackerset', JSON.stringify(data));
  },
  removeAllTrackers: async () => {
    try {
      await AsyncStorage.removeItem('trackerset');
    } catch (e) {
      console.log(e);
    }
  },
  getAllTasks: () => {
    return AsyncStorage.getItem('taskset');
  },
  setAllTasks: (data) => {
    AsyncStorage.setItem('taskset', JSON.stringify(data));
  },
  removeAllTasks: async () => {
    try {
      await AsyncStorage.removeItem('taskset');
    } catch (e) {
      console.log(e);
    }
  },
  getMarkerSettings: () => {
    return AsyncStorage.getItem('markersettings');
  },
  setMarkerSettings: (data) => {
    AsyncStorage.setItem('markersettings', JSON.stringify(data));
  },
  removeMarkerSettings: async () => {
    try {
      return await AsyncStorage.removeItem('markersettings');
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
  getAllEmployees: () => {
    return AsyncStorage.getItem('employees');
  },
  setAllEmployees: (data) => {
    AsyncStorage.setItem('employees', JSON.stringify(data));
  },
  removeAllEmployees: async () => {
    try {
      await AsyncStorage.removeItem('employees');
    } catch (e) {
      console.log(e);
    }
  },
  getTrackerMessages: () => {
    return AsyncStorage.getItem('messages');
  },
  setTrackerMessages: (data) => {
    AsyncStorage.setItem('messages', JSON.stringify(data));
  },
  removeTrackerMessages: async () => {
    try {
      await AsyncStorage.removeItem('messages');
    } catch (e) {
      console.log(e);
    }
  },
  getSettings: () => {
    return AsyncStorage.getItem('generalsettings');
  },
  setSettings: (data) => {
    AsyncStorage.setItem('generalsettings', JSON.stringify(data));
  },
  removeSettings: async () => {
    try {
      await AsyncStorage.removeItem('generalsettings');
    } catch (e) {
      console.log(e);
    }
  },
};

export default Storage;
