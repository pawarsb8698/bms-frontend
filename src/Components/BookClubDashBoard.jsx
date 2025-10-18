import React, { useState, useEffect, useContext } from "react";
import { getBorrowedBook, withdrawBook, returnBook } from '../services/BookService';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { userId } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getBorrowedBook(userId).then(response => {
        setBook(response.data);
      });
    }
  }, [userId]);

  const getExtension = (filename) => filename.split(".").pop();

  const goToBooks = () => navigate('/books');
  const goToApprovals = () => navigate('/awaiting-approval');

  const handleReturnBook = (bookId) => {
    if (!window.confirm("Are you sure you want to return this book?")) return;
    debugger;
    returnBook(bookId).then((response) => {
      setBook(response.data);
    });
  };

  const handleWithdrawApproval = () => {
    if (!window.confirm("Are you sure you want to withdraw your book request?")) return;
    withdrawBook().then(() => {
      setBook(null);
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">📚 Book Club Dashboard</h1>

      <div className="d-flex justify-content-center gap-3 mb-4">
        <button className="btn btn-outline-primary" onClick={goToBooks}>View All Books</button>
        <button className="btn btn-outline-secondary" onClick={goToApprovals}>Go to Approvals</button>
      </div>

      {book ? (
        <div className="card mb-4 mx-auto shadow" style={{ maxWidth: '600px' }}>
          <img
            src={`http://localhost:8080/api/books/images/${book.bookId}.${getExtension(book.imageName)}`}
            className="card-img-top"
            alt={book.bookName}
            style={{ height: "300px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h3 className="card-title">{book.bookName}</h3>
            <p className="card-text"><strong>Author:</strong> {book.author}</p>
            <p className="card-text"><strong>Genre:</strong> {book.genre}</p>
            <p className="card-text"><strong>Status:</strong>
              <span className={`badge ms-2 ${book.bookStatus === 'BORROW_PENDING' ? 'bg-warning' : 'bg-success'}`}>
                {book.bookStatus.replace('_', ' ')}
              </span>
            </p>

            {book.bookStatus !== 'BORROW_PENDING' ? (
              <button className="btn btn-danger mt-3" onClick={() => handleReturnBook(book.bookId)}>
                Return Book
              </button>) : (
              <div className="mt-3">
                <button className="btn btn-danger" onClick={handleWithdrawApproval}>Withdraw Approval</button>
                <p className="text-muted mt-2">⏳ Your book approval is pending...</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">
          <p className="lead">You have not borrowed any books yet.</p>
          <p>Click on <strong>"View All Books"</strong> to start exploring!</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
