






//ADD product




import React, { useState, useEffect } from "react";
import axios from "axios";
import add1 from "../Assets/add.gif";
import add2 from "../Assets/add1.gif";
import add3 from "../Assets/add3.gif";
import add4 from "../Assets/add4.gif";



function ProductForm() {
  const [adminId, setAdminId] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productAdded, setProductAdded] = useState(false);
  const [product, setProduct] = useState({
    image: null,
    productId: "",
    productName: "",
    cost: "",
    quantity:""
    
  });

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

  const handleProductFormClick = () => {
    setShowProductForm(true);
  };

  const handleCancel = () => {
    setShowProductForm(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files.length > 0) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: files[0],
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", product.image);
    formData.append("productId", product.productId);
    formData.append("productName", product.productName);
    formData.append("cost", product.cost);
    formData.append("quantity", product.quantity);

    try {
      const response = await axios.post(
        "https://stock-sever-1.onrender.com/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product added successfully:", response.data);
      handleProductAdded();
      resetFields();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const resetFields = () => {
    setProduct({
      image: null,
      productId: "",
      productName: "",
      cost: "",
      quantity:""
    });
  };

  const handleProductAdded = async () => {
    setProductAdded(true);
    try {
      // await fetchProductList(adminId);
      // await fetchProductsToBeUpdatedCount(adminId);
    } catch (error) {
      console.error("Error refreshing product list:", error);
    }
    setTimeout(() => {
      setProductAdded(false);
      setShowProductForm(false);
    }, 2000);
  };

  return (
    <div className="container mt-2 mx-2 p-5">
    <div className="row">
  <div className="col-lg-3 col-sm-12 mx-5 d-flex justify-content-center align-items-center">
    <img
      src={add1}
      alt="Sup1"
      style={{ height: "auto", width: "130%" }}
    />
  </div>

  <div className="col-md-6 col-sm-12 my-2 p-4 rounded-3">
    <div className="mt-3 text-dark text-start">
      <p>
        As an administrator, you have full control over managing the staff
        members within your organization. The staff management system provides
        you with an organized list of all staff members under your
        administration, allowing you to view, edit, and remove their details as
        needed.
      </p>
      <div>
        <h3>Add Products</h3>
        <div className="d-flex align-items-center">
          <button
            className="btn btn-success"
            onClick={handleProductFormClick}
          >
            ADD +
          </button>
        </div>
      </div>
    </div>
  </div>
</div>



      {showProductForm && (
        <div>
          <h2>Add Product Form</h2>
          <button
            type="button"
            className="btn btn-danger my-4"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <form onSubmit={handleSubmit} className="text-black text-start">
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productId" className="form-label">
                Product ID
              </label>
              <input
                type="text"
                className="form-control"
                id="productId"
                name="productId"
                value={product.productId}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="productName"
                name="productName"
                value={product.productName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cost" className="form-label">
                Cost
              </label>
              <input
                type="number"
                className="form-control"
                id="cost"
                name="cost"
                value={product.cost}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
              Quantity
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          {productAdded && (
            <p className="text-success mt-3">Product added successfully!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductForm;
