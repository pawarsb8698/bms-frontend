import React, { useEffect, useState } from 'react'
import '../App.css';
import { listBooks } from '../services/BookService'
import { useNavigate } from 'react-router-dom';

const ListBookComponent = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    listBooks().then((response) => {
      setBooks(response.data);
    }).catch(error => {
      console.error(error);
    })
  }, []);

  const navigator = useNavigate();

  function addNewBook() {
    navigator('/add-book');
  }

  const handleRowClick = (id) => {
    navigator(`/edit-book/${id}`);
  };

  return (
    <div className='container'>
      <h2 className='text-center'>List of Book</h2>
      <button className='btn btn-primary mb-2' onClick={addNewBook}>Add Book</button>
      <table>
        <thead>
          <tr>
            <th>Book Id</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>genre</th>
          </tr>
        </thead>
        <tbody>
          {
            books.map(book =>
              <tr key={book.bookId}
                onClick={() => handleRowClick(book.bookId)}>
                <td>{book.bookId}</td>
                <td>{book.bookName}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default ListBookComponent