import React from 'react'
import "./Header.css" 
import {Container, Navbar} from 'react-bootstrap' 

function Header() {
  return (
    <Navbar bg="dark" variant="dark" >
    <Container className='ml-0 mt-2 mb-2'>
        <Navbar.Brand href="/" className='header-textt'>AR Salon & Day Spa</Navbar.Brand>
    </Container>
    </Navbar>


  )
}

export default Header