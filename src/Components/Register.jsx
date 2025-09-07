import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../services/axios";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    login: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onRegister = (event) => {
    event.preventDefault();
    request("POST", "/register", formData)
      .then((response) => {
        navigate("/books");
      })
      .catch((error) => {
        console.error("Invalid credentials.");
        navigate("/register");
      });
  };

  return (
    <form onSubmit={onRegister} style={{ marginTop: "30px" }}>
      <div className="form-outline mb-4">
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="form-control"
          onChange={onChangeHandler}
          value={formData.firstName}
        />
        <label className="form-label" htmlFor="firstName">
          First Name
        </label>
      </div>

      <div className="form-outline mb-4">
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="form-control"
          onChange={onChangeHandler}
          value={formData.lastName}
        />
        <label className="form-label" htmlFor="lastName">
          Last Name
        </label>
      </div>

      <div className="form-outline mb-4">
        <input
          type="text"
          id="loginName"
          name="login"
          className="form-control"
          onChange={onChangeHandler}
          value={formData.login}
        />
        <label className="form-label" htmlFor="loginName">
          Username
        </label>
      </div>

      <div className="form-outline mb-4">
        <input
          type="password"
          id="loginPassword"
          name="password"
          className="form-control"
          onChange={onChangeHandler}
          value={formData.password}
        />
        <label className="form-label" htmlFor="loginPassword">
          Password
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-block mb-4">
        Register
      </button>
    </form>
  );
}
