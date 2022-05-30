import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Page/App';
import reportWebVitals from './reportWebVitals';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ChooseSlot } from './Page/ChooseSlot';
import  BillingDetails  from './Page/Billing Details/BillingDetails';
import Payment from './Page/Payment/Payment';
import { stripePromise } from "./configuration/StripeConfiguration"
import { Elements } from '@stripe/react-stripe-js';
import  BookingConfirmation  from "./Page/Booking Confirmation/BookingConfirmation";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <App /> }></Route>
        <Route path="/chooseslot/:serviceId/:serviceName" element={ <ChooseSlot/> }></Route>
        <Route path='/billingdetails/:slotId/:serviceId/:serviceName' element={ <BillingDetails/> }></Route>
        <Route path='/makepayment/:slotId/:serviceId/:serviceName' element={ <Payment/> }></Route>
        <Route path='/makepayment/:slotId/:serviceId/:serviceName/confirmBooking' element={ <BookingConfirmation/> }></Route>
      
    </Routes>
     
    </BrowserRouter>
    </Elements>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
