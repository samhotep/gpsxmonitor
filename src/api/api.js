import Storage from '../storage/storage';

const API = {
  billingURL: 'http://centatech-001-site3.itempurl.com',
  defaultURL: 'https://hosting.fms-ecsinternational.com/api/',
  get: async (url = '', token = '', headers = '') => {
    return Storage.getUserToken().then((result) => {
      return fetch(url + `?hash=${JSON.parse(result)}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }).then((response) => {
        return response.json();
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
          Accept: 'application/json',
        },
        body: JSON.stringify(hashedData),
      }).then((response) => {
        return response.json();
      });
    });
  },
  apiCall: (endpoint, data) => {
    // Make Generic API Call
    return Storage.getURL().then((url) => {
      let tempURL = JSON.parse(url);
      if (!tempURL || tempURL === '') {
        tempURL = `${API.defaultURL}${endpoint}`;
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
        return result;
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
  getTracker: (label) => {
    return API.apiCall('tracker/list/', {labels: [label]}).then((result) => {
      if (result.success === true) {
        return result.list;
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
  getTrackerState: (tracker_id) => {
    return API.apiCall('tracker/get_state/', {tracker_id: tracker_id}).then(
      (result) => {
        if (result.success === true) {
          return result.state;
        } else {
          return result.status.description;
        }
      },
    );
  },
  getTrackerLocation: (tracker_id) => {
    return API.apiCall('tracker/get_last_gps_point/', {
      tracker_id: tracker_id,
    }).then((result) => {
      if (result.success === true) {
        return result.value;
      } else {
        return result.status.description;
      }
    });
  },
  getReadings: (tracker_id) => {
    return API.apiCall('tracker/get_readings/', {
      tracker_id: tracker_id,
    }).then((result) => {
      if (result.success === true) {
        return result;
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
  getAddress: (location) => {
    return API.apiCall('geocoder/search_location/', {
      location: location,
    }).then((result) => {
      if (result.success === true) {
        return result.value;
      } else {
        return result.status.description;
      }
    });
  },
  getRoute: (start, end) => {
    return API.apiCall('route/get/', {
      start: start,
      end: end,
    }).then((result) => {
      if (result.success === true) {
        return result.list;
      } else {
        return result.status.description;
      }
    });
  },
  getLocation: (address) => {
    return API.apiCall('geocoder/search_address/', {
      q: address,
      lang: 'en',
    }).then((result) => {
      if (result.success === true) {
        return result.locations;
      } else {
        return result.status.description;
      }
    });
  },
  getCounters: (tracker_id) => {
    return API.apiCall('tracker/get_counters/', {tracker_id: tracker_id}).then(
      (result) => {
        if (result.success === true) {
          return result.list;
        } else {
          return result.status.description;
        }
      },
    );
  },
  getInputs: (tracker_id) => {
    return API.apiCall('tracker/get_inputs/', {tracker_id: tracker_id}).then(
      (result) => {
        if (result.success === true) {
          return result;
        } else {
          return result.status.description;
        }
      },
    );
  },
  getTasks: () => {
    return API.apiCall('task/list/').then((result) => {
      if (result.success === true) {
        return result.list;
      } else {
        return result.status.description;
      }
    });
  },
  setOutput: (tracker_id, output, enable) => {
    return API.apiCall('tracker/output/set/', {
      tracker_id: tracker_id,
      output: output,
      enable: enable,
    }).then((result) => {
      if (result.success === true) {
        return result;
      } else {
        return result.status.description;
      }
    });
  },
  listModel: (model_code) => {
    return API.apiCall('tracker/list_models/', {codes: [model_code]}).then(
      (result) => {
        if (result.success === true) {
          return result.list;
        } else {
          return result.status.description;
        }
      },
    );
  },
  getUser: (id) => {
    return API.apiCall('panel/user/read/', {user_id: id}).then((result) => {
      return result;
    });
  },
  getTracks: (
    tracker_id,
    from,
    to,
    split = false,
    lbs = false,
    cluster = false,
    filter = false,
  ) => {
    return API.apiCall('track/list/', {
      tracker_id: tracker_id,
      from: from,
      to: to,
      split: split,
      include_gsm_lbs: lbs,
      cluster_single_reports: cluster,
      filter: filter,
    }).then((result) => {
      if (result.success === true) {
        return result.list;
      } else {
        return result.status.description;
      }
    });
  },
  getEvents: (tracker_id, from, to) => {
    return API.apiCall('history/tracker/list/', {
      trackers: [tracker_id],
      from: from,
      to: to,
      limit: 50,
    }).then((result) => {
      if (result.success === true) {
        return result.list;
      } else {
        return result.status.description;
      }
    });
  },
  getNotifications: () => {
    return API.apiCall('notification/list/').then((result) => {
      if (result.success === true) {
        return result.list;
      } else {
        return result.status.description;
      }
    });
  },
  // Billing API
  billget: (endpoint) => {
    return Storage.getBillingToken().then((result) => {
      return fetch(`${API.billingURL}/${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${JSON.parse(result)}`,
        },
      }).then((response) => {
        return response.json();
      });
    });
  },
  billpost: (endpoint, data) => {
    return Storage.getBillingToken().then((result) => {
      return fetch(`${API.billingURL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${JSON.parse(result)}`,
        },
        body: JSON.stringify(data),
      }).then((response) => {
        return response.json();
      });
    });
  },
  createUser: () => {
    return Storage.getUserEmail().then((result) => {
      return API.billpost('api/Users/', {
        email: JSON.parse(result),
      });
    });
  },
  authenticateBilling: () => {
    return Storage.getUserEmail().then((result) => {
      return API.billpost('api/Users/authenticate/', {
        email: JSON.parse(result),
      }).then((tokenBody) => {
        if (typeof tokenBody.token !== 'undefined') {
          Storage.setBillingToken(tokenBody.token);
          Storage.setRemainingDays(tokenBody.daysLeft);
          return tokenBody;
        } else {
          return 400;
        }
      });
    });
  },
  getServices: () => {
    return API.billget('api/Service/');
  },
  subscribe: (number, narrative, id) => {
    return API.billpost('api/Transactions/', {
      number: number,
      narative: narrative,
      serviceId: id,
    });
  },
  getTransactions: () => {
    return API.billget('api/Transactions/');
  },
  getTransactionStatus: (transactionId) => {
    return API.billget(`api/Transactions/${transactionId}/billingstatus/`);
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

// TODO Add get last GPS point to API

let y = {
  success: true,
  value: {
    lat: 53.445181,
    lng: -2.276432,
    alt: 10,
    satellites: 8,
    get_time: '2011-06-18 03:39:44',
    address: '4B Albany Road, Manchester, Great Britain',
    heading: 298,
    speed: 70,
    precision: 100,
    gsm_lbs: true,
    parking: true,
  },
};
