import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Page/App';
import reportWebVitals from './reportWebVitals';
import {  Switch, Route, Routes, Link, BrowserRouter } from "react-router-dom";
import { ChooseSlot } from './Page/ChooseSlot';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <App /> }></Route>
        <Route path="/chooseslot/:serviceId/:serviceName" element={ <ChooseSlot/> }></Route>
    </Routes>
     
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
