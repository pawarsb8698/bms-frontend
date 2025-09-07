// axios.js
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.defaults.withCredentials = true;

// Define request function
const request = (method, url, data) => {
  return axios({
    method: method,
    url: url,
    data: data,
  });
};

// Export it correctly
export default request;
