import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { paymentService } from '../../Service/Api/PaymentService';
import { stripePromise } from "../../configuration/StripeConfiguration";
import { ElementsConsumer, CardElement, Elements } from '@stripe/react-stripe-js';
import { messageService } from '../../Service/MessageService';
import "./Payment.css";
import Header from '../Header';
import { Row, Col } from 'react-bootstrap';
import { LoadingIndicator } from '../../Util/LoadingIndicator';
import { AppNotificationComponent } from '../../Util/AppNotificationComponent';

function makePayment(e, stripe, elements, bookingData, setIsProcessing, navigate) {
    e.preventDefault();
    setIsProcessing(true);
    stripe.confirmCardPayment(bookingData?.secretId, {
           
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: `${bookingData.firstName} ${bookingData.lastName}`,
                    email: bookingData.email,
                    phone: bookingData.phoneNumber
                },

            }, 
        }).then((paymentResponse) => {
            if (paymentResponse?.paymentIntent?.status === "succeeded") {
                setIsProcessing(false);
                messageService.clearMessages();
                messageService.sendMessage(true, "Payment Successful.");
               navigate("confirmBooking", { state: { paymentId: bookingData?.intentId } })
            } else {
                displayError("Payment Failed");
                setIsProcessing(false);
            }
        }).catch((error) => {
            displayError(error, "Payment Failed");
            setIsProcessing(false);
        });
        
}

function displayError (e, message) {
    if (e !== null) {
        console.log.apply(e);
    }
    messageService.clearMessages();
    messageService.sendMessage(message);
    
    }

function displayHeaderInformation() {
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
        </>
    )
}

function Payment() {
    const { state } = useLocation();
    const { bookingData, serviceName } = state;
    const [ isProcessing, setIsProcessing ] = useState(false);
    const navigate = useNavigate();
    if (bookingData !== null) {
        return ( 
            <>
                {displayHeaderInformation()}
                <div className='row'>
            
                <Elements stripe={stripePromise} options={{clientSecret: bookingData?.secretId}}>
                <ElementsConsumer>
                  {({stripe, elements}) => (
                      <>
                       <div className='col-2'></div>
                            <div className='col-8'>
                                <p className='payment-title'>{`Booking for ${serviceName}`}</p>
                                <p className='payment-sub-title'>Enter Card Details</p>
                                <form>
                                    <CardElement/>
                                    <div className='row mt-5 pt-4'>
                                        <div className='col-4'></div>
                                        <div className='col-4'>
                                            <button className='btn btn-block btn-primary' onClick={(e) => makePayment(e, stripe, elements, bookingData, setIsProcessing, navigate)} disabled={!stripe || isProcessing}>Pay</button>
                                        </div>
                                        <div className='col-4'></div>
                                    </div>
                                </form>
                            </div>
                            <div className='col-2'></div>
                      </>
                  )}
                </ElementsConsumer>          
                </Elements> 
                </div>
       
               
         
            </>     
        )
    } else {
        return (
            <>
             {displayHeaderInformation()}
             <div className='row'>
                <p className='text-center payment-no-data'>No Data available</p>
             </div>
            </>
           
        )
    
    }
}

export default Payment