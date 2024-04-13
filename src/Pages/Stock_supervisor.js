


import React, { useState, useEffect } from "react";
import axios from "axios";

function Stock({ adminId, email }) {
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  const [showOutOfStockList, setShowOutOfStockList] = useState(false);
  const [outOfStockList, setOutOfStockList] = useState([]);
  const [requestedProductCode, setRequestedProductCode] = useState("");
  const [neededQuantity, setNeededQuantity] = useState(0);
  const [requestedStatuses, setRequestedStatuses] = useState({});

  const [lessNumberOfStockCount, setLessNumberOfStockCount] = useState(0);
  const [overStockCount, setOverStockCount] = useState(0);
  const [showLessNumberOfStockList, setShowLessNumberOfStockList] = useState(false);
  const [showOverStockList, setShowOverStockList] = useState(false);
  const [lessNumberOfStockList, setLessNumberOfStockList] = useState([]);
  const [overStockList, setOverStockList] = useState([]);

  const fetchOutOfStock = async () => {
    try {
      const response = await axios.get(`https://stock-sever-1.onrender.com/api/outOfStock/${adminId}`);
      const { outOfStockCount, outOfStockList } = response.data;
      setOutOfStockCount(outOfStockCount);
      setOutOfStockList(outOfStockList);
    } catch (error) {
      console.error("Error fetching out of stock data:", error);
    }
  };

  
  useEffect(() => {
    const fetchLessNumberOfStock = async () => {
      try {
        const response = await axios.get(
          `https://stock-sever-1.onrender.com/api/lessNumberOfStock/${adminId}`
        );
        const { lessNumberOfStockCount, lessNumberOfStockList } = response.data;
        setLessNumberOfStockCount(lessNumberOfStockCount);
        setLessNumberOfStockList(lessNumberOfStockList);
      } catch (error) {
        console.error("Error fetching less number of stock data:", error);
      }
    };
    fetchLessNumberOfStock();
  }, [adminId]);

  useEffect(() => {
    const fetchOverStock = async () => {
      try {
        const response = await axios.get(
          `https://stock-sever-1.onrender.com/api/overStock/${adminId}`
        );
        const { overStockCount, overStockList } = response.data;
        setOverStockCount(overStockCount);
        setOverStockList(overStockList);
      } catch (error) {
        console.error("Error fetching over stock data:", error);
      }
    };

    fetchOverStock();
  }, [adminId]);

  const fetchRequestedStatus = async (productCode) => {
    try {
      const response = await axios.get(`https://stock-sever-1.onrender.com/api/requestedQuantity/${productCode}/${email}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching requested status:", error);
      return { requested: false, requestedQuantity: 0 }; // Default values if error occurs
    }
  };

  useEffect(() => {
    fetchOutOfStock();
  }, [adminId]);

  useEffect(() => {
    const fetchRequestedStatuses = async () => {
      const newRequestedStatuses = {};
      for (const product of outOfStockList) {
        const { requested, requestedQuantity } = await fetchRequestedStatus(product.productCode);
        newRequestedStatuses[product.productCode] = {
          requested,
          requestedQuantity,
        };
      }
      setRequestedStatuses(newRequestedStatuses);
    };

    if (showOutOfStockList) {
      fetchRequestedStatuses();
    }
  }, [showOutOfStockList, outOfStockList, email]);


  useEffect(() => {
    const fetchRequestedStatuses = async () => {
      const newRequestedStatuses = {};
      for (const product of lessNumberOfStockList) {
        const { requested, requestedQuantity } = await fetchRequestedStatus(product.productCode);
        newRequestedStatuses[product.productCode] = {
          requested,
          requestedQuantity,
        };
      }
      setRequestedStatuses(newRequestedStatuses);
    };
  
    if (showLessNumberOfStockList) {
      fetchRequestedStatuses();
    }
  }, [showLessNumberOfStockList, lessNumberOfStockList, email]);
  

  const handleViewOutOfStockList = () => {
    setShowOutOfStockList(!showOutOfStockList);
    setShowLessNumberOfStockList(false);
    setShowOverStockList(false);
  };

  const handleViewLessNumberOfStockList = () => {
    setShowLessNumberOfStockList(!showLessNumberOfStockList);
    setShowOutOfStockList(false);
    setShowOverStockList(false);
  };

  const handleViewOverStockList = () => {
    setShowOverStockList(!showOverStockList);
    setShowOutOfStockList(false);
    setShowLessNumberOfStockList(false);
  };

  

  const handleRequestProduct = async (productCode) => {
    setRequestedProductCode((prevProductCode) =>
      prevProductCode === productCode ? "" : productCode
    );

   
    const { requestedQuantity } = await fetchRequestedStatus(productCode);
    setNeededQuantity(requestedQuantity);
  };

  const handleConfirmRequest = async () => {
    try {
      await axios.post(
        `https://stock-sever-1.onrender.com/api/request/${requestedProductCode}`,
        {
          requestedQuantity: neededQuantity,
          email: email,
        }
      );
      setRequestedProductCode("");
      setNeededQuantity(0);
      fetchOutOfStock();
     
      setRequestedStatuses((prevRequestedStatuses) => ({
        ...prevRequestedStatuses,
        [requestedProductCode]: { requested: true, requestedQuantity: neededQuantity },
      }));
      alert("Product requested successfully!");
    } catch (error) {
      console.error("Error requesting product:", error);
      alert("Failed to request product.");
    }
  };
  

  return (
    <>
      <div className="container mt-2 mx-2 p-5">
        {/* <h1 className="text-black mb-4">{email}</h1> */}
        <div className="row text-white text-center justify-content-evenly">
          <div className="col-md-3 mx-2 my-2 col-sm-6 shadow bg-danger p-4 rounded-3 align-items-center">
            <h3>Out of Stock</h3>
            <div className="d-flex justify-content-evenly align-items-center">
              <span className="mt-3 me-2 badge rounded-pill p-3 bg-light text-dark">
                {outOfStockCount}
              </span>
              <button
                className={`btn btn-${showOutOfStockList ? "danger" : "success"} mt-3`}
                onClick={handleViewOutOfStockList}
              >
                {showOutOfStockList ? "Hide" : "View"}
              </button>
            </div>
          </div>
          <div className="col-md-3 col-sm-5 my-2 shadow bg-warning p-4 rounded-3 align-items-center">
            <h3>Less number of Stock</h3>
            <div className="d-flex justify-content-evenly align-items-center">
              <span className="mt-3 me-2 badge rounded-pill p-3 bg-light text-dark">
                {lessNumberOfStockCount}
              </span>
              <button
                className={`btn btn-${showLessNumberOfStockList ? "danger" : "success"} mt-3`}
                onClick={handleViewLessNumberOfStockList}
              >
                {showLessNumberOfStockList ? "Hide" : "View"}
              </button>
            </div>
          </div>

          <div className="col-md-3 mx-2 my-2 col-sm-6 shadow bg-info p-4 rounded-3 align-items-center">
            <h3>Over Stock</h3>
            <div className="d-flex justify-content-evenly align-items-center">
              <span className="mt-3 me-2 badge rounded-pill p-3 bg-light text-dark">
                {overStockCount}
              </span>
              <button
                className={`btn btn-${showOverStockList ? "danger" : "success"} mt-3`}
                onClick={handleViewOverStockList}
              >
                {showOverStockList ? "Hide" : "View"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showOutOfStockList && (
        <div className="container text-dark">
          <h2>Out of Stock Products</h2>
          <div className="table-responsive">
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Product Code</th>
                  <th>Quantity</th>
                  <th>Category</th>
                  <th>Subcategory</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {outOfStockList.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img
                        src={`data:image/png;base64,${product.image}`}
                        alt={product.productName}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </td>
                    <td>{product.productName}</td>
                    <td>{product.productCode}</td>
                    <td>{product.quantity}</td>
                    <td>{product.category}</td>
                    <td>{product.subcategory}</td>
                    <td>
                      <button
                        className={`btn btn-${requestedStatuses[product.productCode]?.requested ? "success" : "primary"}`}
                        onClick={() => handleRequestProduct(product.productCode)}
                      >
                        {requestedStatuses[product.productCode]?.requested ? "Requested" : "Request"}
                      </button>
                      {requestedProductCode === product.productCode && (
                        <div>
                          <input
                            className="my-2"
                            type="number"
                            placeholder="Enter needed quantity"
                            value={neededQuantity}
                            onChange={(e) => setNeededQuantity(parseInt(e.target.value))}
                          />
                          <button
                            className="btn btn-primary my-2 mx-2"
                            onClick={handleConfirmRequest}
                          >
                            Confirm
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

{showLessNumberOfStockList && (
  <div className="container text-dark">
    <h2>Less Number of Stock Products</h2>
    <table className="table mt-3">
      <thead>
        {lessNumberOfStockList.length > 0 && (
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Product Code</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Action</th>
          </tr>
        )}
      </thead>
      <tbody>
        {lessNumberOfStockList.map((product) => (
          <tr key={product._id}>
            <td>
              <img
                src={`data:image/png;base64,${product.image}`}
                alt={product.productName}
                style={{ width: "100px", height: "100px" }}
              />
            </td>
            <td>{product.productName}</td>
            <td>{product.productCode}</td>
            <td>{product.quantity}</td>
            <td>{product.category}</td>
            <td>{product.subcategory}</td>
            <td>
              <button
                className={`btn btn-${requestedStatuses[product.productCode]?.requested ? "success" : "primary"}`}
                onClick={() => handleRequestProduct(product.productCode)}
              >
                {requestedStatuses[product.productCode]?.requested ? "Requested" : "Request"}
              </button>
              {requestedProductCode === product.productCode && (
                <div>
                  <input
                    className="my-2"
                    type="number"
                    placeholder="Enter needed quantity"
                    value={neededQuantity}
                    onChange={(e) => setNeededQuantity(parseInt(e.target.value))}
                  />
                  <button
                    className="btn btn-primary my-2 mx-2"
                    onClick={handleConfirmRequest}
                  >
                    Confirm
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


      {showOverStockList && (
        <div className="container text-dark">
          <h2>Over Stock Products</h2>
          <table className="table mt-3">
            <thead>
              {overStockList.length > 0 && (
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Product Code</th>
                  <th>Quantity</th>
                  <th>Category</th>
                  <th>Subcategory</th>
                </tr>
              )}
            </thead>
            <tbody>
              {overStockList.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={`data:image/png;base64,${product.image}`}
                      alt={product.productName}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.productCode}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category}</td>
                  <td>{product.subcategory}</td>
                  
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Stock;
