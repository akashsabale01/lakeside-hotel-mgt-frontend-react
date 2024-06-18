
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';

const NavBar = ({ user, logout }) => {
  const [showAccount, setShowAccount] = useState(false);

  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };

  const isLoggedIn = user != null;
  console.log("isLoggedIn: ", isLoggedIn);

  const userRole = isLoggedIn ? user.role.toUpperCase() : '';
  console.log("userRole: ", userRole);

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow">
      <Container fluid className='mx-3 my-2'>
        <Navbar.Brand as={Link} to="/">
          <span className="hotel-color" style={{fontStyle:"italic"}}>LakeSide Hotel</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/room-list">
              Browse all rooms
            </Nav.Link>
            {isLoggedIn && userRole === 'ADMIN' && (
              <Nav.Link as={NavLink} to="/admin" className='ms-2'>
                Admin
              </Nav.Link>
            )}
          </Nav>
          <Nav className="d-flex">
            <Nav.Link as={NavLink} to="/find-booking">
              Find my booking
            </Nav.Link>
            <NavDropdown title="Account" id="account-dropdown" show={showAccount} onClick={handleAccountClick}>
              {isLoggedIn ? (
                <NavDropdown.Item as="button" onClick={logout} className="btn btn-secondary">
                  Logout
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item as={Link} to="/login">
                  Login
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;


