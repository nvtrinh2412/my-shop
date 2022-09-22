import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

axiosConfig.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosConfig.interceptors.response.use(
  (response: AxiosResponse) => {
    response.headers['Access-Control-Allow-Origin'] = '*';
    response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    return response.data;
  },
  (error) => {
    return error.response.data;
  }
);

export default axiosConfig;
