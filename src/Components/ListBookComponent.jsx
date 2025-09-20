import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  listBooks,
  markAsBorrowed,
  markAsUnBorrowed,
} from "../services/BookService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const getExtension = (filename) => filename.split(".").pop();

const ListBookComponent = () => {
  const [books, setBooks] = useState([]);
  const [role, setRole] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // backend uses 0-based
  const [totalPages, setTotalPages] = useState(0);
  const booksPerPage = 8;

  const navigator = useNavigate();

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const fetchBooks = (page) => {
    listBooks(page, booksPerPage)
      .then((response) => {
        const decoded = jwtDecode(localStorage.getItem('auth_token'));
        setRole(decoded?.userType);
        setBooks(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.error(error));
  };

  const addNewBook = () => navigator("/add-book");

  const borrowBook = (bookId) => {
    markAsBorrowed(bookId)
      .then(() => fetchBooks(currentPage)) // refresh current page
      .catch((error) => console.error(error));
  };

  const returnBook = (bookId) => {
    markAsUnBorrowed(bookId)
      .then(() => fetchBooks(currentPage))
      .catch((error) => console.error(error));
  };

  const handleEdit = (id) => {
    navigator(`/edit-book/${id}`);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Helper to generate a small window of pages
  const getPageNumbers = () => {
    const totalNumbersToShow = 5;
    const pages = [];

    let start = Math.max(0, currentPage - 2);
    let end = Math.min(totalPages - 1, currentPage + 2);

    if (end - start + 1 < totalNumbersToShow) {
      if (start === 0) {
        end = Math.min(totalPages - 1, start + totalNumbersToShow - 1);
      } else if (end === totalPages - 1) {
        start = Math.max(0, end - totalNumbersToShow + 1);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="container mt-4">
      {role === "ADMIN" && (
        <div className="mb-4">
          <button className="btn btn-primary" onClick={addNewBook}>
            + Add Book
          </button>
        </div>
      )}

      <div className="row g-4">
        {books && books.length > 0 ? (
          books.map((book) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={book.bookId}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`http://localhost:8080/api/books/images/${
                    book.bookId
                  }.${getExtension(book.imageName)}`}
                  className="card-img-top"
                  alt={book.bookName}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.bookName}</h5>
                  <p className="card-text mb-1">
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p className="card-text mb-2">
                    <strong>Genre:</strong> {book.genre}
                  </p>

                  {book.borrowed ? (
                    <div className="mb-3">
                      <p className="card-text mb-1">
                        <strong>Borrowed Date:</strong> {book.borrowedDate}
                      </p>
                      <p className="card-text">
                        <strong>Return Due Date:</strong> {book.returnDueDate}
                      </p>
                    </div>
                  ) : (
                    <div className="mb-3">
                      <span className="badge bg-success">Available</span>
                    </div>
                  )}

                  <div className="mt-auto">
                    {book.borrowed ? (
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => returnBook(book.bookId)}
                      >
                        Return
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => borrowBook(book.bookId)}
                      >
                        Borrow
                      </button>
                    )}
                    {role === "ADMIN" && (
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleEdit(book.bookId)}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            {/* Prev button */}
            <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 0}
              >
                Prev
              </button>
            </li>

            {/* First page + dots */}
            {currentPage > 2 && (
              <>
                <li className="page-item">
                  <button className="page-link" onClick={() => paginate(0)}>
                    1
                  </button>
                </li>
                {currentPage > 3 && (
                  <li className="page-item disabled">
                    <span className="page-link">...</span>
                  </li>
                )}
              </>
            )}

            {/* Windowed pages */}
            {getPageNumbers().map((i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => paginate(i)}>
                  {i + 1}
                </button>
              </li>
            ))}

            {/* Last page + dots */}
            {currentPage < totalPages - 3 && (
              <>
                {currentPage < totalPages - 4 && (
                  <li className="page-item disabled">
                    <span className="page-link">...</span>
                  </li>
                )}
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => paginate(totalPages - 1)}
                  >
                    {totalPages}
                  </button>
                </li>
              </>
            )}

            {/* Next button */}
            <li
              className={`page-item ${
                currentPage === totalPages - 1 ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ListBookComponent;
