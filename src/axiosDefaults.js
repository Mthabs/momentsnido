import axios from "axios";

axios.defaults.baseURL = "https://drfapilatest-abbc118e21f9.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;