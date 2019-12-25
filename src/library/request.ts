import axios, { AxiosError, AxiosResponse, Canceler, Method } from 'axios';
import { getToken, removeToken } from './auth';

interface RequestConfig {
  url: string;
  method: Method;
  data?: object;
  params?: object;
  cancelPrevious?: boolean;
}

const service = axios.create({
  baseURL: 'http://replay.develop.com/api/',
  timeout: 600000,
});

function isAuthError(error: AxiosError) {
  const { response } = error;
  return response && response.status === 401 && response.data.error_type === 'INVALID_TOKEN';
}

service.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${getToken()}`,
  },
}));

// Response Interceptor
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    if (data.status === false) {
      return Promise.reject(new Error(data.message || 'There was an error.'));
    }

    return data;
  },
  (error: AxiosError) => {
    if (!error) {
      return Promise.reject(new Error('There was an error.'));
    }
    if (isAuthError(error)) {
      removeToken();
      window.location.reload();
      return Promise.reject(new Error('Session expired!'));
    }
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const { response } = error;
    return Promise.reject(response?.data || error);
  },
);

const cancelable: {[key: string]: Canceler} = {};

export default function ({ cancelPrevious, ...config }: RequestConfig) {
  if (cancelPrevious) {
    const key = `${config.method}-${config.url}`;
    const cancel = cancelable[key];
    if (cancel) cancel('request-cancel');
    return service({
      ...config,
      cancelToken: new axios.CancelToken((cancelRequest: Canceler) => {
        cancelable[key] = cancelRequest;
      }),
    });
  }
  return service(config);
}
