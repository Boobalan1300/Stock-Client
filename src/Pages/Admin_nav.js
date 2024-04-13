








import React from "react";
import { Nav, Navbar, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png"

function AdminNav({ handleCreateUserClick, handleBrandListClick, handleStaffListClick, handleHaveToUpdateClick, handleProfileToggle, handleAddProductClick,handleHomeClick,  handleStockClick,handleRequestClick,showProfile,handleCompanyClick, adminId }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userRole");
    localStorage.removeItem("role");
    localStorage.setItem("isLoggedIn", "false");
    navigate("/login"); 
  };

  return (
    <Navbar bg="light" expand="lg" className="sticky-top">
       <img src={logo} alt="Logo"  style={{height:"50px",width:"50px",marginLeft:"20px"}}/>
      <Navbar.Brand href="#" style={{marginLeft:"20px"}} >Admin Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link as={Button} onClick={handleHomeClick}>
            Home
          </Nav.Link>
          <Nav.Link as={Button} onClick={handleCreateUserClick}>
            Create User
          </Nav.Link>
          <Nav.Link as={Button} onClick={handleAddProductClick}>
            Add Products
          </Nav.Link>
          <Nav.Link as={Button} onClick={handleBrandListClick}>
            Brands
          </Nav.Link>
          <Nav.Link as={Button} onClick={handleStaffListClick}>
            Number of staffs
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
        <Dropdown>
          <div className="ms-auto">
            <Dropdown.Toggle
              variant="primary"
              id="profile-dropdown text-center"
              onClick={handleProfileToggle}
              style={{marginRight:"20px"}}
            >
              Profile
            </Dropdown.Toggle>
          </div>

          <Dropdown.Menu show={showProfile} className="dropdown-menu-end">
            <Dropdown.ItemText>
              Logged in as: {localStorage.getItem("email")}
              <br />
              Admin ID: {adminId}
            </Dropdown.ItemText>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AdminNav;
