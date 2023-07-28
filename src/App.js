import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Verification from './components/Auth/Verification';
import PwdRecovery from './components/Auth/PwdRecovery';
import Resume from './components/Resume/Resume'
import Depositions from './components/Depositions/Depositions';

function App() {
  return (
    <div>
      <Routes>
        <Route path={'/user/dashboard/resume'} element={ <Resume /> } />
        <Route path={'/user/dashboard/depositions'} element={ <Depositions /> } />
        <Route path={'/popin'} element={ <Login /> } />
        <Route path={'/verify'} element={ <Verification /> } />
        <Route path={'/reset-password'} element={ <PwdRecovery /> } />
        <Route path={'/join-bubble'} element={<Register />} />
        <Route path={'/'} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
