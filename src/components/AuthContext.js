import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (username, password) => {
    try {
      const response = await axios.post('/api/register', { username, password });
      setUser(response.data);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/login', { username, password });
      setUser(response.data);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};