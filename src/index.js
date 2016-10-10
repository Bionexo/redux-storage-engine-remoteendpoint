import fetch from 'isomorphic-fetch';

const checkStatus = (response) => {
  const error = new Error(response.statusText);

  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  error.response = response;
  throw error;
};


export default (getUrl, setUrl, options) => ({
  load() {
    return fetch(getUrl, options)
      .then(checkStatus)
      .then(response => response.json())
      .then(json => json.store)
      .catch(error => Promise.reject(error.message));
  },

  save(store) {
    const saveOptions = {
      ...options,
      method: 'POST',
      body: JSON.stringify({ store }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    return fetch(setUrl, saveOptions).then(checkStatus);
  },
});
