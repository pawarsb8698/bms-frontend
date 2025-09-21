import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const HeaderComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  // Paths where Logout should NOT be visible
  const hideLogoutPaths = ["/", "/login", "/register"];
  const shouldShowLogout = !hideLogoutPaths.includes(location.pathname);

  return (
    <header>
      <nav className="navbar navbar-dark bg-dark px-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Brand */}
          <span className="navbar-brand mb-0 h1">ALTRES Book Club</span>

          {/* Logout button only if not on login/register/home */}
          {shouldShowLogout && (
            <button className="btn btn-outline-light" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};
