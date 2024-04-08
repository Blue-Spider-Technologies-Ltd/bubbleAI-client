import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Origin from './Origin';
import { BrowserRouter } from "react-router-dom"
import store from "./redux/store.js"
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';


const handleSubdomain = () => { 
  const fullDomain = window.location.hostname; 
  const subDomains = fullDomain.split("."); 
  if (subDomains[0] === "origin") { 
    return <Origin />; 
  } else { 
    return <App />; 
  } 
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>  
        {handleSubdomain ()}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log());
