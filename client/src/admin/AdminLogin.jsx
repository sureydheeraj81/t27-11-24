import React, { useState } from "react";
import AdminHeader from "./layout/AdminHeader";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { adminLogin } from "../services/Apis";

const AdminLogin = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    setInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await adminLogin(inputs);
      if (response.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/admin/dashboard");
      } else {
        toast.error(response.message.message);
      }
    } catch (error) {
      toast.error("Error in admin login page !");
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
          justifyContent: "center",
          marginTop: "70px",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "300px",
            padding: "25px",
            gap: "15px",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          onSubmit={handleSubmit}
        >
          <section
            className=" text-center"
          >
            <i className="fa-solid fa-user-tie fa-2x" style={{color:'#1050a2'}}></i>
            <h3>Admin Login</h3>
          </section>
          <input
            type="text"
            name="username"
            className="form-control"
            value={inputs.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
          <input
            type="password"
            name="password"
            className="form-control"
            value={inputs.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          <button type="submit" className="btn btn-primary mt-1">
            Submit
          </button>
          <section
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "-10px",
              padding: "0px 5px",
            }}
          >
            <Link
              to="/admin/register"
             className="text-decoration-none "
            >
              Register here
            </Link>
            <Link
              to="/admin/forgot"
              className="text-decoration-none"
            >
              Forgot Password
            </Link>
          </section>
        </form>
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

export default AdminLogin;
