import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from './Header';
import "./ChooseSlot.css";
import { messageService } from '../Service/MessageService';
import { AppNotificationComponent } from '../Util/AppNotificationComponent';
import { LoadingIndicator } from '../Util/LoadingIndicator';
import { salonServices } from "../Service/Api/SalonService";
import { progressService }  from "../Service/ProgressIndicator";
import  SlotItem  from './SlotItem'; 


function ValidateDate(date, today, setRequestedDate, setValidState) {
    setRequestedDate(date);
    if (date < today) {
        messageService.sendMessage(false, "Select a Valid Date");
        setValidState(false);
    } else {
        setValidState(true);
    }
}

function displayAvailableSlots (isValid, serviceName, requestedDate, availableSlots) {
    if (isValid && availableSlots.length > 0) {
            return (
                <div className='service-slot'>
                    <p>Available Slots for {requestedDate}</p>
                    <div className = "col-12">
                        <div className='row'>
                        {availableSlots.map((slot, key) => (
                            <SlotItem key={slot.id} id = {slot?.id} slotFor = {slot?.slotFor} serviceName = {serviceName} status = {slot?.status} stylistName = {slot?.stylistName} />
                        ))}
                        </div>
                    </div>
                </div>
            )
    }


}

function fetchData(e, isValid, serviceId, requestedDate, setAvailableSlots) {
    e.preventDefault();
    if (isValid) {
        progressService.startProgress(true, 0);
        salonServices.availableSlotsForServices(serviceId, requestedDate)
        .then((response) => {
            return response.json()
        }).then((data) => {
            setAvailableSlots(data?.data)
            messageService.clearMessages();
            messageService.sendMessage(true, "Data Retrieved.");
            progressService.startProgress(true, 100);
        }).catch((error) => {
            console.log(error);
            messageService.sendMessage(false, "Failed to Retrieve Service Slot Information.");
            progressService.startProgress(false, 0);
        }).finally(() => {
            progressService.startProgress(false, 0);
        });
     
    }
}

function ChooseSlot() {
    const [isValid, setValidState] = useState(false);
    const {serviceId, serviceName} = useParams();
    const [requestedDate, setRequestedDate] = useState();
    const today = new Date().toISOString().split('T')[0];
    const [availableSlots, setAvailableSlots] = useState([]);
    
  return (
      <>
        <Header/> 
        <div className='row'>
            <div className='col-4'></div>
            <div className='col-4'>
                <div className='app-loading mt-2'>
                <LoadingIndicator/>
            </div>
            </div>
            <div className='col-4'>
                <div className='float-end mr-5 mt-2'>
                    <AppNotificationComponent/>
                </div>
            </div>
        </div> 
       
        <div className='row'>
            <div className = "col-2">

            </div>
            <div className='col-8'>
                <p className='service-title text-center'>Choose a date for {serviceName}</p>
                <div className='row mt-5'>
                    <div className='col-3'></div>
                    <div className='col-5'>
                        <input type="date" onChange={(e) => ValidateDate(e.target.value, today, setRequestedDate, setValidState)}></input>
                    </div>
                    <div className='col-2'>
                        <button className='btn btn-primary btn-block btn-slot' onClick={(e) => {fetchData(e, isValid, serviceId, requestedDate, setAvailableSlots)}} disabled={!isValid} >Show Slots</button>
                    </div>
                </div>
               
                
                
                
               
            </div>
            <div className='col-2'></div>
        </div>
        <div className='row'>
            {displayAvailableSlots(isValid, serviceName, requestedDate, availableSlots)}
        </div>
      </>

  )
}

export { ChooseSlot } ;