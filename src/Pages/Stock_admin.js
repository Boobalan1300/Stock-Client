






import React, { useState, useEffect } from "react";
import axios from "axios";

function Stock({ adminId }) {
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  const [lessNumberOfStockCount, setLessNumberOfStockCount] = useState(0);
  const [overStockCount, setOverStockCount] = useState(0);
  const [showOutOfStockList, setShowOutOfStockList] = useState(false);
  const [showLessNumberOfStockList, setShowLessNumberOfStockList] =
    useState(false);
  const [showOverStockList, setShowOverStockList] = useState(false);
  const [outOfStockList, setOutOfStockList] = useState([]);
  const [lessNumberOfStockList, setLessNumberOfStockList] = useState([]);
  const [overStockList, setOverStockList] = useState([]);

  useEffect(() => {
    const fetchOutOfStock = async () => {
      try {
        const response = await axios.get(
          `https://stock-sever-1.onrender.com/api/outOfStock/${adminId}`
        );
        const { outOfStockCount, outOfStockList } = response.data;
        setOutOfStockCount(outOfStockCount);
        setOutOfStockList(outOfStockList);
      } catch (error) {
        console.error("Error fetching out of stock data:", error);
      }
    };
    fetchOutOfStock();
  }, [adminId]);

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

  const product5 = "path/to/product5/image"; // Define product5 image source

  return (
    <>
      <div className="container mt-2 mx-2 p-5">
        <div className="row text-white text-center justify-content-evenly">
          <div className="col-md-3 mx-2 my-2 col-sm-6 shadow bg-danger p-4 rounded-3 align-items-center">
            <h3>Out of Stock</h3>
            <div className="d-flex justify-content-evenly align-items-center">
              <span className="mt-3 me-2 badge rounded-pill p-3 bg-light text-dark">
                {outOfStockCount}
              </span>
              <button
                className={`btn btn-${
                  showOutOfStockList ? "danger" : "success"
                } mt-3`}
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
                className={`btn btn-${
                  showLessNumberOfStockList ? "danger" : "success"
                } mt-3`}
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
                className={`btn btn-${
                  showOverStockList ? "danger" : "success"
                } mt-3`}
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
          <table className="table mt-3">
            <thead>
              {outOfStockList.length === 0 && (
                <tr>
                  <th colSpan="6">
                    <img
                      src={product5}
                      alt="Loading..."
                      style={{ height: "200px", width: "300px" }}
                    />
                  </th>
                </tr>
              )}
              {outOfStockList.length > 0 && (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showLessNumberOfStockList && (
        <div className="container text-dark">
          <h2>Less Number of Stock Products</h2>
          <table className="table mt-3">
            <thead>
              {lessNumberOfStockList.length === 0 && (
                <tr>
                  <th colSpan="6">
                    <img
                      src={product5}
                      alt="Loading..."
                      style={{ height: "200px", width: "300px" }}
                    />
                  </th>
                </tr>
              )}
              {lessNumberOfStockList.length > 0 && (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showOverStockList && (
        <div className="container text-dark">
          <h2>Over Stock Products</h2>
          <div className="table-responsive">
          <table className="table mt-3">
            <thead>
              {overStockList.length === 0 && (
                <tr>
                  <th colSpan="6">
                    <img
                      src={product5}
                      alt="Loading..."
                      style={{ height: "200px", width: "300px" }}
                    />
                  </th>
                </tr>
              )}
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
        </div>
      )}
    </>
  );
}

export default Stock;
