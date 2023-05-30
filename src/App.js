import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Resume from './components/Resume/Resume'

function App() {
  const isAuth = localStorage.getItem('token')
  return (
    <div>
      <Routes>
        <Route path={'/user/dashboard/resume'} element={isAuth ? <Resume /> : <Login />} />
        <Route path={'/popin'} element={ <Login /> } />
        <Route path={'/join-bubble'} element={<Register />} />
        <Route path={'/'} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
