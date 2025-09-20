import React, { useState, useEffect } from "react";
import { getBorrowedBook } from '../services/BookService';

function Dashboard() {
    const { userId } = useContext(AuthContext);
  const [borrowedBook, setBorrowedBook] = useState({
    title: "The Alchemist",
    returnDate: "September 25, 2025",
  });

  useEffect(()=>{
    getBorrowedBook(userId);
  });

  const returnBook = () => {
    alert(`Returning "${borrowedBook.title}"`);
    setBorrowedBook(null);
  };

  return (
    <div className="App">
      {borrowedBook ? (
    <div className="borrowed-book">
      <h2>Borrowed Book</h2>
      <p><strong>Title:</strong> {book.title}</p>
      <p><strong>Return Due Date:</strong> {book.returnDate}</p>
      <button onClick={onReturn}>Return Book</button>
    </div>      ) : (
        <p>No borrowed books currently.</p>
      )}
    </div>
  );
}

export default Dashboard;
