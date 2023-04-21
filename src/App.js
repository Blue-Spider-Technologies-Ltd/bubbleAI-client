import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/'} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
