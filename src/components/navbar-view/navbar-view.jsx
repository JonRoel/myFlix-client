import React from 'react';

import { NavDropdown, Container, Button, Nav, Navbar } from 'react-bootstrap';
import logo from 'url:../../../public/myflix-logo.png';
import { Link } from 'react-router-dom';

import './navbar-view.scss';

export class NavBar extends React.Component {

  // Log out function
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
    this.setState({
      user: null,
      token: null,
    });
  }

  render () {
    const { users } = this.props;

    return (

      <Navbar className="navigation-main" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/"><img className="myFlix-logo-nav" width={100} src={logo} alt="myFlix Logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="menu-items">
            <Nav.Link href="">Hi {`${this.props.user}`} </Nav.Link>
            <NavDropdown title='' id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/">Movies</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={`/users/${this.props.user}`}>Account Details</NavDropdown.Item>
              <NavDropdown.Divider />
              <Button className="logout-button" variant="link" onClick={() => { this.onLoggedOut() }}>Logout</Button>
            </NavDropdown>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        );
      }
}