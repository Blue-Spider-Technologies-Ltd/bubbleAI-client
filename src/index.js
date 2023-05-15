import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import store from "./redux/store.js"
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import jwt_decode from "jwt-decode";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>  
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

const now = new Date().getTime()
//Deauthenticate user hourly
setInterval(() => {
  let tokenToExpire = localStorage?.getItem('token')
  tokenToExpire = jwt_decode(tokenToExpire)
  if(tokenToExpire && now > tokenToExpire.expiration) {
    localStorage.removeItem('token')
  }
}, (60 * 60 * 1000))

//Refresh usage every day for unauthenticated users
setInterval(() => {
  let tokenToExpire = localStorage?.getItem('oats_3297')
  tokenToExpire = jwt_decode(tokenToExpire)
  if(tokenToExpire && now > tokenToExpire.expiration) {
    localStorage.removeItem('token')
  }
}, (24 * 60 * 60 * 1000))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log());
