import axios from "axios";

axios.defaults.baseURL = "https://chatcomdrfapi-40ddf4304b07.herokuapp.com/";
axios.defaults.mode = "no-cors"
axios.defaults.withCredentials = false
axios.defaults.credentials ="include" 

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;


export const customaxios = axios.create();
customaxios.interceptors.request.use(
    (config) => {
      // Retrieve the auth token from session storage
      const authToken = sessionStorage.getItem("authtoken");
      // If the auth token exists, add it to the request headers
      if (authToken) {
        config.headers.Authorization = `Token ${authToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
  });

export const axiosReq = axios.create();
export const axiosRes = axios.create();