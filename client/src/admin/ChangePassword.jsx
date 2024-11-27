import React, { useState } from "react";
import Sidebar from "./layout/Sidebar";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match");
      return;
    }

    // Password strength validation can be added here

    // Simulating an API call for password change
    // Replace with your API call
    const response = true; // Simulated success
    if (response) {
      setSuccess("Password has been successfully changed");
      setError("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setError("Failed to change password. Try again.");
    }
  };

  return (
    <>
      <Sidebar>
        <div className="clear">
          <div className="section_heading">
            <h2 className="title_heading">Update Password</h2>
          </div>
          <form onSubmit={handleSubmit} className="plan-form">
            <div className="form-group">
              <label className="col-form-label" htmlFor="currentPassword">
                Current Password:
              </label>
              <div className="col-md-6">
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-form-label" htmlFor="newPassword">
                New Password:
              </label>
              <div className="col-md-6">
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-form-group" htmlFor="confirmPassword">
                Confirm New Password:
              </label>
              <div className="col-md-6">
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
            </div>
            <input type="submit" value="Submit" className="btn btn-lg btn-primary mt-3 col-md-2" />
          </form>
        </div>
      </Sidebar>
    </>
  );
};

export default ChangePassword;
