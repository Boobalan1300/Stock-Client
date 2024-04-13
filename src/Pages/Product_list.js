








import React, { useState, useEffect } from "react";
import axios from "axios";
import update1 from "../Assets/update1.jpg";
import update2 from "../Assets/update2.jpg";
import update3 from "../Assets/update3.jpg";
import update5 from "../Assets/update5.gif";
import update6 from "../Assets/update6.gif";
import update7 from "../Assets/update7.gif";
import update8 from "../Assets/update9.gif";
import update9 from "../Assets/update10.gif";
const ProductListPage = ({ email }) => {
  const [productList, setProductList] = useState([]);
  const [productListLoading, setProductListLoading] = useState(false);
  const [productsToBeUpdatedCount, setProductsToBeUpdatedCount] = useState(0);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [updatingProductId, setUpdatingProductId] = useState(null);
  const [draftProductList, setDraftProductList] = useState([]);
  const [updateSuccessIndex, setUpdateSuccessIndex] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchProductsToBeUpdatedCount();
    fetchProductList(email);
  }, [email]);

  useEffect(() => {
    if (updateSuccessIndex !== null) {
      setTimeout(() => {
        setUpdateSuccessIndex(null);
        setRefreshKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [updateSuccessIndex]);

  useEffect(() => {
    if (updateSuccessIndex !== null) {
      setTimeout(() => {
        setUpdateSuccessIndex(null);
        setRefreshKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [updateSuccessIndex]);

  const fetchProductsToBeUpdatedCount = async () => {
    try {
      const response = await axios.get(
        `https://stock-sever-1.onrender.com/api/productsToBeUpdated/${email}`
      );
      const { count } = response.data;
      setProductsToBeUpdatedCount(count);
    } catch (error) {
      console.error("Error fetching product count:", error);
    }
  };

  const fetchProductList = async (email) => {
    try {
      setProductListLoading(true);
      const response = await axios.get(
        `https://stock-sever-1.onrender.com/api/products/${email}`
      );
      const products = response.data;
      const productsWithUpdateFlag = products.map((product) => ({
        ...product,
        isUpdating: false,
      }));
      setProductList(productsWithUpdateFlag);
      setDraftProductList(JSON.parse(JSON.stringify(productsWithUpdateFlag)));
    } catch (error) {
      console.error("Error fetching product list:", error);
    } finally {
      setProductListLoading(false);
    }
  };

  const handleToggleProductDetails = () => {
    setShowProductDetails(!showProductDetails);
  };

  const handleUpdateProduct = (productId, index) => {
    setUpdatingProductId(productId);
    const updatedProductList = [...productList];
    updatedProductList[index].isUpdating =
      !updatedProductList[index].isUpdating;
    setProductList(updatedProductList);
  };

  const handleInputChange = (productId, fieldName, value) => {
    setDraftProductList((prevDraftProductList) =>
      prevDraftProductList.map((product) =>
        product.productId === productId
          ? { ...product, [fieldName]: value }
          : product
      )
    );
  };

  const handleSaveUpdate = async (productId, updatedProductData, index) => {
    try {
      // Check if category and subcategory are selected
      if (!updatedProductData.category || !updatedProductData.subcategory) {
        alert("Please select both category and subcategory.");
        return;
      }

      const response = await axios.put(
        `https://stock-sever-1.onrender.com/api/updateProduct/${productId}`,
        updatedProductData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const updatedProduct = response.data;

      setDraftProductList((prevDraftProductList) =>
        prevDraftProductList.map((product, i) =>
          i === index ? updatedProduct : product
        )
      );

      setUpdateSuccessIndex(index);

      setTimeout(() => {
        setProductList((prevProductList) =>
          prevProductList.map((product) =>
            product.productId === updatedProduct.productId
              ? updatedProduct
              : product
          )
        );
        setDraftProductList([]);
        fetchProductList(email);
        fetchProductsToBeUpdatedCount(email);
      }, 2000);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };


  const handleDeleteProduct = async (productCode) => {
    try {
      await axios.delete(`https://stock-sever-1.onrender.com/api/products/${productCode}`);
      setProductList((prevProductList) =>
        prevProductList.filter((product) => product.productCode !== productCode)
      );
      // Update the count of products to be updated
      fetchProductsToBeUpdatedCount();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div key={refreshKey} className="container">
      <div className="row justify-content-evenly">
        {/* <div className="col-lg-3 col-sm-12 d-flex justify-content-center align-items-center">
          <img src={update1}></img>
        </div> */}
        <div className="col-lg-5 col-sm-12 my-3 text-start text-dark d-flex flex-column justify-content-center align-items-center  p-5 rounded-3 mx-md-2 mx-sm-0">
          <h3  className="text-start">Have to Update</h3>
          <p className="text-start">
            The system currently comprises a user interface allowing
            administrators to modify various attributes of products, such as
            category, subcategory, description, brand name, date, product
            status, color, and size.
          </p>
          <div className="d-flex justify-content-evenly align-items-center">
            <span className="mt-3 me-2 badge rounded-pill p-3 bg-primary text-white">
              {productsToBeUpdatedCount}
            </span>
            <button
              className="btn btn-success mt-3"
              onClick={handleToggleProductDetails}
            >
              View
            </button>
          </div>
        </div>
        <div className="col-lg-3 col-sm-12 d-flex  justify-content-evenly align-items-center ms-5">
          <img src={update8} style={{ height: "auto", width: "100%" }}></img>
        </div>
      </div>

      {showProductDetails && (
        <div className="row mt-4">
          <div className="col">
            <h4>List of Products to Update:</h4>
            {productListLoading ? (
              <p>Loading...</p>
            ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product Code</th>
                    <th>Product Name</th>
                    <th>Cost</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map((product, index) => (
                    <tr key={product._id}>
                      <td>{product.productCode}</td>
                      <td>{product.productName}</td>
                      <td>{product.cost}</td>
                      <td>
                        <img
                          src={`data:image/png;base64,${product.image}`}
                          alt={product.productName}
                          style={{ maxWidth: "100px" }}
                        />
                      </td>
                      <td>
                        <button
                          className={`btn ${
                            product.update ? "btn-success" : "btn-primary"
                          }`}
                          onClick={() =>
                            handleUpdateProduct(product.productId, index)
                          }
                        >
                          {product.update
                            ? "Update Completed"
                            : product.isUpdating &&
                              updatingProductId === product.productId
                            ? "Cancel"
                            : "Update"}
                        </button>

                        <button
                          className="btn btn-danger mt-3 ms-2"
                          onClick={() => handleDeleteProduct(product.productCode)}
                        >
                          Delete
                        </button>

                        {product.isUpdating &&
                          updatingProductId === product.productId && (
                            <div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label
                                      htmlFor="category"
                                      className="form-label"
                                    >
                                      Category:
                                    </label>
                                    <select
                                      id="category"
                                      name="category"
                                      value={
                                        draftProductList[index]?.category || ""
                                      }
                                      onChange={(e) =>
                                        handleInputChange(
                                          product.productId,
                                          "category",
                                          e.target.value
                                        )
                                      }
                                      className="form-select"
                                    >
                                      <option value="">Select Category</option>
                                      <option value="Electronic">
                                        Electronic
                                      </option>
                                      <option value="Grocery">Grocery</option>
                                      <option value="Dress">Dress</option>
                                    </select>
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="subcategory"
                                      className="form-label"
                                    >
                                      Subcategory:
                                    </label>
                                    <select
                                      id="subcategory"
                                      name="subcategory"
                                      value={
                                        draftProductList[index]?.subcategory ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        handleInputChange(
                                          product.productId,
                                          "subcategory",
                                          e.target.value
                                        )
                                      }
                                      className="form-select"
                                    >
                                      <option value="">
                                        Select Subcategory
                                      </option>
                                      {draftProductList[index]?.category ===
                                      "Electronic" ? (
                                        <>
                                          <option value="EarPhone">
                                            EarPhone
                                          </option>
                                          <option value="Mobile">Mobile</option>
                                          <option value="Laptop">Laptop</option>
                                          <option value="TV">TV</option>
                                        </>
                                      ) : draftProductList[index]?.category ===
                                        "Grocery" ? (
                                        <>
                                          <option value="Oil">Oil</option>
                                          <option value="Fresh Fruits">
                                            Fresh Fruits
                                          </option>
                                          <option value="Snacks">Snacks</option>
                                          <option value="Grains">Grains</option>
                                          <option value="Beverages">
                                            Beverages
                                          </option>
                                        </>
                                      ) : draftProductList[index]?.category ===
                                        "Dress" ? (
                                        <>
                                          <option value="Mens-wear">
                                            Mens-wear
                                          </option>
                                          <option value="Women-wear">
                                            Women-wear
                                          </option>
                                          <option value="Kids-wear">
                                            Kids-wear
                                          </option>
                                        </>
                                      ) : null}
                                    </select>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label
                                      htmlFor="description"
                                      className="form-label"
                                    >
                                      Description:
                                    </label>
                                    <input
                                      type="text"
                                      id="description"
                                      name="description"
                                      value={
                                        draftProductList[index]?.description ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        handleInputChange(
                                          product.productId,
                                          "description",
                                          e.target.value
                                        )
                                      }
                                      className="form-control"
                                    />
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="brandName"
                                      className="form-label"
                                    >
                                      Brand Name:
                                    </label>
                                    <input
                                      type="text"
                                      id="brandName"
                                      name="brandName"
                                      value={
                                        draftProductList[index]?.brandName || ""
                                      }
                                      F
                                      onChange={(e) =>
                                        handleInputChange(
                                          product.productId,
                                          "brandName",
                                          e.target.value
                                        )
                                      }
                                      className="form-control"
                                    />
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="date"
                                      className="form-label"
                                    >
                                      Date:
                                    </label>
                                    <input
                                      type="date"
                                      id="date"
                                      name="date"
                                      value={
                                        draftProductList[index]?.date || ""
                                      }
                                      onChange={(e) =>
                                        handleInputChange(
                                          product.productId,
                                          "date",
                                          e.target.value
                                        )
                                      }
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="productStatus"
                                      className="form-label"
                                    >
                                      Product Status:
                                    </label>
                                    <select
                                      id="productStatus"
                                      name="productStatus"
                                      value={
                                        draftProductList[index]
                                          ?.productStatus || ""
                                      }
                                      onChange={(e) =>
                                        handleInputChange(
                                          product.productId,
                                          "productStatus",
                                          e.target.value
                                        )
                                      }
                                      className="form-select"
                                    >
                                      <option value="">
                                        Select Product Status
                                      </option>
                                      <option value="Pending">Pending</option>
                                      <option value="Sold">Sold</option>
                                    </select>
                                  </div>
                                </div>
                              </div>

                              <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">
                                  Quantity
                                </label>
                                <input
                                  type="number"
                                  id="quantity"
                                  name="quantity"
                                  placeholder="optional"
                                  value={draftProductList[index]?.quantity || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      product.productId,
                                      "quantity",
                                      e.target.value
                                    )
                                  }
                                  className="form-control"
                                />
                              </div>

                              <div className="mb-3">
                                <label htmlFor="color" className="form-label">
                                  Color:
                                </label>
                                <input
                                  type="text"
                                  id="color"
                                  name="color"
                                  placeholder="optional"
                                  value={draftProductList[index]?.color || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      product.productId,
                                      "color",
                                      e.target.value
                                    )
                                  }
                                  className="form-control"
                                />
                              </div>


                              <div className="mb-3">
                                <label htmlFor="size" className="form-label">
                                  Size:
                                </label>
                                <input
                                  type="text"
                                  id="size"
                                  name="size"
                                  placeholder="optional"
                                  value={draftProductList[index]?.size || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      product.productId,
                                      "size",
                                      e.target.value
                                    )
                                  }
                                  className="form-control"
                                />
                              </div>

                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3 form-check">
                                    <input
                                      type="checkbox"
                                      id="update"
                                      name="update"
                                      checked={
                                        draftProductList[index]?.update || false
                                      }
                                      onChange={(e) =>
                                        handleInputChange(
                                          product.productId,
                                          "update",
                                          e.target.checked
                                        )
                                      }
                                      className="form-check-input"
                                    />
                                    <label
                                      htmlFor="update"
                                      className="form-check-label"
                                      
                                    >
                                      Update
                                    </label>
                                  </div>

                                  <button
                                    className="btn btn-success"
                                    onClick={() =>
                                      handleSaveUpdate(
                                        product.productCode,
                                        {
                                          productName:
                                            draftProductList[index]
                                              ?.productName,
                                          cost: draftProductList[index]?.cost,
                                          category:
                                            draftProductList[index]?.category,
                                          subcategory:
                                            draftProductList[index]
                                              ?.subcategory,
                                          description:
                                            draftProductList[index]
                                              ?.description,
                                          brandName:
                                            draftProductList[index]?.brandName,
                                          date: draftProductList[index]?.date,
                                          productStatus:
                                            draftProductList[index]
                                              ?.productStatus,
                                          productCode:
                                            draftProductList[index]
                                              ?.productCode,
                                          image: draftProductList[index]?.image,
                                          update:
                                            draftProductList[index]?.update,
                                          // Add size and color fields
                                          size: draftProductList[index]?.size,
                                          color: draftProductList[index]?.color,
                                          quantity:draftProductList[index]?.quantity,
                                        },
                                        index
                                      )
                                    }
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                        {updateSuccessIndex === index && (
                          <div>
                            <td colSpan="4">Updated Successfully</td>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
