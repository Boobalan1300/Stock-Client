








// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function CompanyDetails() {
//   const [companies, setCompanies] = useState([]);
//   const [showOrderTakenDateInput, setShowOrderTakenDateInput] = useState("");
//   const [showOrderSendDateInput, setShowOrderSendDateInput] = useState("");
//   const [showReachedNearBranchDateInput, setShowReachedNearBranchDateInput] =
//     useState("");
//   const [showDeliveredDateInput, setShowDeliveredDateInput] = useState("");
//   const [orderTakenDate, setOrderTakenDate] = useState("");
//   const [orderSendDate, setOrderSendDate] = useState("");
//   const [reachedNearBranchDate, setReachedNearBranchDate] = useState("");
//   const [deliveredDate, setDeliveredDate] = useState("");

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const fetchCompanies = () => {
//     axios
//       .get("https://stock-sever-1.onrender.com/api/companies")
//       .then((response) => {
//         setCompanies(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching company data:", error);
//       });
//   };

//   const handleConfirmOrderTaken = async (requestCode, statusToUpdate, date) => {
//     try {
//       await axios.put(
//         `https://stock-sever-1.onrender.com/api/update-${statusToUpdate}/${requestCode}`,
//         { orderTakenDate: date }
//       );
//       fetchCompanies();
//       setShowOrderTakenDateInput("");
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   const handleConfirmOrderSend = async (requestCode, statusToUpdate, date) => {
//     try {
//       await axios.put(
//         `https://stock-sever-1.onrender.com/api/update-${statusToUpdate}/${requestCode}`,
//         { orderSendDate: date }
//       );
//       fetchCompanies();
//       setShowOrderSendDateInput("");
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   const handleConfirmReachedBranch = async (
//     requestCode,
//     statusToUpdate,
//     date
//   ) => {
//     try {
//       await axios.put(
//         `https://stock-sever-1.onrender.com/api/update-${statusToUpdate}/${requestCode}`,
//         { reachedNearBranchDate: date }
//       );
//       fetchCompanies();
//       setShowReachedNearBranchDateInput("");
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   const handleConfirmDelivered = async (requestCode, statusToUpdate, date) => {
//     try {
//       await axios.put(
//         `https://stock-sever-1.onrender.com/api/update-${statusToUpdate}/${requestCode}`,
//         { deliveredDate: date }
//       );
//       fetchCompanies();
//       setShowDeliveredDateInput("");
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   const toggleDateInput = (requestCode, setShowDateInput) => {
//     setShowDateInput((prevState) =>
//       prevState === requestCode ? "" : requestCode
//     );
//   };

//   const handleCancelOrder = (setShowDateInput) => {
//     setShowDateInput("");
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "-";
//     return dateString.split("T")[0]; 
//   };

//   return (
//     <div>
//       <h1 className="text-black">Company Page</h1>
//       <div className="table-responsive">
//         < className="table">
//           <thead>
//             <tr>
//               <th>Product image</th>
//               <th>Product Name</th>
//               <th>Request Code</th>
//               <th>Requested Quantity</th>
//               <th>Requested Email</th>
//               <th>Order Taken</th>
//               <th>Order Taken Date</th>
//               <th>Order Send</th>
//               <th>Order Send Date</th>
//               <th>Reached Near Branch</th>
//               <th>Reached Near Branch Date</th>
//               <th>Delivered</th>
//               <th>Delivered Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {companies.map((company) => (
//               <tr key={company._id}>
//                 <td>
//                   <img
//                     src={`data:image/png;base64,${company.image}`}
//                     alt={company.productName}
//                     style={{ width: "100px", height: "100px" }}
//                     className="rounded-3"
//                   />
//                 </td>

//                 <td>{company.productName}</td>
//                 <td>{company.RequestCode}</td>
//                 <td>{company.requestedQuantity}</td>
//                 <td>{company.requestedEmail}</td>

//                 <td>
//                   {company.orderTaken ? (
//                     <button className="btn btn-success">Order Taken</button>
//                   ) : (
//                     <div>
//                       <button
//                         className="btn btn-primary my-3"
//                         onClick={() =>
//                           toggleDateInput(
//                             company.RequestCode,
//                             setShowOrderTakenDateInput
//                           )
//                         }
//                       >
//                         Take Order
//                       </button>
//                       {showOrderTakenDateInput === company.RequestCode && (
//                         <div>
//                           <input
//                             type="date"
//                             value={orderTakenDate}
//                             onChange={(e) => setOrderTakenDate(e.target.value)}
//                           />
//                           <button
//                             className="btn btn-primary  my-3"
//                             onClick={() =>
//                               handleConfirmOrderTaken(
//                                 company.RequestCode,
//                                 "order-taken",
//                                 orderTakenDate
//                               )
//                             }
//                           >
//                             Confirm
//                           </button>
//                           <button
//                             className="btn btn-secondary  my-3 mx-2"
//                             onClick={() =>
//                               handleCancelOrder(setShowOrderTakenDateInput)
//                             }
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </td>
//                 {/* <td>{company.orderTakenDate}</td> */}
//                 {/* <td>{formatDate(company.orderTakenDate)}</td> */}
//                 <td style={{ whiteSpace: "nowrap" }}>
//                   {formatDate(company.orderTakenDate)}
//                 </td>

//                 <td>
//                   {company.orderSend ? (
//                     <button className="btn btn-success">Order Sent</button>
//                   ) : (
//                     <div>
//                       <button
//                         className="btn btn-primary   my-3"
//                         onClick={() =>
//                           toggleDateInput(
//                             company.RequestCode,
//                             setShowOrderSendDateInput
//                           )
//                         }
//                       >
//                         Place Order
//                       </button>
//                       {showOrderSendDateInput === company.RequestCode && (
//                         <div>
//                           <input
//                             type="date"
//                             value={orderSendDate}
//                             onChange={(e) => setOrderSendDate(e.target.value)}
//                           />
//                           <button
//                             className="btn btn-primary   my-3"
//                             onClick={() =>
//                               handleConfirmOrderSend(
//                                 company.RequestCode,
//                                 "order-send",
//                                 orderSendDate
//                               )
//                             }
//                           >
//                             Confirm
//                           </button>
//                           <button
//                             className="btn btn-secondary  my-3 mx-2"
//                             onClick={() =>
//                               handleCancelOrder(setShowOrderSendDateInput)
//                             }
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </td>
//                 {/* <td>{company.orderSendDate}</td> */}
//                 <td style={{ whiteSpace: "nowrap" }}>
//                   {formatDate(company.orderSendDate)}
//                 </td>

//                 <td>
//                   {company.reachedNearBranch ? (
//                     <button className="btn btn-success">
//                       Reached Near Branch
//                     </button>
//                   ) : (
//                     <div>
//                       <button
//                         className="btn btn-primary  my-3"
//                         onClick={() =>
//                           toggleDateInput(
//                             company.RequestCode,
//                             setShowReachedNearBranchDateInput
//                           )
//                         }
//                       >
//                         Reach Near Branch
//                       </button>
//                       {showReachedNearBranchDateInput ===
//                         company.RequestCode && (
//                         <div>
//                           <input
//                             type="date"
//                             value={reachedNearBranchDate}
//                             onChange={(e) =>
//                               setReachedNearBranchDate(e.target.value)
//                             }
//                           />
//                           <button
//                             className="btn btn-primary   my-3 "
//                             onClick={() =>
//                               handleConfirmReachedBranch(
//                                 company.RequestCode,
//                                 "reached-branch",
//                                 reachedNearBranchDate
//                               )
//                             }
//                           >
//                             Confirm
//                           </button>
//                           <button
//                             className="btn btn-secondary  my-3 mx-2"
//                             onClick={() =>
//                               handleCancelOrder(
//                                 setShowReachedNearBranchDateInput
//                               )
//                             }
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </td>
//                 {/* <td>{company.reachedNearBranchDate}</td> */}
//                 <td style={{ whiteSpace: "nowrap" }}>
//                   {formatDate(company.reachedNearBranchDate)}
//                 </td>

//                 <td>
//                   {company.delivered ? (
//                     <button className="btn btn-success">Delivered</button>
//                   ) : (
//                     <div>
//                       <button
//                         className="btn btn-primary   my-3"
//                         onClick={() =>
//                           toggleDateInput(
//                             company.RequestCode,
//                             setShowDeliveredDateInput
//                           )
//                         }
//                       >
//                         Deliver
//                       </button>
//                       {showDeliveredDateInput === company.RequestCode && (
//                         <div>
//                           <input
//                             type="date"
//                             value={deliveredDate}
//                             onChange={(e) => setDeliveredDate(e.target.value)}
//                           />
//                           <button
//                             className="btn btn-primary  my-3 "
//                             onClick={() =>
//                               handleConfirmDelivered(
//                                 company.RequestCode,
//                                 "delivered",
//                                 deliveredDate
//                               )
//                             }
//                           >
//                             Confirm
//                           </button>
//                           <button
//                             className="btn btn-secondary  my-3 mx-2"
//                             onClick={() =>
//                               handleCancelOrder(setShowDeliveredDateInput)
//                             }
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </td>
//                 {/* <td>{company.deliveredDate}</td> */}
//                 <td style={{ whiteSpace: "nowrap" }}>
//                   {formatDate(company.deliveredDate)}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default CompanyDetails;

















import React, { useState, useEffect } from "react";
import axios from "axios";

function CompanyDetails() {
  const [companies, setCompanies] = useState([]);
  const [showOrderTakenDateInput, setShowOrderTakenDateInput] = useState("");
  const [showOrderSendDateInput, setShowOrderSendDateInput] = useState("");
  const [showReachedNearBranchDateInput, setShowReachedNearBranchDateInput] =
    useState("");
  const [showDeliveredDateInput, setShowDeliveredDateInput] = useState("");
  const [orderTakenDate, setOrderTakenDate] = useState("");
  const [orderSendDate, setOrderSendDate] = useState("");
  const [reachedNearBranchDate, setReachedNearBranchDate] = useState("");
  const [deliveredDate, setDeliveredDate] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = () => {
    axios
      .get("https://stock-sever-1.onrender.com/api/companies")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching company data:", error);
      });
  };

  const handleConfirmOrderTaken = async (requestCode, statusToUpdate, date) => {
    try {
      await axios.put(
        `https://stock-sever-1.onrender.com/api/update-${statusToUpdate}/${requestCode}`,
        { orderTakenDate: date }
      );
      fetchCompanies();
      setShowOrderTakenDateInput("");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleConfirmOrderSend = async (requestCode, statusToUpdate, date) => {
    try {
      await axios.put(
        `https://stock-sever-1.onrender.com/api/update-${statusToUpdate}/${requestCode}`,
        { orderSendDate: date }
      );
      fetchCompanies();
      setShowOrderSendDateInput("");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleConfirmReachedBranch = async (
    requestCode,
    statusToUpdate,
    date
  ) => {
    try {
      await axios.put(
        `https://stock-sever-1.onrender.com/api/update-${statusToUpdate}/${requestCode}`,
        { reachedNearBranchDate: date }
      );
      fetchCompanies();
      setShowReachedNearBranchDateInput("");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleConfirmDelivered = async (requestCode, statusToUpdate, date) => {
    try {
      await axios.put(
        `https://stock-sever-1.onrender.com/api/update-${statusToUpdate}/${requestCode}`,
        { deliveredDate: date }
      );
      fetchCompanies();
      setShowDeliveredDateInput("");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const toggleDateInput = (requestCode, setShowDateInput) => {
    setShowDateInput((prevState) =>
      prevState === requestCode ? "" : requestCode
    );
  };

  const handleCancelOrder = (setShowDateInput) => {
    setShowDateInput("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return dateString.split("T")[0]; 
  };

  return (
    <div>
      <h1 className="text-success fs-1 text-center" style={{fontWeight:"bold"}}>Company Page</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Product image</th>
              <th>Product Name</th>
              <th>Request Code</th>
              <th>Requested Quantity</th>
              <th>Requested Email</th>
              <th>Order Taken</th>
              <th>Order Taken Date</th>
              <th>Order Send</th>
              <th>Order Send Date</th>
              <th>Reached Near Branch</th>
              <th>Reached Near Branch Date</th>
              <th>Delivered</th>
              <th>Delivered Date</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company._id}>
                <td>
                  <img
                    src={`data:image/png;base64,${company.image}`}
                    alt={company.productName}
                    style={{ width: "100px", height: "100px" }}
                    className="rounded-3"
                  />
                </td>

                <td>{company.productName}</td>
                <td>{company.RequestCode}</td>
                <td>{company.requestedQuantity}</td>
                <td>{company.requestedEmail}</td>

                <td>
  {/* Order Taken */}
  {company.orderTaken ? (
    <button className="btn btn-success" disabled>Order Taken</button>
  ) : (
    <div>
      <button
        className="btn btn-primary my-3"
        onClick={() =>
          toggleDateInput(
            company.RequestCode,
            setShowOrderTakenDateInput
          )
        }
      >
        Take Order
      </button>
      {showOrderTakenDateInput === company.RequestCode && (
        <div>
          <input
            type="date"
            value={orderTakenDate}
            onChange={(e) => setOrderTakenDate(e.target.value)}
          />
          <button
            className="btn btn-primary  my-3"
            onClick={() =>
              handleConfirmOrderTaken(
                company.RequestCode,
                "order-taken",
                orderTakenDate
              )
            }
          >
            Confirm
          </button>
          <button
            className="btn btn-secondary  my-3 mx-2"
            onClick={() =>
              handleCancelOrder(setShowOrderTakenDateInput)
            }
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )}
</td>
<td style={{ whiteSpace: "nowrap" }}>
  {formatDate(company.orderTakenDate)}
</td>

<td>
  {/* Order Sent */}
  {company.orderTaken && !company.orderSend ? (
    <div>
      <button
        className="btn btn-primary my-3"
        onClick={() =>
          toggleDateInput(
            company.RequestCode,
            setShowOrderSendDateInput
          )
        }
      >
        Place Order
      </button>
      {showOrderSendDateInput === company.RequestCode && (
        <div>
          <input
            type="date"
            value={orderSendDate}
            onChange={(e) => setOrderSendDate(e.target.value)}
          />
          <button
            className="btn btn-primary  my-3"
            onClick={() =>
              handleConfirmOrderSend(
                company.RequestCode,
                "order-send",
                orderSendDate
              )
            }
          >
            Confirm
          </button>
          <button
            className="btn btn-secondary  my-3 mx-2"
            onClick={() =>
              handleCancelOrder(setShowOrderSendDateInput)
            }
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  ) : company.orderSend ? (
    <button className="btn btn-success" disabled>Order Sent</button>
  ) : (
    <p>Please take the order first</p>
  )}
</td>
<td style={{ whiteSpace: "nowrap" }}>
  {formatDate(company.orderSendDate)}
</td>


<td>
  {/* Reached Near Branch */}
  {company.orderSend && !company.reachedNearBranch ? (
    <div>
      <button
        className="btn btn-primary my-3"
        onClick={() =>
          toggleDateInput(
            company.RequestCode,
            setShowReachedNearBranchDateInput
          )
        }
      >
        Reach Near Branch
      </button>
      {showReachedNearBranchDateInput ===
        company.RequestCode && (
        <div>
          <input
            type="date"
            value={reachedNearBranchDate}
            onChange={(e) =>
              setReachedNearBranchDate(e.target.value)
            }
          />
          <button
            className="btn btn-primary   my-3 "
            onClick={() =>
              handleConfirmReachedBranch(
                company.RequestCode,
                "reached-branch",
                reachedNearBranchDate
              )
            }
          >
            Confirm
          </button>
          <button
            className="btn btn-secondary  my-3 mx-2"
            onClick={() =>
              handleCancelOrder(
                setShowReachedNearBranchDateInput
              )
            }
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  ) : company.reachedNearBranch ? (
    <button className="btn btn-success" disabled>Reached Near Branch</button>
  ) : (
    <p>Please send the order first</p>
  )}
</td>
<td style={{ whiteSpace: "nowrap" }}>
  {formatDate(company.reachedNearBranchDate)}
</td>

<td>
  {/* Delivered */}
  {company.reachedNearBranch && !company.delivered ? (
    <div>
      <button
        className="btn btn-primary my-3"
        onClick={() =>
          toggleDateInput(
            company.RequestCode,
            setShowDeliveredDateInput
          )
        }
      >
        Deliver
      </button>
      {showDeliveredDateInput === company.RequestCode && (
        <div>
          <input
            type="date"
            value={deliveredDate}
            onChange={(e) => setDeliveredDate(e.target.value)}
          />
          <button
            className="btn btn-primary  my-3 "
            onClick={() =>
              handleConfirmDelivered(
                company.RequestCode,
                "delivered",
                deliveredDate
              )
            }
          >
            Confirm
          </button>
          <button
            className="btn btn-secondary  my-3 mx-2"
            onClick={() =>
              handleCancelOrder(setShowDeliveredDateInput)
            }
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  ) : company.delivered ? (
    <button className="btn btn-success" disabled>Delivered</button>
  ) : (
    <p>Please reach near branch first</p>
  )}
</td>
<td style={{ whiteSpace: "nowrap" }}>
  {formatDate(company.deliveredDate)}
</td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompanyDetails;