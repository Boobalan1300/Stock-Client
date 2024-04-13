

import React, { useState, useEffect } from "react";
import axios from "axios";
import staff1 from "../Assets/staff1.gif";
import staff2 from "../Assets/staff2.gif";

const NumberOfStaff = ({ adminId }) => {
  // Receive adminId as a prop

  const [staffCount, setStaffCount] = useState(0);
  const [showStaffDetails, setShowStaffDetails] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [updatedStaffList, setUpdatedStaffList] = useState([]);
  const [editStaffEmail, setEditStaffEmail] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  useEffect(() => {
    axios
      .get(`https://stock-sever-1.onrender.com/api/staff/${adminId}`)
      .then((response) => {
        setStaffCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching staff count:", error);
      });

    axios
      .get(`https://stock-sever-1.onrender.com/api/staff/${adminId}`)
      .then((response) => {
        setStaffList(response.data);
        setUpdatedStaffList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching staff list:", error);
      });
  }, []);

  const handleDeleteStaff = async (email) => {
    try {
      await axios.delete(`https://stock-sever-1.onrender.com/api/delete/${email}`);
      const filteredStaffList = updatedStaffList.filter(
        (staff) => staff.email !== email
      );
      setUpdatedStaffList(filteredStaffList);
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  const handleEditStaff = (email) => {
    setEditStaffEmail(email);
    const staffData = staffList.find((staff) => staff.email === email);
    setUpdatedData({ ...staffData });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://stock-sever-1.onrender.com/api/update/${updatedData.email}`,
        updatedData
      );
      const updatedList = updatedStaffList.map((staff) =>
        staff.email === updatedData.email ? response.data : staff
      );
      setUpdatedStaffList(updatedList);
      setEditStaffEmail(null);

      // Fetch the updated staff list
      const updatedStaffResponse = await axios.get(
        `https://stock-sever-1.onrender.com/api/staff/${adminId}`
      );
      setStaffList(updatedStaffResponse.data);
    } catch (error) {
      console.error("Error updating staff:", error);
    }
  };

  return (
    <div className="container">
      <div className="row ">
        <div className="col-lg-6 col-md-12  d-flex justify-content-start align-items-center">
          <img src={staff2} style={{ height: "300px", width: "400px" }} />
        </div>
        <div className="col-lg-6 col-md-12 my-2 col-sm-12   p-4 rounded-3 d-flex justify-content-between align-items-center">
          <div>
            <h3 className="text-dark">Number of Staffs</h3>
            <div className="d-flex justify-content-evenly align-items-center">
              <span className="mt-3 me-2 badge rounded-pill text-white p-3 bg-primary text-dark">
                {staffCount}
              </span>
              <button
                className="btn btn-success mt-3"
                onClick={() => setShowStaffDetails(!showStaffDetails)}
              >
                {showStaffDetails ? "Hide" : "View"}
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-between ms-5 text-dark text-start">
            <p>
              As an administrator, you have full control over managing the staff
              members within your organization. The staff management system
              provides you with an organized list of all staff members under
              your administration, allowing you to view, edit, and remove their
              details as needed.
            </p>
          </div>
        </div>
      </div>

      {showStaffDetails && (
        <div className="container p-5">
          <div className="row my-5">
            <div className="col-8">
              <h1>Staff List</h1>
            </div>
            <div className="col-4 d-flex justify-content-end">
              <button
                className="btn btn-danger"
                onClick={() => setShowStaffDetails(false)}
              >
                Cancel
              </button>
            </div>
          </div>
          {updatedStaffList.map((staffItem) => (
            <div key={staffItem.staffId} className="col-md-12 mb-3">
              <div className="card">
                <div className="card-body">
                  {editStaffEmail === staffItem.email ? (
                    <div className="card mt-3">
                      <div className="card-body">
                        <h5 className="card-title">Edit Staff</h5>
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label>Name:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={updatedData.name}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Email:</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={updatedData.email}
                              readOnly
                            />
                          </div>
                          <div className="form-group">
                            <label>Password:</label>
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              value={updatedData.password}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Contact:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="contact"
                              value={updatedData.contact}
                              onChange={handleChange}
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary mr-2 mt-2"
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary mx-2 mt-2"
                            onClick={() => setEditStaffEmail(null)}
                          >
                            Cancel
                          </button>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h5 className="card-title">{staffItem.name}</h5>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          Email: {staffItem.email}
                        </li>
                        <li className="list-group-item">
                          Staff ID: {staffItem.staffId}
                        </li>
                        <li className="list-group-item">
                          Contact: {staffItem.contact}
                        </li>
                      </ul>
                      <button
                        className="btn btn-danger mt-2 mr-2"
                        onClick={() => handleDeleteStaff(staffItem.email)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-primary mt-2 mx-2"
                        onClick={() => handleEditStaff(staffItem.email)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NumberOfStaff;
