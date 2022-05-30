import React, { useRef, useState } from 'react';
import "./BillingDetails.css"
import Header from '../Header';
import { Row, Col } from 'react-bootstrap';
import { LoadingIndicator } from '../../Util/LoadingIndicator';
import { AppNotificationComponent } from '../../Util/AppNotificationComponent';
import { messageService } from '../../Service/MessageService';
import { paymentService } from '../../Service/Api/PaymentService';
import { useParams, useNavigate } from 'react-router-dom';

function completeForm (e, slotId, serviceId, serviceName, firstName, lastName, email, phoneNumber, navigate) {
  e.preventDefault();
  if (checkIfDataIsPresent(firstName, lastName, email, phoneNumber)) {
      messageService.clearMessages();
      paymentService.initiatePayment({
          "slotId": slotId,
          "salonServiceDetailId": serviceId,
          "firstName": firstName,
          "lastName": lastName,
          "email": email,
          "phoneNumber": phoneNumber
      }).then(response => {
        return response.json();
      })
      .then(data => {
          if (data?.status) {
              messageService.sendMessage(true, "Your Slot has been Locked-in  Please Make a Desposit to Secure Booking.");
              navigate(`/makepayment/${slotId}/${serviceId}/aman`, { state: { bookingData: data?.data, serviceName: serviceName } });
          } else {
              this.displayError(null, "Failed to Lock-in slot.")
              
          }
      }).catch((e) => displayError(e, "Failed to Retrieve Information."));
  } else {
      messageService.sendMessage("false", "Please fill out the form.");
     
  }

  
}

function displayError (e, message) {
if (e !== null) {
    console.log.apply(e);
}
messageService.clearMessages();
messageService.sendMessage(message);

}


function handleFormValidation(e, firstName, lastName, email, phoneNumber, setIsValid) {
 e.preventDefault();
 setIsValid(checkIfDataIsPresent(firstName, lastName, email, phoneNumber));
}

function checkIfDataIsPresent (firstName, lastName, email, phoneNumber) {
return (firstName && lastName && email && phoneNumber) ? true: false;
}

function BillingDetails() {
  const navigate = useNavigate();
  const {slotId, serviceId, serviceName} = useParams();
  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const phoneNumber = useRef(null);
  const [isValid, setIsValid] = useState(false);
    
  return (
    <>
    <Header/>
     <Row>
        <Col xs={4}></Col>
        <Col xs={4}>
          <div className='app-loading mt-2'>
              <LoadingIndicator/>
          </div>
        </Col>
        <Col xs={4}>
          <div className='float-end mr-5 mt-2'>
            <AppNotificationComponent/>
          </div>
        </Col>
      </Row>
      <div className='row'>
      <div className='row'>
            <div className='col-2'></div>
            <div className='col-8'>
                <form onChange={(e) => handleFormValidation(e, firstName.current.value, lastName.current.value, email.current.value, phoneNumber.current.value, setIsValid)}>
                    <p className='billing-title mb-2 '>Enter Billing Detail</p>
                      <label className='billing-label' required>First Name</label>
                      <input ref={firstName}  placeholder="Enter your First Name" type="text" required></input>
                      <label className='billing-label'>Last Name</label>
                      <input ref={lastName}  placeholder="Enter your First Name" type="text" required></input>
                      <label className='billing-label'>Email address</label>
                      <input  ref={email}  placeholder="Enter your Email" className='billing-label' type="email" required></input>
                      <label className='billing-label' >Phone Number</label>
                      <input ref={phoneNumber}  placeholder="Enter your phone number" type="tel" required></input>
                      <button onClick={(e) => completeForm(e, slotId, serviceId, serviceName, firstName.current.value, lastName.current.value, email.current.value, phoneNumber.current.value, navigate)} className='btn btn-primary btn-payment' disabled={!isValid}>Make Payment</button>
                </form>
            
            </div>
            <div className='col-2'></div>
        </div>
      </div>
      </>
  )
}

export default BillingDetails