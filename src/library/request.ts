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
  baseURL: process.env.API_URL, // @todo use the api from env
  timeout: 60000,
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

function getResErrorMessage({ data }: AxiosResponse) {
  if (data.errors) return data.errors;
  if (data.message) return data.message;
  return null;
}

// Response Interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.status === false) {
      return Promise.reject(res.message || 'error');
    }
    return res;
  },
  (thrown) => {
    if (!thrown) {
      const errorMessage = 'There was an error';
      return Promise.reject(errorMessage);
    }
    if (isAuthError(thrown)) {
      removeToken();
      window.location.reload();
      const err = 'Session expired!';
      return Promise.reject(err);
    }
    if (axios.isCancel(thrown)) return Promise.reject(thrown.message);
    const { message, response } = thrown;
    const errorMessage = getResErrorMessage(response) || message;
    return Promise.reject(errorMessage);
  },
);

const cancelable: { [key: string]: Canceler } = {};

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
