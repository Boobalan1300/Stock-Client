

import React, { useState, useEffect } from "react";
import axios from "axios";
import brand1 from "../Assets/brand1.gif";
import brand2 from "../Assets/brand2.gif";
import brand3 from "../Assets/brand3.jpg";
function BrandList({ showBrandDetails, setShowBrandDetails }) {
  const [adminId, setAdminId] = useState(null);
  const [distinctBrands, setDistinctBrands] = useState([]);
  const [brandCount, setBrandCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loggedInEmail = localStorage.getItem("email");
    fetchAdminData(loggedInEmail);
  }, []);

  useEffect(() => {
    if (adminId) {
      fetchBrandCount(adminId);
      if (showBrandDetails) {
        fetchDistinctBrands(adminId);
      }
    }
  }, [adminId, showBrandDetails]);

  const fetchAdminData = async (email) => {
    try {
      const response = await axios.get(
        `https://stock-sever-1.onrender.com/api/adminId/${email}`
      );
      const { adminId } = response.data;
      setAdminId(adminId);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setError("Error fetching admin data");
    }
  };

  const fetchBrandCount = async (adminId) => {
    try {
      const response = await axios.get(
        `https://stock-sever-1.onrender.com/api/brands/${adminId}`, {
          headers: {
            "Authorization": `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            "Content-Type": "application/json",
          }
        }
      );
      const { brandCount } = response.data;
      setBrandCount(brandCount);
    } catch (error) {
      console.error("Error fetching brand count:", error);
      setError("Error fetching brand count");
    }
  };
  

  const fetchDistinctBrands = async (adminId) => {
    try {
      const response = await axios.get(
        `https://stock-sever-1.onrender.com/api/distinctBrands/${adminId}`
      );
      const { distinctBrands } = response.data;
      setDistinctBrands(distinctBrands);
    } catch (error) {
      console.error("Error fetching distinct brands:", error);
      setError("Error fetching distinct brands");
    }
  };

  const handleToggleBrandDetails = () => {
    
    setShowBrandDetails((prev) => !prev);
  };

  return (
    <>
      <div className="col-lg-3 col-sm-12 d-flex justify-content-center align-items-center">
        <img
          src={brand1}
          alt="Sup1"
          style={{ height: "auto", width: "130%" }}
        />
      </div>

    
      <div className="col-md-6 col-sm-12 my-2 p-4 rounded-3">
        <div className="mt-3 text-dark text-start">
          <p>
            As an administrator, you have full control over managing the staff
            members within your organization. The staff management system
            provides you with an organized list of all staff members under your
            administration, allowing you to view, edit, and remove their details
            as needed.
          </p>
          <div>
            <h3>Number Of Brands</h3>
            <div className="d-flex align-items-center">
              <span className="mt-3 me-2 badge rounded-pill p-3 bg-primary text-white">
                {brandCount}
              </span>
              <button
                className="btn btn-success mt-3"
                onClick={handleToggleBrandDetails}
              >
                {showBrandDetails ? "Hide" : "View"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showBrandDetails && (
        <div className="container d-flex justify-content-center align-items-start min-vh-100">
          <div
            className="p-4  rounded shadow bg-warning"
            style={{ minWidth: "300px" }}
          >
            <h2 className="fs-5 text-success text-center mb-4">
              Distinct Brands
            </h2>
            <ul className="list-group">
              {distinctBrands.map((brand, index) => (
                <li key={index} className="list-group-item mb-3 shadow">
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default BrandList;
