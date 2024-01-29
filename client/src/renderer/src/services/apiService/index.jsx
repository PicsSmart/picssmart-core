import axios from 'axios';
const options = {};

const axiosProvider = axios.create({
  baseURL: 'http://localhost:3000/',
  ...options
});

const pendingRequests = {};

const cancelPreviousRequests = (url, abort = false) => {
  if (url && pendingRequests[url]) {
    if (abort) {
      console.log(`Aborting request: ${url}`);
      pendingRequests[url].abort();
    }
    delete pendingRequests[url];
  }
};

axiosProvider.interceptors.request.use(
  (config) => {
    console.log(pendingRequests);
    if (config?.pendingRequests && config?.url && !config.signal) {
      cancelPreviousRequests(config.url, true);
      const abortController = new AbortController();
      config.signal = abortController.signal;
      pendingRequests[config.url] = abortController;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosProvider.interceptors.response.use(
  (response) => {
    cancelPreviousRequests(response.request.url);
    return response;
  },
  (error) => {
    cancelPreviousRequests(error.config?.url);
    return Promise.reject(error);
  }
);

export default axiosProvider;
