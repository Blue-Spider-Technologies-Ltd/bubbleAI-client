import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import NotFound from './components/Home/NotFound';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Verification from './components/Auth/Verification';
import PwdRecovery from './components/Auth/PwdRecovery';
import Resume from './components/Resume/Resume'
import Depositions from './components/Depositions/Depositions';
import { ConfirmProvider } from "material-ui-confirm";

//Wrap whole app around ConfirmProvider to be able to open confirmation dialog prompt

function App() {
  return (
    <ConfirmProvider>
      <Routes>
        <Route path={'/user/dashboard/resume'} element={ <Resume /> } />
        <Route path={'/user/dashboard/depositions'} element={ <Depositions /> } />
        <Route path={'/popin'} element={ <Login /> } />
        <Route path={'/verify'} element={ <Verification /> } />
        <Route path={'/reset-password'} element={ <PwdRecovery /> } />
        <Route path={'/join-bubble'} element={<Register />} />
        <Route path={'/'} element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ConfirmProvider>
  );
}

export default App;
