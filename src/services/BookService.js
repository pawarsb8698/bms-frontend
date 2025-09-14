import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/books";

export const listBooks = () => {
  return axios.get(REST_API_BASE_URL, { withCredentials: true });
};

export const createBook = (formData) => {
  return axios.post(REST_API_BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};

export const getBook = (bookId) =>
  axios.get(REST_API_BASE_URL + "/" + bookId, { withCredentials: true });

export const updateBook = (bookId, formData) =>
  axios.put(REST_API_BASE_URL + "/" + bookId, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

export const deleteBook = (bookId) =>
  axios.delete(REST_API_BASE_URL + "/" + bookId, { withCredentials: true });

export const markAsBorrowed = (bookId) => 
    axios.get(REST_API_BASE_URL + "/borrow/" + bookId, { withCredentials: true });

export const markAsUnBorrowed = (bookId) => 
    axios.get(REST_API_BASE_URL + "/return/" + bookId, { withCredentials: true });

export const getUsers = () => {
  return axios.get(REST_API_BASE_URL, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("auth_token"),
    },
  });
};
