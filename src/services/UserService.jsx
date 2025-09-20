import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/users";

export const getUsers = () => {
    return axios.get(REST_API_BASE_URL, { withCredentials: true });
};

export const makeUserAdmin = (userId) => {
    return axios.get(REST_API_BASE_URL + "/makeAdmin/" + userId, { withCredentials: true });
};

export const makeUserEmployee = (userId) => {
    return axios.get(REST_API_BASE_URL + "/makeEmployee/" + userId, { withCredentials: true });
};

export const makeUserAvailable = (userId) => {
    return axios.get(REST_API_BASE_URL + "/makeUserAvailable/" + userId, { withCredentials: true });
};

export const makeUserUnavailable = (userId) => {
    return axios.get(REST_API_BASE_URL + "/makeUserUnavailable/" + userId, { withCredentials: true });
};