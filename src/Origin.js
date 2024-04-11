import React from 'react';
import {Routes, Route } from 'react-router-dom';
import NotFound from './components/Home/NotFound';
import AdminLogin from './origin-components/AdminLogin';
import AdminDashboard from './origin-components/AdminDashboard';
import { ConfirmProvider } from "material-ui-confirm";
import { useSelector } from "react-redux";
import { Fetching } from './components/UI/Modal/Modal';

//Wrap whole app around ConfirmProvider to be able to open confirmation dialog prompt

const Origin = () => {
  const { fetching } = useSelector(state => state.stateData)

  return (
    <ConfirmProvider>
      <Routes>
        <Route exact path="/" element={ <AdminLogin /> } />
        <Route exact path="/origin/dashboard" element={ <AdminDashboard /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {fetching && <Fetching />}
    </ConfirmProvider>
  );
}

export default Origin;
