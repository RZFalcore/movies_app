import axios from "axios";
import queryString from "query-string";

const baseURL = "http://127.0.0.1:5000/api/v1/";

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

publicClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  };
});

publicClient.interceptors.response.use(
  (response) => {
    console.log(" publicClient response", response);
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    console.log(err);
    // throw err.response.data;
    throw err;
  }
);

export default publicClient;
