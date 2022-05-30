import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function navigateToBookingComponent (slotId, serviceId, serviceName) {
 
    this.props.history.push(`/makepayment/${slotId}/${serviceId}/${serviceName}`)
} 

function SlotItem({slotId, serviceId, slotFor, serviceName, status, stylistName}) {
  const history = useNavigate();
  const stateInformation = {
     slotId: slotId,
     serviceId: serviceId,
     serviceName: serviceName
}
  return (
    <div className='col-4'>
        <div className='card mb-4 mr-2 ml-2'>
            <div className='card-body'>
                <p className='card-header'>{serviceName}</p>
                <p className='card-title text-center mt-4'>{stylistName}</p>
                    <p className='card-text mb-4'>Slot Time: {slotFor.split('T')[1]}</p>
            </div>
            <div className='row'>
                <div className='col-3'></div>
                <div className='col-6 mb-4'>
                    <Link to={`/billingdetails/${slotId}/${serviceId}/${serviceName}`}  data={stateInformation}>
                    <button className='btn btn-primary btn-block btn-slot'>Book this Slot</button>
                    </Link>
                </div>
                <div className='col-3'></div>
            </div>
        </div>
    </div>
  )
}



export default SlotItem