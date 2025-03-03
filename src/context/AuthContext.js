import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (storedUser) {
      setUser(storedUser);
    }
    setUsers(storedUsers);
  }, []);

  // Login method: checks if email and password match a user
  const login = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser)); // Store logged-in user
      return true;
    }
    return false;
  };

  // Register method: adds new user with email and password
  const register = (username, email, password) => {
    const newUser = { username, email, password };
    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save users in localStorage

    // Automatically log in the new user
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser)); // Store user in localStorage
  };

  const getUsers = () => {
    return users;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, getUsers, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
