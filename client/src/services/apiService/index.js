import axios from 'axios';

const options = {}

const axiosProvider = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  ...options
});

axiosProvider.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosProvider.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosProvider;

