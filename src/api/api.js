import Storage from '../storage/storage';

const API = {
  get: async (url = '', token = '', headers = '') => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    return await response.json();
  },
  post: async (url = '', data = {}, headers = '') => {
    console.log(data);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },
  apiCall: (endpoint, data) => {
    // Make Generic API Call
    return Storage.getURL().then((url) => {
      console.log(url + endpoint);
      return API.post(url + endpoint, data)
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
        console.log(result);
        if (result.success === true) {
          Storage.setUserToken(result.hash);
          return true;
        } else {
          return result.status.description;
        }
      },
    );
  },
};

export default API;

const x = {
  errors: [
    {error: 'length must be between 1 and 50', parameter: 'password'},
    {error: 'length must be between 1 and 90', parameter: 'login'},
    {error: 'must not be empty', parameter: 'password'},
    {error: 'must not be empty', parameter: 'login'},
  ],
  status: {code: 7, description: 'Invalid parameters'},
  success: false,
};
