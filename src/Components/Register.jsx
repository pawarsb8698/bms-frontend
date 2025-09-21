import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import request from "../services/axios";
import "../css/login.css";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    login: "",
    password: "",
  });
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();
  const imagePanelRef = useRef(null);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Parallax effect
  const handleMouseMove = (e) => {
    const panel = imagePanelRef.current;
    if (!panel) return;

    const rect = panel.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

    panel.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    const panel = imagePanelRef.current;
    if (!panel) return;
    panel.style.transform = "translate(0px, 0px) scale(1)";
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onRegister = (event) => {
    event.preventDefault();
    request("POST", "/register", formData)
      .then((response) => {
        localStorage.setItem("auth_token", response.data.token);
        if (response.data.userType === "SUPERUSER") navigate("/users");
        else navigate("/books");
      })
      .catch(() => {
        console.error("Registration failed.");
        navigate("/register");
      });
  };

  return (
    <div className={`vh-100 vw-100 d-flex ${fadeIn ? "fade-in" : ""}`}>
      {/* Left: Registration Form */}
      <div
        className="d-flex flex-column justify-content-center align-items-center p-5"
        style={{ flex: 1, backgroundColor: "#f5f5f5" }}
      >
        <div className="card shadow-lg p-5 login-card modern-login-card">
          <h2 className="text-center mb-4" style={{ fontWeight: "700" }}>
            ALTRES Book Club
          </h2>
          <form onSubmit={onRegister}>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control form-control-lg"
                value={formData.firstName}
                onChange={onChangeHandler}
                placeholder="Enter your first name"
                required
              />
            </div>

            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control form-control-lg"
                value={formData.lastName}
                onChange={onChangeHandler}
                placeholder="Enter your last name"
                required
              />
            </div>

            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="loginName">
                Username
              </label>
              <input
                type="text"
                id="loginName"
                name="login"
                className="form-control form-control-lg"
                value={formData.login}
                onChange={onChangeHandler}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="loginPassword">
                Password
              </label>
              <input
                type="password"
                id="loginPassword"
                name="password"
                className="form-control form-control-lg"
                value={formData.password}
                onChange={onChangeHandler}
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 mb-3 login-btn"
            >
              Register
            </button>

            <p className="text-center">
              Already have an account?{" "}
              <button
                className="btn btn-link p-0"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Right: Illustration / Image */}
      <div
        ref={imagePanelRef}
        className="d-none d-md-flex flex-1 align-items-center justify-content-center position-relative login-image"
        style={{
          flex: 1,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "transform 0.2s ease-out",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="position-absolute w-100 h-100 overlay"
          style={{ backgroundColor: "rgba(0,0,0,0.3)", pointerEvents: "none" }}
        ></div>
      </div>
    </div>
  );
}
