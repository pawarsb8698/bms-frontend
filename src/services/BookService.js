import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/books';

export const listBooks = () => {
    return axios.get(REST_API_BASE_URL);
}

export const createBook = (formData) => {
    return axios.post(REST_API_BASE_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const getBook = (bookId) => axios.get(REST_API_BASE_URL + '/' + bookId);

export const updateBook = (bookId, formData) => axios.put(REST_API_BASE_URL + '/' + bookId, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export const deleteBook = (bookId) => axios.delete(REST_API_BASE_URL + '/' + bookId);