import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("auth_token"));
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setRole(decoded?.userType);
            } catch (err) {
                console.error("Invalid token", err);
                setRole(null);
            }
        } else {
            setRole(null);
        }
    }, [token]);

    const setRoleAfterLogin = (newToken) => {
        localStorage.setItem("auth_token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("auth_token");
        setToken(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ token, role, setRoleAfterLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
