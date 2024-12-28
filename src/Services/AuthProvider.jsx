import { useState, createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const login = (userData, role) => {
    setUser(userData);
    setRole(role);
  };
  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

import PropTypes from 'prop-types';

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);