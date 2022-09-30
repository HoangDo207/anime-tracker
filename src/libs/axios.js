import axios from "axios";

class APIError extends Error {
  constructor(response) {
    super();
    this.response = response;
  }
}

const $axios = axios.create({
  baseURL: process.env.VUE_APP_SERVICE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

$axios.interceptors.response.use(
  (response) => {
    if (response.data) {
      return Promise.resolve({
        data: response.data.data,
        body: response.data,
        status: response.status,
      });
    } else throw new APIError(response);
  },
  (error) => {
    if (
      error.response &&
      error.response.status &&
      [401, 403].includes(error.response.status)
    )
      return Promise.reject(error);
  }
);

$axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default $axios;
