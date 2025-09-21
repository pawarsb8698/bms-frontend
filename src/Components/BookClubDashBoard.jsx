import React, { useState, useEffect, useContext } from "react";
import { getBorrowedBook, withdrawBook, returnBook } from '../services/BookService';
import { AuthContext } from "../context/AuthContext";


function Dashboard() {
  const { userId } = useContext(AuthContext);
  const [book, setBook] = useState('');

  useEffect(() => {
    getBorrowedBook(userId).then(response => {
      setBook(response.data);
    });
  }, []);

  const getExtension = (filename) => filename.split(".").pop();

  const returnBook = () => {
    alert("Returning Book.");
    returnBook.then((response) => {
      setBook(response.data);
    });
  };

  const withdrawApproval = () => {
    alert("Withdrawing Book.");
    withdrawBook().then((response) => {
      setBook(null);
    });
  };

  return (
    <div className="App">
      {book ? (
        <div className="borrowed-book">
          <h2>Borrowed Book</h2>
          <p><strong>Title:</strong> {book.bookName}</p>
          <p><strong>Return Due Date:</strong> {book.author}</p>
          <div className="col-sm-6 col-md-4 col-lg-3" key={book.bookId}>
            <div className="card h-100 shadow-sm">
              <img
                src={`http://localhost:8080/api/books/images/${book.bookId
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
              </div>
              {
                book.bookStatus != 'PENDING_APPROVAL' ? (
                  <div>
                    <button type="button" className="btn btn-danger" onClick={returnBook}>Return Book</button>
                  </div>
                ) : (
                  <div>
                    <button type="button" className="btn btn-danger" onClick={withdrawApproval}>Withdraw Approval</button>
                    <p>Your book approval is pending.</p>
                  </div>
                )
              }
            </div>
          </div>

        </div>) : (
        <p>No borrowed books currently.</p>
      )}
    </div>
  );
}

export default Dashboard;
