import React, { useEffect } from 'react'
import { useState, useContext } from 'react';
import { createBook, getBook, updateBook, deleteBook } from '../services/BookService';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";


export const BookComponent = () => {
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [bookImage, setBookImage] = useState('');
  const [imageNameToBeDisplayed, setImageName] = useState('');
  const [imageName, setImageNameToBeSaved] = useState('');
  const [imageId, setImageId] = useState('');

  const { role } = useContext(AuthContext);
  const navigator = useNavigate();
  const { id } = useParams();

  const handleBookImage = (e) => {
    const file = e.target.files[0];
    debugger;
    if (file) {
      setBookImage(file);
      setImageNameToBeSaved(file.name);
    }
  };

  function handleBookName(e) {
    setBookName(e.target.value);
  }

  function handleAuthor(e) {
    setAuthor(e.target.value);
  }

  function handleGenre(e) {
    setGenre(e.target.value);
  }

  function pageTitle() {
    if (id) {
      return <h2 className='text-center'>Edit Book</h2>;
    } else {
      return <h2 className='text-center'>Add Book</h2>;
    }
  }

  const getExtension = (filename) => {
    return filename.split('.').pop();
  };

  useEffect(() => {
    if (id) {
      getBook(id).then((response) => {
        debugger;
        setBookName(response.data.bookName);
        setAuthor(response.data.author);
        setGenre(response.data.genre);
        setImageName(response.data.imageName);
        setImageId(id + '.' + getExtension(response.data.imageName));
      }).catch(error => {
        console.error(error);
      })
    }
  }, [id]);

  function saveOrUpdateBook(e) {
    debugger;
    e.preventDefault();
    const book = { bookName, author, genre, imageName };
    const formData = new FormData();
    formData.append("book", new Blob([JSON.stringify(book)], { type: "application/json" }));
    formData.append('file', bookImage);
    console.log(book);
    if (id) {
      updateBook(id, formData).then((response) => {
        console.log(book);
        navigator(`/edit-book/${id}`);
      }).catch(error => {
        console.error(error);
      });
    } else {
      createBook(formData).then((response) => {
        console.log(response.data);
        navigator(`/edit-book/${id}`);
      }).catch(error => {
        console.error(error);
      });
    }
  }

  function deleteRecord(e) {
    e.preventDefault();
    deleteBook(id).then((response) => {
      navigator('/books');
    }).catch(error => {
      console.error(error);
    });
  }

  function returnToBooks(e) {
    e.preventDefault();
    navigator('/books');
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          {pageTitle()}
          <div className='card-body'>
            <form>

              <div className='form-group mb-2'>
                <label className='form-label'>Book Name</label>
                <input type='text' placeholder='Enter Book Name' name='bookName' value={bookName}
                  className='form-control' onChange={handleBookName}></input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Author</label>
                <input type='text' placeholder='Enter Author' name='author' value={author}
                  className='form-control' onChange={handleAuthor}></input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Genre</label>
                <input type='text' placeholder='Enter Genre' name='genre' value={genre}
                  className='form-control' onChange={handleGenre}></input>
              </div>

              <div className='form-group mb-2'>
                {id && (
                  <div>
                    <label>Uploaded File:</label>
                    {imageNameToBeDisplayed ? (
                      <a
                        href={`http://localhost:8080/books/${id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {imageNameToBeDisplayed}
                      </a>
                    ) : (
                      <span>No file uploaded</span>
                    )}
                  </div>
                )}
                <img
                  src={`http://localhost:8080/api/books/images/${imageId}`}
                  alt={imageNameToBeDisplayed}
                  style={{ width: "150px", height: "200px", objectFit: "cover" }}
                />
                <input type='file' placeholder='Select file' name='file'
                  className='form-control' onChange={handleBookImage}></input>

              </div>
              <button className='btn btn-primary me-2' onClick={saveOrUpdateBook}>Submit</button>
              {role === "ADMIN" && <button className='btn btn-secondary me-2' onClick={deleteRecord}>Delete</button>}
              {role === "EMPLOYEE" && <button className='btn btn-secondary me-2' onClick={deleteRecord}>DeleteEmp</button>}

              <button className='btn btn-secondary me-2' onClick={returnToBooks}>Return to Books</button>
            </form>

          </div>

        </div>

      </div>

    </div>
  )
}
