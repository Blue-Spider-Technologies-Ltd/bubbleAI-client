import React, { useEffect } from 'react';
import {Routes, Route } from 'react-router-dom';
import PWAInstallPrompt from './components/UI/PWAInstallPrompt';
import PWANotificationPrompt from './components/UI/PWANotificationPrompt';
import Home from './components/Home/Home';
import NotFound from './components/Home/NotFound';
import UnderConstruction from './components/Home/UnderConstruction';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Verification from './components/Auth/Verification';
import PwdRecovery from './components/Auth/PwdRecovery';
import Resume from './components/Resume/Resume'
import BizProposal from './components/BizProposal/BizProposal';
import ResumeLearnMore from './components/UI/LearnMorePages/ResumeLearnMore';
import ViewResume from './components/Resume/ViewResume'
import Depositions from './components/Depositions/Depositions';
import MockTests from './components/MockTests/MockTests';
import Pricing from './components/Pricing/Pricing';
import TransactionDone from './components/TransactionDone/TransactionDone';
import Profile from './components/Dashboard/Profile';
import DashSupport from './components/Dashboard/DashSupport';
import ResumeHub from './components/Resume/Items/ResumeHub';
import JobHub from './components/Resume/Items/JobHub';
import ReferralHub from './components/Resume/Items/ReferralHub';
import RecruiterHub from './components/Resume/Items/RecruiterHub';
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
import Utme from "./components/MockTests/Exams/Utme/Utme"
import ExamStarted from "./components/MockTests/ExamStarted/ExamStarted"
import InsightNTutor from "./components/MockTests/InsightNTutor/InsightNTutor"
import Wassce from "./components/MockTests/Exams/Wassce"
import ResetPass from './components/Dashboard/ResetPass';
import GoogleCallback from './components/Auth/GoogleCallback';
import Terms from './components/Home/Terms';
// import HowIWork from './components/Home/HowIWork';
import ContactUsPage from './components/Home/ContactUsPage';
import AskMe from "./components/Home/AskMe"
import DownloadCoverLetter from './components/Resume/CoverLetters/DownloadCoverLetter';
import { ConfirmProvider } from "material-ui-confirm";
import { useSelector } from "react-redux";
import { Fetching } from './components/UI/Modal/Modal';
import { GoogleOAuthProvider } from '@react-oauth/google';

//Wrap whole app around ConfirmProvider to be able to open confirmation dialog prompt


const App = () => {
  const { fetching } = useSelector(state => state.stateData)

  // Load PWA-specific scripts
  useEffect(() => {
    // Load iOS fixes
    const iosFixes = document.createElement('script');
    iosFixes.src = '/ios-fixes.js';
    iosFixes.async = true;
    document.body.appendChild(iosFixes);

    // Load iOS CSS fixes
    const iosFixesCSS = document.createElement('link');
    iosFixesCSS.rel = 'stylesheet';
    iosFixesCSS.href = '/ios-fixes.css';
    document.head.appendChild(iosFixesCSS);

    // Load network detector
    const networkDetector = document.createElement('script');
    networkDetector.src = '/network-detector.js';
    networkDetector.async = true;
    document.body.appendChild(networkDetector);

    // Load performance fixes
    const performanceFixes = document.createElement('script');
    performanceFixes.src = '/performance-fixes.js';
    performanceFixes.async = true;
    document.body.appendChild(performanceFixes);

    // Clean up on unmount
    return () => {
      document.body.removeChild(iosFixes);
      document.head.removeChild(iosFixesCSS);
      document.body.removeChild(networkDetector);
      document.body.removeChild(performanceFixes);
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId="260080247067-o0iar4akf4pce1j5ilstvkdeb9tr3elm.apps.googleusercontent.com">
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
          <Route path={'/user/dashboard/mock/utme'} element={ <Utme /> } />
          <Route path={'/user/dashboard/mock/exam-started'} element={ <ExamStarted /> } />
          <Route path={'/user/dashboard/mock/exam-insight'} element={ <InsightNTutor /> } />

          <Route path={'/user/dashboard/mock/wassce'} element={ <UnderConstruction /> } />
          <Route path={'/user/dashboard/profile'} element={ <Profile /> } />
          <Route path={'/user/dashboard/dash-support'} element={ <DashSupport /> } />
          <Route path={'/user/dashboard/reset-pass'} element={ <ResetPass /> } />
          <Route path={'/user/dashboard/resume-hub'} element={ <ResumeHub /> } />
          <Route path={'/user/dashboard/job-hub'} element={ <JobHub /> } />
          {/* <Route path={'/user/dashboard/auto-apply'} element={ <AutoApplyAgent /> } /> */}
          <Route path={'/user/dashboard/referral-hub'} element={ <ReferralHub /> } />
          <Route path={'/user/dashboard/recruiter'} element={ <RecruiterHub /> } />

          <Route path={'/user/dashboard/resume'} element={ <Resume /> } />
          <Route path={'/user/dashboard/depositions'} element={ <Depositions /> } />
          <Route path={'/user/dashboard/mock'} element={ <MockTests /> } />
          <Route path={'/user/dashboard/business-plan'} element={ <UnderConstruction /> } />
          <Route path={'/user/dashboard/business-proposal'} element={ <BizProposal /> } />
          <Route path={'/user/dashboard/product-price'} element={ <UnderConstruction /> } />
          <Route path={'/user/dashboard/councellor'} element={ <UnderConstruction /> } />
          <Route path={'/user/dashboard/fraud-detector'} element={ <UnderConstruction /> } />
          <Route path={'/user/dashboard/generate-report'} element={ <UnderConstruction /> } />
          <Route path={'/learn-more'} element={<ResumeLearnMore />} />
          <Route path={'/view-resume'} element={<ViewResume />} />
          <Route path={'/popin'} element={ <Login /> } />
          <Route path={'/verify'} element={ <Verification /> } />
          <Route path={'/reset-password'} element={ <PwdRecovery /> } />
          <Route path={'/join-bubble'} element={<Register />} />
          <Route path={'/pricing'} element={<Pricing />} />
          <Route path={'/privacy'} element={<Terms />} />
          <Route path={'/how-i-work'} element={<ResumeLearnMore />} />
          <Route path={'/support'} element={<ContactUsPage />} />
          <Route path={'/transaction'} element={<TransactionDone />} />
          <Route path={'/chat'} element={<AskMe />} />
          <Route path={'/cover-letter'} element={<DownloadCoverLetter />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route exact path={'/'} element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {fetching && <Fetching />}
      </ConfirmProvider>
      
      {/* PWA Components */}
      <PWAInstallPrompt />
      <PWANotificationPrompt />
    </GoogleOAuthProvider>
  );
}

export default App;
