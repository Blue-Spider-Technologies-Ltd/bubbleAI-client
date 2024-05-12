import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import NotFound from './components/Home/NotFound';
import UnderConstruction from './components/Home/UnderConstruction';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Verification from './components/Auth/Verification';
import PwdRecovery from './components/Auth/PwdRecovery';
import Resume from './components/Resume/Resume'
import Depositions from './components/Depositions/Depositions';
import MockTests from './components/MockTests/MockTests'
import Pricing from './components/Pricing/Pricing';
import TransactionDone from './components/TransactionDone/TransactionDone';
import Profile from './components/Dashboard/Profile';
import DashSupport from './components/Dashboard/DashSupport';
import ResetPass from './components/Dashboard/ResetPass';
import { ConfirmProvider } from "material-ui-confirm";
import { useSelector } from "react-redux";
import { Fetching } from './components/UI/Modal/Modal';

//Wrap whole app around ConfirmProvider to be able to open confirmation dialog prompt

const App = () => {
  const { fetching } = useSelector(state => state.stateData)

  return (
    <ConfirmProvider>
      <Routes>
        <Route path={'/user/dashboard/profile'} element={ <Profile /> } />
        <Route path={'/user/dashboard/dash-support'} element={ <DashSupport /> } />
        <Route path={'/user/dashboard/reset-pass'} element={ <ResetPass /> } />
        <Route path={'/user/dashboard/resume'} element={ <Resume /> } />
        <Route path={'/user/dashboard/depositions'} element={ <Depositions /> } />
        <Route path={'/user/dashboard/mock'} element={ <MockTests /> } />
        <Route path={'/user/dashboard/business-plan'} element={ <UnderConstruction /> } />
        <Route path={'/user/dashboard/product-price'} element={ <UnderConstruction /> } />
        <Route path={'/user/dashboard/councellor'} element={ <UnderConstruction /> } />
        <Route path={'/user/dashboard/fraud-detector'} element={ <UnderConstruction /> } />
        <Route path={'/user/dashboard/generate-report'} element={ <UnderConstruction /> } />
        <Route path={'/popin'} element={ <Login /> } />
        <Route path={'/verify'} element={ <Verification /> } />
        <Route path={'/reset-password'} element={ <PwdRecovery /> } />
        <Route path={'/join-bubble'} element={<Register />} />
        <Route path={'/pricing'} element={<Pricing />} />
        <Route path={'/transaction'} element={<TransactionDone />} />
        <Route path={'/'} element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {fetching && <Fetching />}
    </ConfirmProvider>
  );
}

export default App;
