import React, { Component } from 'react';
import './Header.css'
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../images/logox64.png';
class Header extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {

    }
  }

  render()
  {
    return (
      <div className="header">
      <Navbar bg="light" expand="lg" fixed="top">
      <Navbar.Brand><img src={logo} alt=""></img> Badge Trading</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav className="mr-auto">
          <Nav.Link className="link" as={Link} to="/"><h3>Home</h3></Nav.Link>
          <Nav.Link className="link"as={Link} to="/BuyOffers"><h3>Buy Offers</h3></Nav.Link>
          <Nav.Link className="link" as={Link} to="/SellOffers"><h3>Sell Offers</h3></Nav.Link>
        </Nav>
    </Navbar> 
    </div>
    )
  }
}

export default Header;