import axios from "axios";

// axios.defaults.baseURL = "https://drfapilatest-abbc118e21f9.herokuapp.com/";
axios.defaults.baseURL = "http://localhost:8000/";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const customaxios = axios.create();
export const axiosReq = axios.create();
export const axiosRes = axios.create();