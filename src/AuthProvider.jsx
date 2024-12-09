import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
// Create Context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const signIn = (userData) => {
    if (userData) {
      setUser(userData);
      setIsAuthenticated(true);
    }
  };

  const signOut = () => {
    axios.get("/api/user/signout").catch((err) => console.log(err));
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    axios.get("/api").then((res) => {
      console.log(res.data.user);
      signIn(res.data.user)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
