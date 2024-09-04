// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {!isAuthenticated ? (
            <Route path="/" element={<SignIn onSignIn={handleSignIn} />} />
          ) : (
            <>
              <Route path="/home" element={<Home onLogout={handleLogout} />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
