import React, { useEffect } from "react";
import { useState, useContext } from "react";
import {
  createBook,
  getBook,
  updateBook,
  deleteBook,
} from "../services/BookService";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const BookComponent = () => {
  const [bookId, setBookId] = useState("");
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [imageNameToBeDisplayed, setImageName] = useState("");
  const [imageName, setImageNameToBeSaved] = useState("");
  const [imageId, setImageId] = useState("");

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

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleOwner(e) {
    setOwner(e.target.value);
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Edit Book</h2>;
    } else {
      return <h2 className="text-center">Add Book</h2>;
    }
  }

  const getExtension = (filename) => {
    return filename.split(".").pop();
  };

  useEffect(() => {
    if (id) {
      getBook(id)
        .then((response) => {
          debugger;
          setBookId(response.data.bookId);
          setBookName(response.data.bookName);
          setAuthor(response.data.author);
          setGenre(response.data.genre);
          setDescription(response.data.description);
          setOwner(response.data.owner);
          setImageName(response.data.imageName);
          setImageId(
            response.data.bookId + "." + getExtension(response.data.imageName)
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function saveOrUpdateBook(e) {
    e.preventDefault();

    const form = e.target.closest("form");

    // Check if form is valid before proceeding
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // Form is valid
    const book = {
      bookId,
      bookName,
      author,
      genre,
      description,
      owner,
      imageName,
    };

    const formData = new FormData();
    formData.append(
      "book",
      new Blob([JSON.stringify(book)], { type: "application/json" })
    );
    formData.append("file", bookImage);

    if (id) {
      updateBook(id, formData)
        .then((response) => {
          navigator(`/edit-book/${id}`);

          // ✅ Reset validation feedback
          form.classList.remove("was-validated");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      createBook(formData)
        .then((response) => {
          navigator(`/edit-book/${response.data.bookId}`);

          // ✅ Reset validation feedback
          form.classList.remove("was-validated");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function deleteRecord(e) {
    e.preventDefault();
    deleteBook(id)
      .then((response) => {
        navigator("/books");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function returnToBooks(e) {
    e.preventDefault();
    navigator("/books");
  }

  useEffect(() => {
    // Bootstrap validation handling
    const forms = document.querySelectorAll(".needs-validation");
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header text-center bg-primary text-white">
              {id ? "Edit Book" : "Add Book"}
            </div>

            <div className="card-body">
              <form
                className="needs-validation"
                noValidate
                onSubmit={saveOrUpdateBook}
              >
                <input type="hidden" name="bookId" value={bookId} />

                {/* Book Name */}
                <div className="mb-3">
                  <label className="form-label">Book Name</label>
                  <input
                    type="text"
                    name="bookName"
                    value={bookName}
                    className="form-control"
                    required
                    onChange={handleBookName}
                  />
                  <div className="invalid-feedback">Book name is required.</div>
                </div>

                {/* Author */}
                <div className="mb-3">
                  <label className="form-label">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={author}
                    className="form-control"
                    required
                    onChange={handleAuthor}
                  />
                  <div className="invalid-feedback">Author is required.</div>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    value={description}
                    className="form-control"
                    required
                    onChange={handleDescription}
                    rows="3"
                  ></textarea>
                  <div className="invalid-feedback">
                    Description is required.
                  </div>
                </div>

                {/* Owner */}
                <div className="mb-3">
                  <label className="form-label">Owner</label>
                  <input
                    type="text"
                    name="owner"
                    value={owner}
                    className="form-control"
                    required
                    onChange={handleOwner}
                  />
                  <div className="invalid-feedback">Owner is required.</div>
                </div>

                {/* Genre */}
                <div className="mb-3">
                  <label className="form-label">Genre</label>
                  <input
                    type="text"
                    name="genre"
                    value={genre}
                    className="form-control"
                    required
                    onChange={handleGenre}
                  />
                  <div className="invalid-feedback">Genre is required.</div>
                </div>

                {/* Image Upload */}
                <div className="mb-3">
                  <label className="form-label">Upload a File</label>
                  <input
                    type="file"
                    name="file"
                    className={`form-control ${
                      !id && !bookImage ? "is-invalid" : ""
                    }`}
                    onChange={handleBookImage}
                    required={!id} // Only required when adding
                  />
                  {!id && !bookImage && (
                    <div className="invalid-feedback">
                      Please upload a file.
                    </div>
                  )}

                  {/* Image Preview & Link */}
                  {id && imageId && (
                    <div className="mt-3">
                      <img
                        src={`http://localhost:8080/api/books/images/${imageId}`}
                        alt={imageNameToBeDisplayed}
                        className="img-thumbnail mb-2"
                        style={{
                          width: "150px",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                      <p className="mb-0">
                        <strong>Uploaded File:</strong>
                      </p>
                      <a
                        href={`http://localhost:8080/books/${bookId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {imageNameToBeDisplayed}
                      </a>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="d-flex flex-wrap gap-2 mt-4">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>

                  {(role === "ADMIN" || role === "EMPLOYEE") && id && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={deleteRecord}
                    >
                      Delete
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={returnToBooks}
                  >
                    Return to Books
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
