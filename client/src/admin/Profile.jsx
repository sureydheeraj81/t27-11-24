import React, { useState } from "react";
import "../admin/styles/profile.css";
import Sidebar from "./layout/Sidebar";

const Profile = () => {
  const initialData = {
    name: "Shivam Maurya",
    mobile_no: "7310941087",
    email: "shivam0626.soi@gmail.com",
    username: "shivam",
    usertype: "admin",
    designation: "System Engineer",
    gender: "male",
  };

  const [formData, setFormData] = useState(initialData);
  const [profileImage, setProfileImage] = useState("/images/shivam.png");
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setImageFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {};

    if (imageFile) updatedData.profileImage = imageFile;
    if (formData.name !== initialData.name) updatedData.name = formData.name;
    if (formData.mobile_no !== initialData.mobile_no)
      updatedData.mobile_no = formData.mobile_no;
    if (formData.email !== initialData.email)
      updatedData.email = formData.email;
    if (formData.gender !== initialData.gender)
      updatedData.gender = formData.gender;
    if (formData.designation !== initialData.designation)
      updatedData.designation = formData.designation;

    console.log("Updated data to submit:", updatedData);
    // Send `updatedData` to the backend (you can use an API call here)
  };

  return (
    <>
      <Sidebar>
        <div className="clear">
          <div className="section_heading">
            <h2 className="title_heading">Admin Profile</h2>
          </div>
          <div className="row">
            <div
              className="col-md-6"
              style={{
                border:'1px solid #e1e1e1',
                padding: "20px 30px",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-center">
                <div className="admin-img-div text-center mb-3 position-relative">
                  <img src={profileImage} alt="Admin" className="admin-img" />
                  <label htmlFor="image-upload" className="image-upload-label">
                    <i className="fa-solid fa-camera camera-icon"></i>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="image-upload-input"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <form onSubmit={handleSubmit} className="plan-form">
                {/* Name */}
                <div className="form-group row mt-2">
                  <label className="col-md-2 col-form-label">Name:</label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div className="form-group row mt-2">
                  <label className="col-md-2 col-form-label">Mobile:</label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="text"
                      name="mobile_no"
                      placeholder="Enter Mobile No for OTP"
                      maxLength="10"
                      value={formData.mobile_no}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="form-group row mt-2">
                  <label className="col-md-2 col-form-label">Email:</label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Designation */}
                <div className="form-group row mt-2">
                  <label className="col-md-2 col-form-label">
                    Designation:
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="form-group row mt-2">
                  <label className="col-md-2 col-form-label">Gender:</label>
                  <div className="col-md-10">
                    <select
                      name="gender"
                      className="form-control"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Username (Readonly) */}
                <div className="form-group row mt-2">
                  <label className="col-md-2 col-form-label">Username:</label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="text"
                      name="username"
                      value={formData.username}
                      readOnly
                    />
                  </div>
                </div>

                {/* Usertype (Readonly) */}
                <div className="form-group row mt-2">
                  <label className="col-md-2 col-form-label">Usertype:</label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="text"
                      name="usertype"
                      value={formData.usertype}
                      readOnly
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="mt-4 text-center">
                  <button type="submit" className="btn btn-success">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-6">

            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default Profile;
