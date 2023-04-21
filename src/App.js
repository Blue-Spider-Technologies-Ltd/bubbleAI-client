import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function App() {
  return (
    <div>
      <Routes>
        <Route path={'/popin'} element={<Login />} />
        <Route path={'/join-bubble'} element={<Register />} />
        <Route path={'/'} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
