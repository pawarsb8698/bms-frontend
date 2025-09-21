import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/books";

// ✅ Paginated book listing
export const listBooks = (pageNumber, numberOfBooksPerPage) =>
  axios.get(
    `${REST_API_BASE_URL}?pageNumber=${pageNumber}&numberOfBooksPerPage=${numberOfBooksPerPage}`,
    { withCredentials: true }
  );

// ✅ Create a new book
export const createBook = (formData) =>
  axios.post(REST_API_BASE_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });

// ✅ Get a single book by id
export const getBook = (bookId) =>
  axios.get(`${REST_API_BASE_URL}/${bookId}`, { withCredentials: true });

// ✅ Update book details
export const updateBook = (bookId, formData) =>
  axios.put(`${REST_API_BASE_URL}/${bookId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });

// ✅ Delete book
export const deleteBook = (bookId) =>
  axios.delete(`${REST_API_BASE_URL}/${bookId}`, { withCredentials: true });

// ✅ Borrow a book (returns Page<BookDto>)
export const markAsBorrowed = (bookId) =>
  axios.get(`${REST_API_BASE_URL}/borrow/${bookId}`, { withCredentials: true });

// ✅ Return a book (returns Page<BookDto>)
export const markAsUnBorrowed = (bookId) =>
  axios.get(`${REST_API_BASE_URL}/return/${bookId}`, { withCredentials: true });

// (Optional - you probably don’t need this)
export const getUsers = () =>
  axios.get(REST_API_BASE_URL, {
    headers: { Authorization: "Bearer " + localStorage.getItem("auth_token") },
  });
export const getBorrowedBook = (userId) =>
  axios.get(`${REST_API_BASE_URL}/borrowedBook`, { withCredentials: true });
