import React, { useEffect, useState } from 'react';
import "./VerifyCustomer.css";
import { LoadingIndicator } from '../../Util/LoadingIndicator';
import { AppNotificationComponent } from '../../Util/AppNotificationComponent';
import { messageService } from '../../Service/MessageService';
import { ticketService } from '../../Service/Api/TicketService';
import Header from '../Header';
import { Row, Col } from 'react-bootstrap';
import { QrReader } from 'react-qr-reader';


function scanQRCode (isScanning, setTicketId) {

  if (isScanning) {
    return (
      <>
        <QrReader scanDelay={5000}
          onResult={(result, error) => {
            if (!!result) {
              setTicketId(result?.text);
             
            }
  
            if (!!error) {
            }
          }}
          style={{ width: '100%' }}
        />
      </>
    )
  }
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

function displayError (error, message) {
  if (error) {
    console.log(error);
  }
  messageService.clearMessages();
  messageService.sendMessage(false, message);
}

function VerifyCustomer() {
  const [booking, setBooking] = useState(null);
  const [buttonText, setButtonText] = useState("Scan Barcode");
  const [isScanning, setIsScanning] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [bookingDate, setBookingDate] = useState(null);

  useEffect(() => {
    if (ticketId !== null) {
      ticketService.verifyTicket(ticketId).then((res) => {
        return res.json();
      }).then((data) => {
        if (data?.status) {
          setBooking(data?.data);
          setBookingDate(data?.data?.payment?.slot?.slotFor.split('T'));
          messageService.clearMessages();
          messageService.sendMessage(true, "Successfully Retrieved Booking Information.");
        } else {
          displayError(null, "Failed to Retrieve Booking Information");
        }
      }).catch((error) => displayError(error, "Failed to Retrieve Booking Information."));
    }
  }, [ticketId]);

  useEffect(() => {
    setButtonText(isScanning ? "Cancel Scanning" : "Scan Barcode");
  }, [isScanning]);

  if (booking !== null) {
    return (
      <>
        {displayHeaderInformation()}
        <div className='row'>
                      <div class = "col-2"></div>
                      <div class = "col-8 test">
                          <p className='booked-title'>Details</p>
                          <div className='row'>
                              <div className='col-6'>
                                  <div className='row'>
                                      <p className='booked-service-title'>Service Detail</p>
                                      <p className='booked-service-description'>{booking?.payment?.serviceDetail?.name} @ {bookingDate[0]} @ {bookingDate[1]} by {booking?.payment?.slot?.stylistName}</p>
                                      <hr/>
                                  </div>
                                  <div className='row mt-4'>
                                      <p className='user-detail-title mb-0'>User Information</p>
                                      <p className='user-detail mb-0'>{booking?.payment?.firstName}</p>
                                      <p className='user-detail mb-0'>{booking?.payment?.lastName}</p>
                                      <p className='user-detail mb-0'>{booking?.payment?.email}</p>
                                      <p className='user-detail mb-0'>{booking?.payment?.phoneNumber}</p>
                                  </div>
                                
                              </div>
                              <div className='col-6'>
                                  <div className='row'>
                                    <div className= "col-4">
                                    </div>
                                    <div className = "col-4">
                                     
                                    </div>
                                    <div className = "col-4">
                                    <button className='btn btn-primary btn-block' onClick={(e) => {
                                        e.preventDefault();
                                        window.location.reload();
                                      }}>Scan Another Code</button>
                                    </div>
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
            {displayHeaderInformation()}
            <div className='row'>
              <div className='col-4'></div>
              <div className='col-4'>
                  <button className='btn btn-primary btn-block' onClick={(e) => {
                    e.preventDefault();
                    setIsScanning(!isScanning);
                  }}>{buttonText}</button>
                  <div className='row'>
                    {scanQRCode(isScanning, setTicketId)}
                  </div>
              </div>
              <div className='col-4'></div>
            </div>
      </>
    )
  }
  
}

export default VerifyCustomer