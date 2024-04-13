














import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BrandList from "./BrandList";
import axios from "axios";
import StaffForm from "./StaffForm";
import AdminNav from "./Admin_nav";
import NumberOfStaff from "./NumberOfStaff"; 
import ProductListPage from "./Product_list";
import ProductForm from "./ProductForm";
import Search from "./search"; 
import Stock from "./Stock_admin";
import RequestPage from "./request";
import CompanyDetails from "./Company";

function AdminHome() {
  const [adminId, setAdminId] = useState(null);
  const [showBrandDetails, setShowBrandDetails] = useState(false);
  const [showStaffForm, setShowStaffForm] = useState(false);
  const [showBrandList, setShowBrandList] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNumberOfStaff, setShowNumberOfStaff] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [showStaffDetails, setShowStaffDetails] = useState(false);
  const [showHaveToUpdate, setShowHaveToUpdate] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [home, setHome] = useState(true); 
  const [stock, setStock] = useState(false);
  const [request,setRequest] = useState(false);
  const [company,setCompany] = useState(false);

  useEffect(() => {
    const loggedInEmail = localStorage.getItem("email");
    const fetchAdminId = async () => {
      try {
        const response = await axios.get(
          `https://stock-sever-1.onrender.com/api/adminId/${loggedInEmail}`
        );
        setAdminId(response.data.adminId);
      } catch (error) {
        console.error("Error fetching adminId:", error);
      }
    };

    fetchAdminId();
  }, []);

  const handleCreateUserClick = () => {
    setShowStaffForm(true);
    setShowBrandList(false);
    setShowNumberOfStaff(false);
    setShowProductForm(false);
    setShowHaveToUpdate(false);
    setHome(false);
    setStock(false);
    setRequest(false);
    setCompany(false);
  };

  const handleBrandListClick = () => {
    setShowBrandList(true);
    setShowStaffForm(false);
    setShowNumberOfStaff(false);
    setShowProductForm(false);
    setShowHaveToUpdate(false);
    setHome(false);
    setStock(false);
    setRequest(false);
    setCompany(false);
  };

  const handleStaffListClick = () => {
    setShowNumberOfStaff(true);
    setShowBrandList(false);
    setShowStaffForm(false);
    setShowProductForm(false);
    setShowHaveToUpdate(false);
    setHome(false);
    setStock(false);
    setRequest(false);
    setCompany(false);
  };


  const handleHaveToUpdateClick = () => {
    setShowBrandList(false);
    setShowStaffForm(false);
    setShowNumberOfStaff(false);
    setShowBrandDetails(false);
    setShowStaffDetails(false);
    setShowProductForm(false);
    setShowHaveToUpdate(true);
    setHome(false);
    setStock(false);
    setRequest(false);
    setCompany(false);
  };

  const handleAddProductClick = () => {
    setShowBrandList(false);
    setShowStaffForm(false);
    setShowNumberOfStaff(false);
    setShowBrandDetails(false);
    setShowStaffDetails(false);
    setShowProductForm(true);
    setHome(false);
    setStock(false);
    setRequest(false);
    setCompany(false);
  };

  const handleHomeClick = () => {
    setHome(true);
    setShowBrandList(false);
    setShowStaffForm(false);
    setShowNumberOfStaff(false);
    setShowBrandDetails(false);
    setShowStaffDetails(false);
    setShowProductForm(false);
    setShowHaveToUpdate(false);
    setStock(false);
    setRequest(false);
    setCompany(false);
  };

  const handleProfileToggle = () => {
    setShowProfile((prev) => !prev);
  };

  const handleStockClick = () => {
    setHome(false);
    setShowBrandList(false);
    setShowStaffForm(false);
    setShowNumberOfStaff(false);
    setShowBrandDetails(false);
    setShowStaffDetails(false);
    setShowProductForm(false);
    setShowHaveToUpdate(false);
    setRequest(false);
    setCompany(false);
    setStock(true);
  };

  const handleRequestClick=()=>{
    setRequest(true);
    setHome(false);
    setShowBrandList(false);
    setShowStaffForm(false);
    setShowNumberOfStaff(false);
    setShowBrandDetails(false);
    setShowStaffDetails(false);
    setShowProductForm(false);
    setShowHaveToUpdate(false);
    setStock(false);
    setCompany(false);
  }

  const handleCompanyClick=()=>{
    setRequest(false);
    setHome(false);
    setShowBrandList(false);
    setShowStaffForm(false);
    setShowNumberOfStaff(false);
    setShowBrandDetails(false);
    setShowStaffDetails(false);
    setShowProductForm(false);
    setShowHaveToUpdate(false);
    setStock(false);
    setCompany(true);
    

  }


  return (
    <>
      <AdminNav
        handleCreateUserClick={handleCreateUserClick}
        handleBrandListClick={handleBrandListClick}
        handleStaffListClick={handleStaffListClick}
        handleHaveToUpdateClick={handleHaveToUpdateClick}
        showProfile={showProfile}
        adminId={adminId}
        handleProfileToggle={handleProfileToggle}
        handleAddProductClick={handleAddProductClick} 
        handleHomeClick={handleHomeClick}
        handleStockClick={handleStockClick} 
        handleRequestClick={handleRequestClick}
        handleCompanyClick={handleCompanyClick}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="container gradient-background">
              <div className="container mt-2 mx-2 p-5">
                <div className="row text-white text-center justify-content-evenly">
                  {showBrandList && (
                    <BrandList
                      showBrandDetails={showBrandDetails}
                      setShowBrandDetails={setShowBrandDetails}
                    />
                  )}
                  {showStaffForm && <StaffForm />}
                  {showNumberOfStaff && <NumberOfStaff adminId={adminId} />}
                  {showHaveToUpdate && <ProductListPage email={adminId} />}
                  {showProductForm && <ProductForm />}
                  {home && <Search />}
                  {stock && <Stock  adminId={adminId}  />}
                  {request && <RequestPage adminId={adminId} />}
                  {company && <CompanyDetails adminId={adminId} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
