







import { useState } from "react";
import axios from "axios";
import logo1 from "../Assets/sup1.jpg";
import logo2 from "../Assets/sup2.jpg";
function StaffForm() {
  const [staff, setStaff] = useState({
    name: "",
    email: "",
    password: "",
    staffId: "",
    adminId: "",
    contact: "",
  });
  const [showCreateUser, setShowCreateUser] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://stock-sever-1.onrender.com/api/staff",
        staff
      );
      console.log("Staff data stored successfully:", response.data);
      // Clear form after successful submission
      setStaff({
        name: "",
        email: "",
        password: "",
        staffId: "",
        adminId: "",
        contact: "",
      });
    } catch (error) {
      console.error("Error storing staff data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateUserCancel = () => {
    setShowCreateUser(false); // Hide the form
    setStaff({
      name: "",
      email: "",
      password: "",
      staffId: "",
      adminId: "",
      contact: "",
    });
  };

  const handleCreateUserClick = () => {
    setShowCreateUser(true);
  };

  return (
    <div className="container mx-2 p-5">
    <div className="row text-dark text-center">
      <div className="col-lg-3 col-sm-12 d-flex justify-content-center align-items-center">
        <img
          src={logo2}
          alt="Sup1"
          style={{ width: "250px", height: "200px" }}
        />
      </div>
      <div className="col-lg-5 col-sm-12 my-4 d-flex flex-column justify-content-center align-items-center shadow bg-info p-5 rounded-3 mx-md-2 mx-sm-0">
        <h3 className="mb-3">Create user</h3>
        <button className="btn btn-success" onClick={handleCreateUserClick}>
          ADD User
        </button>
      </div>
      <div className="col-lg-3 col-sm-12 d-flex justify-content-center align-items-center">
        <img
          src={logo1}
          alt="Sup1"
          style={{ width: "250px", height: "200px" }}
        />
      </div>
    </div>

  

  

        

    {showCreateUser && (
    <div className="row mt-3 text-dark">
         <div className="col-md-9 text-start ">
            <h2>Create User Form</h2>
            <button
              type="button"
              className="btn btn-danger my-3"
              onClick={handleCreateUserCancel}
            >
              Cancel
            </button>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={staff.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={staff.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={staff.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="staffId" className="form-label">
                  Staff ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="staffId"
                  name="staffId"
                  value={staff.staffId}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="adminId" className="form-label">
                  Admin ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="adminId"
                  name="adminId"
                  value={staff.adminId}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contact" className="form-label">
                  Contact
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contact"
                  name="contact"
                  value={staff.contact}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            </div>
    </div>
  )}
</div>
  );
}

export default StaffForm;
