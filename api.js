const BASE_URL = 'https://api.github.com/users';

const listApiFetch = function (...args) {
  let error;
  console.log(...args);
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        error = { code: res.status };
        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

const getRepos = function (handle) {
  console.log('api triggered');
  return listApiFetch(`${BASE_URL}/${handle}/repos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    parameters: {
      'type': 'all',
      'sort': 'created',
      'direction': 'desc'
    }
  });
};

export default {
  getRepos
};