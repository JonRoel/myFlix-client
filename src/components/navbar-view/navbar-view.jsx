import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useParams } from 'react-router';
import logo from 'url:../../../public/myflix-logo.png';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

 

export class NavBar extends React.Component {

  // Log out function
 onLoggedOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
  this.setState({
    user: null
  });
}

render () {
  return (

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="#home"><img className="myFlix-logo-nav" width={100} src={logo} alt="myFlix Logo" /></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav>
        <Nav.Link className="me-auto" href="">Hi Username</Nav.Link>
        <NavDropdown title='' id="collasible-nav-dropdown">
            <NavDropdown.Item href="/users/">Account Details</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item></NavDropdown.Item>
            <Button variant="link" onClick={() => { this.onLoggedOut() }}>Logout</Button>
          </NavDropdown>
      </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
      );
    }
}