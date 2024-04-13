
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import product1 from "../Assets/product1.png";
import product2 from "../Assets/product2.png";

import product4 from "../Assets/product4.gif";
import product5 from "../Assets/product5.gif";
import add1 from "../Assets/add.gif"
function Search() {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [products, setProducts] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(true);

  const [subcategories, setSubcategories] = useState([]);

  const [showSelectedCategoryResults, setShowSelectedCategoryResults] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");

 
  useEffect(() => {
    console.log(process.env.REACT_APP_SECRET_KEY);
  }, []);


  useEffect(() => {
    const loggedInEmail = localStorage.getItem("email");
    const fetchAdminId = async () => {
      try {
        const response = await axios.get(
          `https://stock-sever-1.onrender.com/api/adminId/${loggedInEmail}`
        );
        setAdminId(response.data.adminId);
      } catch  { try {
        const response = await axios.get(
          `https://stock-sever-1.onrender.com/api/supervisor/${loggedInEmail}`
        );
        const { adminId } = response.data;
        setAdminId(adminId);
       
      } catch (error) {
        console.error("Error fetching supervisor data:", error);
      }
    }
    };


    fetchAdminId();
  }, []);

  useEffect(() => {
    if (category) {
      const fetchSubcategories = async () => {
        try {
          const response = await axios.get(
            `https://stock-sever-1.onrender.com/api/subcategories/${category}`
          );
          setSubcategories(response.data);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      };

      fetchSubcategories();
    }
  }, [category]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const url = `https://stock-sever-1.onrender.com/api/searchProducts/${adminId}`;
      const response = await axios.get(url);
      setProducts(response.data);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminId && showResults) {
      handleSearch();
    }
  }, [adminId, showResults]);

  const handleCategoryCancel = () => {
    setCategory("");
    setSubcategory("");
  };

  const handleCategoryChange = async (e) => {
    setCategory(e.target.value);
    setSubcategory("");

    switch (e.target.value) {
      case "Electronic":
        setSubcategories(["EarPhone", "Mobile", "Laptop", "TV"]);
        break;
      case "Grocery":
        setSubcategories([
          "Oil",
          "Fresh Fruits",
          "Snacks",
          "Grains",
          "Beverages",
        ]);
        break;
      case "Dress":
        setSubcategories(["Mens-wear", "Women-wear", "Kids-wear"]);
        break;
      default:
        setSubcategories([]);
        break;
    }

    try {
      setLoading(true);
      let url = `https://stock-sever-1.onrender.com/api/searchProductsByCategory/${adminId}/${e.target.value}`;

      if (subcategory) {
        url += `/${subcategory}`;
      }

      const response = await axios.get(url);
      setProducts(response.data);
      setShowResults(false);
      setShowSelectedCategoryResults(true);
    } catch (error) {
      console.error("Error searching products by category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubcategoryChange = async (e) => {
    setSubcategory(e.target.value);

    try {
      setLoading(true);
      let url = `https://stock-sever-1.onrender.com/api/searchProductsByCategory/${adminId}/${category}`;

      if (e.target.value) {
        url += `/${e.target.value}`;
      }

      const response = await axios.get(url);
      setProducts(response.data);
      setShowResults(false);
      setShowSelectedCategoryResults(true);
    } catch (error) {
      console.error("Error searching products by category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      handleSearch();
    } else {
      const filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setProducts(filtered);
    }
  };

  const handleBack = () => {
    setShowSelectedCategoryResults(false);
    handleSearch();
    setShowResults(true);
    setCategory("");
    setSubcategory("");
  };

  return (
    <div className="container">
      <div className="">
        {/* {loading ? (
          <p>Loading...</p>
        ) :  */}
        {showResults ? (
          <div>
            <div>
            {/* <img src={product4} class="img-fluid" alt="..."/> */}
              <h1 className="text-success my-3">All Products Result</h1>
              {/* <h1 className="text-success">{process.env.REACT_APP_SECRET_KEY}</h1>     */}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by product name..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
              </div>


              
              <div className="mt-3">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="category" className="form-label">
                      Select Category:
                    </label>
                    <select
                      id="category"
                      className="form-select"
                      value={category}
                      onChange={handleCategoryChange}
                    >
                      <option value="">Select Category</option>
                      <option value="Electronic">Electronic</option>
                      <option value="Grocery">Grocery</option>
                      <option value="Dress">Dress</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="subcategory" className="form-label">
                      Select Subcategory:
                    </label>
                    <select
                      id="subcategory"
                      className="form-select"
                      value={subcategory}
                      onChange={handleSubcategoryChange}
                    >
                      <option value="">Select Subcategory</option>
                      {subcategories.map((subcat) => (
                        <option key={subcat} value={subcat}>
                          {subcat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 mb-3 d-flex align-items-end">
                    <button
                      className="btn btn-danger"
                      onClick={handleCategoryCancel}
                    >
                      clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive">
            <table className="table mt-3">
              <thead>
                {products.length === 0 && (
                  <tr>
                    <th colSpan="7">
                      <img
                        src={product5}
                        alt="Loading..."
                        style={{ height: "200px", width: "300px" }}
                      />
                    </th>
                  </tr>
                )}
                {products.length > 0 && (
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th>Subcategory</th>
                    <th>Cost</th>
                    <th>Color</th>
                    <th>Size</th>
                  </tr>
                )}
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img
                        src={`data:image/png;base64,${product.image}`}
                        alt={product.productName}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </td>
                    <td>{product.productName}</td>
                    <td>{product.quantity}</td>
                    <td>{product.category}</td>
                    <td>{product.subcategory}</td>
                    <td>{product.cost}</td>
                    <td>{product.color}</td>
                    <td>{product.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        ) : (null
        )}
      </div>

      {showSelectedCategoryResults && (
        <div className="mt-5">

          <div>
            <h1 className="text-success my-3">All Products Result</h1>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by product name..."
                aria-label="Search"
                aria-describedby="basic-addon2"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="category" className="form-label">
                Select Category:
              </label>
              <select
                id="category"
                className="form-select"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                <option value="Electronic">Electronic</option>
                <option value="Grocery">Grocery</option>
                <option value="Dress">Dress</option>
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="subcategory" className="form-label">
                Select Subcategory:
              </label>
              <select
                id="subcategory"
                className="form-select"
                value={subcategory}
                onChange={handleSubcategoryChange}
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4 mb-3 d-flex align-items-end">
              <button className="btn btn-danger" onClick={handleCategoryCancel}>
                Clear
              </button>
              <button onClick={handleBack} className="btn btn-primary mx-2">
                All products
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-success my-5">
              Products for Category: {category}
            </h2>
          </div>

          <table className="table mt-3 my-3">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={`data:image/png;base64,${product.image}`}
                      alt={product.productName}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.category}</td>
                  <td>{product.subcategory}</td>
                  <td>{product.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Search;
