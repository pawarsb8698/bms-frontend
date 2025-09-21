import React, { useState, useEffect, useContext } from "react";
import { getBorrowedBook } from '../services/BookService';
import { AuthContext } from "../context/AuthContext";


function Dashboard() {
    const { userId } = useContext(AuthContext);
    const [book, setBook] = useState('');
    const [borrowedBook, setBorrowedBook] = useState({
        title: "The Alchemist",
        returnDate: "September 25, 2025",
    });

    useEffect(() => {
        getBorrowedBook(userId).then(response=>{
            setBook(response.data);
        });
    }, []);

    const returnBook = () => {
        alert(`Returning "${borrowedBook.title}"`);
        setBorrowedBook(null);
    };

    return (
        <div className="App">
            {book ? (
                <div className="borrowed-book">
                    <h2>Borrowed Book</h2>
                    <p><strong>Title:</strong> {book.bookName}</p>
                    <p><strong>Return Due Date:</strong> {book.author}</p>
                </div>) : (
                <p>No borrowed books currently.</p>
            )}
        </div>
    );
}

export default Dashboard;
