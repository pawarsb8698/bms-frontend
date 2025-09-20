import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../services/axios";

export default function Login() {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "login") {
      setLogin(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onLogin = (event) => {
    event.preventDefault();
    request("POST", "/login", { login, password })
      .then((response) => {
        localStorage.setItem("auth_token", response.data.token);
        if (response.data.userType === 'SUPERUSER') {
          navigate("/users");
        } else {
          navigate("/books");

        }
      })
      .catch((error) => {
        console.error("Invalid credentials.");
        navigate("/login");
      });
  };

  const redirectToRegister = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  return (
    <form onSubmit={onLogin} style={{ marginTop: "30px" }}>
      <div className="form-outline mb-4">
        <input
          type="text"
          id="loginName"
          name="login"
          className="form-control"
          value={login}
          onChange={onChangeHandler}
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
          value={password}
          onChange={onChangeHandler}
        />
        <label className="form-label" htmlFor="loginPassword">
          Password
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-block mb-4">
        Login
      </button>

      <p>
        New user?{" "}
        <a href="#" onClick={redirectToRegister}>
          Register
        </a>
      </p>
    </form>
  );
}
