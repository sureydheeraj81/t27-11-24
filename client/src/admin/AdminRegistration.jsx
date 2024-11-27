import React, { useState } from "react";
import AdminHeader from "./layout/AdminHeader";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { adminRegister } from "../services/Apis";

const AdminRegistration = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [fileName, setFileName] = useState("");
  const [inputs, setInputs] = useState({
    full_name: "",
    email: "",
    mobile: "",
    gender: "",
    usertype: "",
    username: "",
    password: "",
    designation: "",
    profilePic: null,
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, type, files } = e.target;

    if (type === "file") {
      
      let file = files[0];
      if(file.size/1024 < 100){
        setInputs((prevInputs) => ({
          ...prevInputs,
          [name]: file, // Store the file object
        }));
        setFileName(file.name);
      }else{
        toast.error("File is too large. Please upload a file smaller than 100kb !")
      }
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.mobile.length !== 10) {
      toast.error("Contact number length should be exactly 10 number");
    }else if (
      inputs.full_name === "" ||
      inputs.email === "" ||
      inputs.mobile === "" ||
      inputs.gender === "" ||
      inputs.usertype === "" ||
      inputs.username === "" ||
      inputs.password === "" ||
      inputs.designation === "" ||
      inputs.profilePic === null ||
      inputs.profilePic === undefined
    ) {
      toast.error("All fields are mandatory !");
    } else {
      try {
        let response = await adminRegister(inputs, {
          "Content-Type": "multipart/form-data",
        });
        if (response.data.success) {
          toast.success(response.data.message + "please wait for approval !");
          navigate("/admin/login");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error in admin registration page !");
      }
    }
  };

  return (
    <div>
      <AdminHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <section
           className="text-center"
          >
            <i className="fa-solid fa-user-tie fa-2x" style={{color:'#1050a2'}}></i>
            <h3>Admin Registration</h3>
          </section>
          <form
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gap: "20px",
              marginTop: "15px",
            }}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="full_name"
              className="form-control"
              value={inputs.full_name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            <input
              type="email"
              name="email"
              className="form-control"
              value={inputs.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            <input
              type="text"
              name="mobile"
              className="form-control"
              value={inputs.mobile}
              onChange={handleChange}
              placeholder="Enter your number"
              min="0"
              step="1"
            />
            <input
              type="text"
              name="username"
              className="form-control"
              value={inputs.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
            <input
              type="password"
              name="password"
              className="form-control"
              value={inputs.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <input
              type="text"
              name="designation"
              className="form-control"
              value={inputs.designation}
              onChange={handleChange}
              placeholder="Enter your designation"
              required
            />
            <select
              name="gender"
              className="form-control"
              value={inputs.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <select
              name="usertype"
              className="form-control"
              value={inputs.usertype}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
            <div>
              {fileName === "" ? (
                <div>
                  <label
                    htmlFor="profilePic"
                    className="d-flex align-items-center"
                  >
                    <i
                      className="fa-regular fa-circle-user mr-2"
                      style={{ fontSize: "20px", padding: "10px" }}
                    ></i>
                    Upload Profile Image
                  </label>
                  <input
                    type="file"
                    name="profilePic"
                    onChange={handleChange}
                    required
                    hidden
                    className="form-control-file"
                    id="profilePic"
                    accept=".jpg,.jpeg,.png"
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="profilePic" className="">
                    Uploded
                  </label>
                  <input
                    type="file"
                    name="profilePic"
                    onChange={handleChange}
                    required
                    hidden
                    className="form-control-file"
                    id="profilePic"
                    accept=".jpg,.jpeg,.png"
                  />
                </div>
              )}
            </div>
          </form>
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Submit
            </button>
            <Link
              to="/admin/login"
             className="text-center text-decoration-none mt-2"
            >
              Click here to login
            </Link>
          </section>
        </div>
      </div>
      <div
        className="d-flex justify-content-center"
        style={{
          backgroundColor: "#002147",
          color: "#fff",
          padding: "5px",
          fontSize: "13px",
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0,
        }}
      >
        <div>
          &copy; {currentYear} CORS | Survey of India | All rights reseved.
        </div>
      </div>
    </div>
  );
};

export default AdminRegistration;
