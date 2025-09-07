import React from "react";
import { useNavigate } from "react-router-dom";

export const HeaderComponent = () => {
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            ALTRES Book Club
          </a>
        </nav>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="#" onClick={logout}>
            Logout
          </a>
        </nav>
      </header>
    </div>
  );
};
