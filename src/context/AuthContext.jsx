import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("auth_token"));
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        localStorage.setItem("auth_token", token);
        const decoded = jwtDecode(token);
        setRole(decoded?.userType);
        setUserId(decoded?.userId);
      } catch (err) {
        console.error("Invalid token", err);
        setRole(null);
        setUserId(null);
      }
    } else {
      setRole(null);
    }
  }, [token]);

  // const setRoleAfterLogin = (newToken) => {
  //   localStorage.setItem("auth_token", newToken);
  //   setToken(newToken);
  //   const decoded = jwtDecode(token);
  //   setRole(decoded?.userType);
  //   setUserId(decoded?.userId);
  // };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setRole(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, userId, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
