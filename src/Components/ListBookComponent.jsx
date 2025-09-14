import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import '../App.css';
import { listBooks, markAsBorrowed, markAsUnBorrowed } from '../services/BookService';
import { useNavigate } from 'react-router-dom';

// Utility to group books into chunks of 5
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const getExtension = (filename) => {
  return filename.split('.').pop();
};

const ListBookComponent = () => {
  const { role } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const navigator = useNavigate();


  useEffect(() => {
    listBooks()
      .then(response => setBooks(response.data))
      .catch(error => console.error(error));
  }, []);

  function addNewBook() {
    navigator('/add-book');
  }

  const borrowBook = (bookId) => {
    markAsBorrowed(bookId)
      .then(response => setBooks(response.data))
      .catch(error => {
        console.error(error);
      });
  }

  const returnBook = (bookId) => {
    markAsUnBorrowed(bookId)
      .then(response => setBooks(response.data))
      .catch(error => {
        console.error(error);
      });
  }

  const handleRowClick = id => {
    navigator(`/edit-book/${id}`);
  };

  return (
    <div>
      {role == "ADMIN" && <button onClick={() => addNewBook()} className="btn btn-primary me-2">
        Add book
      </button>
      }
      {chunkArray(books, 5).map((bookGroup, index) => (
        <div key={index} className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookGroup.map(book => (
            <div key={book.bookId} className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col">
              <img
                src={`http://localhost:8080/api/books/images/${book.bookId}.${getExtension(book.imageName)}`}
                alt={book.bookName}
                className="h-56 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-bold">{book.bookName}</h2>
                <p className="text-sm text-gray-600">Author: {book.author}</p>
                <p className="text-sm text-gray-500">Genre: {book.genre}</p>
                <p className="text-sm text-gray-600">Borrowed Date: {book.borrowedDate}</p>
                <p className="text-sm text-gray-500">Return Due Date: {book.returnDueDate}</p>
                <div className="mt-auto">
                  {book.borrowed ? (
                    <button onClick={() => returnBook(book.bookId)} className="btn btn-primary me-2">
                      Return
                    </button>
                  ) : (
                    <button onClick={() => borrowBook(book.bookId)} className="btn btn-primary me-2">
                      Borrow
                    </button>
                  )}
                  {role == "ADMIN" &&
                    <button onClick={() => handleRowClick(book.bookId)} className="btn btn-primary me-2">
                      Edit
                    </button>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ListBookComponent;
