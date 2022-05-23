import React from 'react'

function SlotItem({id, slotFor, serviceName, status, stylistName}) {
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
                    <button className='btn btn-primary btn-block btn-slot'>Book this Slot</button>
                </div>
                <div className='col-3'></div>
            </div>
        </div>
    </div>
  )
}

export default SlotItem