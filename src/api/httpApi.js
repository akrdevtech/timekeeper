/**
 * HTTP API interface
 * @module
 * @author Akhil Krishnan R
 */
import axios from 'axios';
const baseURL = "http://127.0.0.1:5000/api"
// import config from '../config';
// import UserData from '../common/permission/UserData';
// import userService from './userServices';

// const {
//   api: { baseURL },
// } = config;

// const authHeader = () => {
//   const authToken = UserData.getToken();
//   if (authToken) {
//     return {
//       Authorization: `Bearer ${authToken}`,
//       'Content-Type': 'application/json',
//     };
//   }
//   return {};
// };

const handleHttpError = (httpError) => {
  if (httpError.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { status } = httpError.response;
    if (status === 401) {
      // userService.logout();
      console.log('401');
    } else if (status === 403) {
      // userService.goBack();
      console.log('400');
    } else if (status === 500) {
      console.log('INTERNAL_SERVER_ERROR');
    }
    return httpError.response;
  }
  if (httpError.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(httpError.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', httpError.message);
  }
};

const instance = axios.create({
  baseURL,
});

// Request interceptor
instance.interceptors.request.use(
  (reqConfig) => {
    const { headers } = { reqConfig };
    const newConfig = { ...reqConfig };
    const authHeaders = {};// authHeader();
    newConfig.headers = { ...headers, ...authHeaders };
    return newConfig;
  },
  (error) => {
    const { response } = error;
    return response;
    // Promise.reject(error);
  },
);

//  Response interceptor
instance.interceptors.response.use(null, (error) => {
  handleHttpError(error);
  const { response } = error;
  return response;
  // Promise.reject(error);
});

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  patch: instance.patch,
  delete: instance.delete,
};
