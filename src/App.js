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
import Acca from "./components/MockTests/Exams/Acca"
import Cee from "./components/MockTests/Exams/Cee"
import Ceh from "./components/MockTests/Exams/Ceh"
import Cfa from "./components/MockTests/Exams/Cfa"
import Cima from "./components/MockTests/Exams/Cima"
import Cissp from "./components/MockTests/Exams/Cissp"
import Frm from "./components/MockTests/Exams/Frm"
import Gre from "./components/MockTests/Exams/Gre"
import Ielts from "./components/MockTests/Exams/Ielts"
import Neco from "./components/MockTests/Exams/Neco"
import Pmp from "./components/MockTests/Exams/Pmp"
import Toefl from "./components/MockTests/Exams/Toefl"
import Utme from "./components/MockTests/Exams/Utme"
import Wassce from "./components/MockTests/Exams/Wassce"
import ResetPass from './components/Dashboard/ResetPass';
import GoogleCallback from './components/Auth/GoogleCallback';
import Terms from './components/Home/Terms';
import HowIWork from './components/Home/HowIWork';
import { ConfirmProvider } from "material-ui-confirm";
import { useSelector } from "react-redux";
import { Fetching } from './components/UI/Modal/Modal';
import logoImg from "./images/bubble-logo.png"

//Wrap whole app around ConfirmProvider to be able to open confirmation dialog prompt


const App = () => {
  const { fetching } = useSelector(state => state.stateData)

  return (
    <ConfirmProvider>
      <Routes>
        <Route path={'/auth/google/callback'} element={ <GoogleCallback /> } />
        <Route path={'/user/dashboard/mock/acca'} element={ <UnderConstruction /> } />
        <Route path={'/user/dashboard/mock/cee'} element={ <UnderConstruction /> } />
        <Route path={'/user/dashboard/mock/ceh'} element={ <UnderConstruction /> } />
        <Route path={'/user/dashboard/mock/cfa'} element={ <UnderConstruction /> } />
        <Route path={'/user/dashboard/mock/cima'} element={ <UnderConstruction /> } />
        <Route path={'/user/dashboard/mock/cissp'} element={ <UnderConstruction /> } />
        <Route path={'/user/dashboard/mock/frm'} element={ <UnderConstruction /> } />
        <Route path={'/user/dashboard/mock/gre'} element={ <UnderConstruction /> } />
        <Route path={'/user/dashboard/mock/ielts'} element={ <UnderConstruction /> } />
        <Route path={'/user/dashboard/mock/neco'} element={ <UnderConstruction /> } />
        <Route path={'/user/dashboard/mock/pmp'} element={ <UnderConstruction /> } />
        <Route path={'/user/dashboard/mock/toefl'} element={ <UnderConstruction /> } />
        <Route path={'/user/dashboard/mock/utme'} element={ <UnderConstruction /> } />
        <Route path={'/user/dashboard/mock/wassce'} element={ <UnderConstruction /> } />
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
        <Route path={'/images/logo'} element={<img src={logoImg} alt="Logo" width={"100px"}/>} />
        <Route path={'/popin'} element={ <Login /> } />
        <Route path={'/verify'} element={ <Verification /> } />
        <Route path={'/reset-password'} element={ <PwdRecovery /> } />
        <Route path={'/join-bubble'} element={<Register />} />
        <Route path={'/pricing'} element={<Pricing />} />
        <Route path={'/terms'} element={<Terms />} />
        <Route path={'/how-i-work'} element={<HowIWork />} />
        <Route path={'/transaction'} element={<TransactionDone />} />
        <Route path={'/'} element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {fetching && <Fetching />}
    </ConfirmProvider>
  );
}

export default App;
