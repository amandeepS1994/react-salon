import React, { useEffect, useState } from 'react';
import { LoadingIndicator } from '../../Util/LoadingIndicator';
import { AppNotificationComponent } from '../../Util/AppNotificationComponent';
import { messageService } from '../../Service/MessageService';
import { paymentService } from '../../Service/Api/PaymentService';
import Header from '../Header';
import { Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import "./BookingConfirmation.css";
import { QRCodeSVG } from 'qrcode.react';


function pageHeader() {
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

function displayErrorMessage(error, message) {
    if (error) {
        console.log(error);
    }
    messageService.clearMessages();
    messageService.sendMessage(false, message);
}

function BookingConfirmation() {
  const { state } = useLocation();
  const { paymentId } = state;
  const [booking, setBooking] = useState(null);
 
  useEffect(() => {
        paymentService.confirmBooking(paymentId).then((res) => {
            return res.json()
        }).then((data) => {
            if (data?.status) {
                setBooking(data?.data);
            } else {
                displayErrorMessage("", "Failed to Retrieve Booking Information");
            }
        }).catch((error) => {
            console.log(error);
            displayErrorMessage(error, "Failed to Retrieve Booking Information");
        })
    }, [])


  if (booking !== null) {
      const slotTime = booking?.ticket.payment?.slot?.slotFor.split('T');
    return (
        <>
         {pageHeader()}
          <div className='row'>
                    <div class = "col-2"></div>
                    <div class = "col-8 test">
                        <p className='booked-title'>Your Booking Details</p>
                        <div className='row'>
                            <div className='col-6'>
                                <div className='row'>
                                    <p className='booked-service-title'>Service Detail</p>
                                    <p className='booked-service-description'>{booking?.ticket?.payment?.serviceDetail?.name} @ {slotTime[0]} @ {slotTime[1]} by {booking?.ticket?.payment?.slot?.stylistName}</p>
                                    <hr/>
                                </div>
                                <div className='row mt-4'>
                                    <p className='salon-address-title mb-0'>Salon Address Details</p>
                                    <p className='salon-address mb-0'>{booking?.salan?.name}</p>
                                    <p className='salon-address mb-0'>{booking?.salan?.address}</p>
                                    <p className='salon-address mb-0'>{booking?.salan?.city}</p>
                                    <p className='salon-address mb-0'>{booking?.salan?.state}</p>
                                    <p className='salon-address mb-0'>{booking?.salan?.zipcode}</p>
                                    <p className='salon-address mb-0'>{booking?.salan?.phone}</p>
                                </div>
                              
                            </div>
                            <div className='col-6'>
                                <div className='row'>
                                    <p className='booked-service-barcode-title text-center'>Take a picture of the barcode below & present to an Admin</p>
                                </div>
                                <div className='row'>
                                <QRCodeSVG className='booking-qr-code' value={`${booking?.ticket?.id}`} />
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    <div class = "col-2"></div>
                </div>
        </>
      )
  } else {
      return (
          <>
            {pageHeader()}
            <div className='row'>
                <p>No Booking Found.</p>
            </div>
          </>
      )
  }

}

export default BookingConfirmation