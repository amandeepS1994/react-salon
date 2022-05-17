import { Button, Card } from 'react-bootstrap'
import React from 'react'
import "./SalonItem.css"

export const SalonItem = ({id, name, description, price, timeInMinutes}) => {
  return (
      <div className='col-4'>
        <Card className='mb-4'>
            <Card.Header className='card-header'>{name}</Card.Header>
                <Card.Body>
                    <Card.Title> ${price}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <p className='card-time'>{timeInMinutes} Minutes</p>
                </Card.Body>
                <div className='row mb-5'>
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <Button className='btn-block btn-primary btn-salon'>Book Now</Button>
                    </div>
                    <div className='col-4'></div>
                </div>
        </Card>
      </div>
  )
}

