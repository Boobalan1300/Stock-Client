

import React from "react";
import { Nav, Navbar, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";

function SupervisorNav({ handleHaveToUpdateClick, handleProfileToggle, handleHomeClick, handleStockClick, handleRequestClick, handleCompanyClick, showProfile, adminId }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userRole");
    localStorage.removeItem("role");
    localStorage.setItem("isLoggedIn", "false");
    // Navigate to login page
    navigate("/login"); 
  };

  return (
    <Navbar bg="light" expand="lg"  className="sticky-top">
      <img src={logo} alt="Logo" style={{ height: "50px", width: "50px", marginLeft: "20px" }} />
      <Navbar.Brand href="#" style={{ marginLeft: "20px" }}>Supervisor Panel</Navbar.Brand>
      
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Button} onClick={handleHomeClick}>
            Home
          </Nav.Link>
          <Nav.Link as={Button} onClick={handleHaveToUpdateClick}>
            Have to update
          </Nav.Link>
          <Nav.Link as={Button} onClick={handleStockClick}>
            Stock
          </Nav.Link>
          <Nav.Link as={Button} onClick={handleRequestClick}>
            Requested Products
          </Nav.Link>
          <Nav.Link as={Button} onClick={handleCompanyClick}>
            Company*
          </Nav.Link>
        </Nav>
        <div className="d-flex align-items-center">
          <Dropdown className="mx-auto mt-2">
            <Dropdown.Toggle variant="primary" id="profile-dropdown" onClick={handleProfileToggle} style={{ marginRight: "20px" }}>
              Profile
            </Dropdown.Toggle>
            <Dropdown.Menu show={showProfile} className="dropdown-menu-end mt-2">
              <Dropdown.ItemText>
                Logged in as: {localStorage.getItem("email")}
                <br />
                Admin ID: {adminId}
              </Dropdown.ItemText>
              <Dropdown.Item onClick={handleLogout} className="bg-danger rounded-5 text-white text-center">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default SupervisorNav;
