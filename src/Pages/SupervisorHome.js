






import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import SupervisorNav from "./supervisor_nav";
import ProductListPage from "./Product_list"; 
import Search from "./search";
import Stock from "./Stock_supervisor";
import Request from "./sup_request";
import CompanyDetails from "./Company";
function SupervisorPage() {
  const [adminId, setAdminId] = useState(null);
  const [email,setEmail]= useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showHaveToUpdate, setShowHaveToUpdate] = useState(false);
  const [home, setHome] = useState(true);
  const [stock, setStock] = useState(false);
  const [request,setRequest] = useState(false);
  const [company,setCompany] = useState(false);

  useEffect(() => {
    const loggedInEmail = localStorage.getItem("email");
    const fetchSupervisorData = async (email) => {
      try {
        const response = await axios.get(
          `https://stock-sever-1.onrender.com/api/supervisor/${email}`
        );
        const { adminId } = response.data;
        setAdminId(adminId);
        setEmail(loggedInEmail)
        
      } catch (error) {
        console.error("Error fetching supervisor data:", error);
      
      } finally {
        // setLoading(false);
      }
    };

    console.log(email)

    fetchSupervisorData(loggedInEmail);
  }, []);

  const handleHaveToUpdateClick = () => {
    setShowHaveToUpdate(true);
    setHome(false);
    setStock(false);
    setRequest(false)
    setCompany(false);
  };

  const handleHomeClick = () => {
    setHome(true);
    setShowHaveToUpdate(false);
    setStock(false);
    setRequest(false)
    setCompany(false);
  };

  const handleProfileToggle = () => {
    setShowProfile((prev) => !prev);
  };

  const handleStockClick = () => {
    setHome(false);
    setShowHaveToUpdate(false);
    setStock(true);
    setRequest(false)
    setCompany(false);
  };
  const handleRequestClick=()=>{
    setHome(false);
    setShowHaveToUpdate(false);
    setStock(false);
    setRequest(true)
    setCompany(false);

  }
  const handleCompanyClick=()=>{
    setHome(false);
    setShowHaveToUpdate(false);
    setStock(false);
    setRequest(false);
    setCompany(true);
    

  }



  return (
    <>
      <SupervisorNav
        handleHaveToUpdateClick={handleHaveToUpdateClick}
        showProfile={showProfile}
        adminId={adminId}
        handleProfileToggle={handleProfileToggle}
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
                  {showHaveToUpdate && <ProductListPage email={adminId} />}
                  {home && <Search />}
                  {stock && <Stock adminId={adminId} email={email} />}
                  {request && <Request adminId={adminId} email={email} />}
                  {company && <CompanyDetails/>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SupervisorPage;
