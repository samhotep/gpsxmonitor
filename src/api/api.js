import Storage from '../storage/storage';

const API = {
  get: async (url = '', token = '', headers = '') => {
    return Storage.getUserToken().then((result) => {
      return fetch(url + `?hash=${JSON.parse(result)}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }).then((response) => {
        return response.json().then((resultData) => {
          return resultData;
        });
      });
    });
  },
  post: async (url = '', data = {}, headers = '') => {
    /**
     * Check for a hash in user storage in order to validate request
     */
    return Storage.getUserToken().then((result) => {
      let hashedData = {...data, hash: JSON.parse(result)};
      console.log(hashedData);
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(hashedData),
      }).then((response) => {
        return response.json().then((resultData) => {
          return resultData;
        });
      });
    });
  },
  apiCall: (endpoint, data) => {
    // Make Generic API Call
    return Storage.getURL().then((url) => {
      let tempURL = JSON.parse(url);
      if (!tempURL || tempURL === '') {
        tempURL = `https://hosting.fms-ecsinternational.com/api/${endpoint}`;
      } else {
        tempURL += endpoint;
      }
      console.log(tempURL);
      return API.post(tempURL, data)
        .then((response) => {
          return response;
        })
        .catch((e) => {
          throw e;
        });
    });
  },
  authenticateUser: (email, password) => {
    return API.apiCall('user/auth/', {login: email, password: password}).then(
      (result) => {
        if (result.success === true) {
          Storage.setUserToken(result.hash);
          return true;
        } else {
          return result.status.description;
        }
      },
    );
  },
  getUserInfo: () => {
    return API.apiCall('user/get_info/').then((result) => {
      if (result.success === true) {
        Storage.setUserInfo(result);
        return true;
      } else {
        return result.status.description;
      }
    });
  },
  checkIn: () => {
    return API.apiCall('user/audit/checkin/').then((result) => {
      if (result.success === true) {
        return true;
      } else {
        return result.status.description;
      }
    });
  },
  renewSession: () => {
    return API.apiCall('user/session/renew/').then((result) => {
      if (result.success === true) {
        Storage.setUserToken(result.hash);
        return true;
      } else {
        return result.status.description;
      }
    });
  },
  getTrackers: () => {
    return API.apiCall('tracker/list/').then((result) => {
      if (result.success === true) {
        return result.list;
      } else {
        return result.status.description;
      }
    });
  },
  getTrackerLocation: (tracker_id) => {
    return API.apiCall('tracker/get_last_gps_point/', {
      tracker_id: tracker_id,
    }).then((result) => {
      if (result.success === true) {
        return result.list;
      } else {
        return result.status.description;
      }
    });
  },
  getStates: (tracker_list) => {
    return API.apiCall('tracker/get_states/', {trackers: tracker_list}).then(
      (result) => {
        if (result.success === true) {
          return result;
        } else {
          return result.status.description;
        }
      },
    );
  },
  getGroups: () => {
    return API.apiCall('tracker/group/list/').then((result) => {
      if (result.success === true) {
        return result.list;
      } else {
        return result.status.description;
      }
    });
  },
};

export default API;

// TODO Incorporate hash error on every API Call
let x = {
  success: false,
  status: {
    code: 3,
    description: 'Wrong user hash',
  },
};
