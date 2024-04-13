
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/style.css";

function Request({ adminId }) {
  const [requests, setRequests] = useState([]);
  const [showTimelineIndex, setShowTimelineIndex] = useState(null);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [selectedRequestIndex, setSelectedRequestIndex] = useState(null);
  const [alertMessage, setAlertMessage] = useState(""); // Define alertMessage state
  const [placeOrderClicked, setPlaceOrderClicked] = useState([]);
  const [timelineVisible, setTimelineVisible] = useState([]); // State to manage timeline visibility
  const [deliveryUpdated, setDeliveryUpdated] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `https://stock-sever-1.onrender.com/api/requests/${adminId}`
        );
        setRequests(response.data.requests);
        // Initialize timeline visibility state based on placeOrder status
        setTimelineVisible(
          response.data.requests.map((request) => request.placeOrder)
        );
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [adminId]);

  useEffect(() => {
    // Update timeline visibility state when requests change
    setTimelineVisible(requests.map((request) => request.placeOrder));
  }, [requests]);

  const handleToggleStatus = async (requestId, field) => {
    try {
      const response = await axios.patch(
        `https://stock-sever-1.onrender.com/api/request/${requestId}`,
        { [field]: true }
      );
      if (response.data.success) {
        // Update the local state after successful update
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === requestId ? { ...request, [field]: true } : request
          )
        );
      }
    } catch (error) {
      console.error(`Error updating ${field} status:`, error);
    }
  };

  const toggleTimeline = (index) => {
    setShowTimelineIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handlePlaceOrder = (index) => {
    setSelectedRequestIndex(index);
    setConfirmOrder(true);
  };

  const confirmPlaceOrder = async () => {
    const selectedRequest = requests[selectedRequestIndex];
    try {
      const response = await axios.post(
        `https://stock-sever-1.onrender.com/api/confirm-order/${selectedRequest._id}`
      );
      if (response.status === 200) {
        // Update local state after confirming order
        setRequests((prevRequests) =>
          prevRequests.map((request, idx) =>
            idx === selectedRequestIndex
              ? { ...selectedRequest, placeOrder: true, showButton: false }
              : request
          )
        );
        setConfirmOrder(false);
        setSelectedRequestIndex(null);
        setAlertMessage("Order confirmed successfully.");

        // Hide the "Place Order" button and toggle confirmation button
        setPlaceOrderClicked((prevClicked) => [
          ...prevClicked,
          selectedRequestIndex,
        ]);

        // Hide the alert message after 2 seconds
        setTimeout(() => {
          setAlertMessage("");
        }, 2000);
      } else {
        setAlertMessage("Order confirmation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error confirming order:", error);
      setAlertMessage(`Error confirming order: ${error.message}`);
    }
  };

  const handleDeleteRequest = async (productCode, requestedEmail) => {
    try {
      const response = await axios.delete(
        `https://stock-sever-1.onrender.com/api/request/delete/${productCode}/${requestedEmail}`
      );
      if (response.status === 200) {
        // Remove the deleted request from the requests state
        setRequests(prevRequests => 
          prevRequests.filter(request => 
            request.productCode !== productCode || request.requestedEmail !== requestedEmail
          )
        );
        setAlertMessage("Request deleted successfully.");
      } else {
        setAlertMessage("Failed to delete request. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      setAlertMessage(`Error deleting request: ${error.message}`);
    }
  };
  

  const formatDate = (dateString) => {
    if (!dateString) return "Not Yet";
    return dateString.split("T")[0]; // Extracts date part (YYYY-MM-DD)
  };

  return (
    <div className="container">
      <h2>Requests Table</h2>
      <div className="table-responsive">
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Product Code</th>
              <th>Email</th>
              <th>Available</th>
              <th>Need Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request._id}>
                <td>
                  <img
                    src={`data:image/png;base64,${request.image}`}
                    alt={request.productName}
                    style={{ width: "100px", height: "100px" }}
                    className="rounded-3"
                  />
                </td>
                <td>{request.productName}</td>
                <td>{request.productCode}</td>
                <td>{request.requestedEmail}</td>
                <td>{request.quantity}</td>
                <td>{request.requestedQuantity}</td>
               
               <td>
  {/* Show Timeline button */}
  {request.placeOrder ? (
    <button
      className={`btn btn-${showTimelineIndex === index ? "danger" : "primary"} my-3 me-2 `}
      onClick={() => toggleTimeline(index)}
      disabled={!request.requested}
    >
      {showTimelineIndex === index ? "Hide Timeline" : "Show Timeline"}
    </button>
  ) : (
    <p>Admin not placed the order</p>
  )}


  {/* Timeline */}
  {showTimelineIndex === index && request.placeOrder && timelineVisible[index] && (
    <section className="py-5">
    <ul className="timeline-with-icons">
      <li className="timeline-item mb-5">
        <span
          className={`timeline-icon ${
            formatDate(request.orderTakenDate) === "Not Yet"
              ? "icon-not-yet"
              : "icon-success"
          }`}
        >
          <i className={`fas fa-rocket fa-sm fa-fw`}></i>
        </span>
        <h5
          className={`${
            formatDate(request.orderTakenDate) === "Not Yet"
              ? "text-secondary"
              : "text-success"
          } fw-bold`}
        >
          Order Taken
        </h5>
        <p className="text-muted mb-2 fw-bold">
          <p
            style={{ whiteSpace: "nowrap" }}
            className="text-success"
          >
            {formatDate(request.orderTakenDate)}
          </p>
        </p>
      </li>
      <li className="timeline-item mb-5">
        <span
          className={`timeline-icon ${
            formatDate(request.orderSendDate) === "Not Yet"
              ? "icon-not-yet"
              : "icon-success"
          }`}
        >
          <i className={`fas fa-rocket fa-sm fa-fw`}></i>
        </span>
        <h5
          className={`${
            formatDate(request.orderSendDate) === "Not Yet"
              ? "text-secondary"
              : "text-success"
          } fw-bold`}
        >
          Product Sent
        </h5>
        <p className="text-muted mb-2 fw-bold">
          <p
            style={{ whiteSpace: "nowrap" }}
            className="text-success"
          >
            {formatDate(request.orderSendDate)}
          </p>
        </p>
      </li>
      <li className="timeline-item mb-5">
        <span
          className={`timeline-icon ${
            formatDate(request.reachedNearBranchDate) ===
            "Not Yet"
              ? "icon-not-yet"
              : "icon-success"
          }`}
        >
          <i className={`fas fa-rocket fa-sm fa-fw`}></i>
        </span>
        <h5
          className={`${
            formatDate(request.reachedNearBranchDate) ===
            "Not Yet"
              ? "text-secondary"
              : "text-success"
          } fw-bold`}
        >
          Reached Near Warehouse
        </h5>
        <p className="text-muted mb-2 fw-bold">
          <p
            style={{ whiteSpace: "nowrap" }}
            className="text-success"
          >
            {formatDate(request.reachedNearBranchDate)}
          </p>
        </p>
      </li>
      <li className="timeline-item mb-5">
        <span
          className={`timeline-icon ${
            formatDate(request.deliveredDate) === "Not Yet"
              ? "icon-not-yet"
              : "icon-success"
          }`}
        >
          <i className={`fas fa-rocket fa-sm fa-fw`}></i>
        </span>
        <h5
          className={`${
            formatDate(request.deliveredDate) === "Not Yet"
              ? "text-secondary"
              : "text-success"
          } fw-bold`}
        >
          Delivered
        </h5>
        <p className="text-muted mb-2 fw-bold">
          <p
            style={{ whiteSpace: "nowrap" }}
            className="text-success"
          >
            {formatDate(request.deliveredDate)}
          </p>
        </p>
      </li>
    </ul>
  </section>
  )}

  {/* Render delete button if delivery date is updated */}
  {formatDate(request.deliveredDate) !== "Not Yet" && (
    <button className="btn btn-danger" onClick={() => handleDeleteRequest(request.productCode, request.requestedEmail)}>
      Delete
    </button>
  )}
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Request;
