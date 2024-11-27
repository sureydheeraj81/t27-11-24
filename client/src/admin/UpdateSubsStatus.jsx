import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import {
  getRejectionReason,
  getSingleUser,
  UpdateSubscriptionPaymentFinalStatus,
} from "../services/Apis";
import toast from "react-hot-toast";

const UpdateSubsStatus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const subsData = location.state;
  const [rejReason, setRejReason] = useState([]);
  const [inputs, setInputs] = useState({
    ack_no: location.state.ack_no,
    name: location.state.name,
    mobile: location.state.mobile,
    id: location.state.id,
    email: location.state.email,
    status: "",
    address: location.state.address,
    cors_plan: location.state.cors_plan,
    date_created: location.state.date_created,
    GST_name: location.state.GST_name,
    GST_number: location.state.GST_number,
    gst_receiptAmt: location.state.gst_receiptAmt,
    gst_receiptNo: location.state.gst_receiptNo,
    approved_by: location.state.approved_by,
    approved_date: location.state.approved_date,
    path_sub_pdf: location.state.path_sub_pdf,
    payment_verification_date: location.state.payment_verification_date,
    payment_verified_by: location.state.payment_verified_by,
    region_name: location.state.region_name,
    rejection_reason: "",
    state_id: location.state.state_id,
    sub_gst: location.state.sub_gst,
    subs_receiptAmt: location.state.subs_receiptAmt,
    subs_receiptNo: location.state.subs_receiptNo,
    subscription_charge: location.state.subscription_charge,
    user_reg_id: location.state.user_reg_id,
    rejection_reason_data: "",
  });
  const [data, setData] = useState([]);

  const date = new Date(location.state.date_created);
  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
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
      if (inputs.status === "Verified" || inputs.status === "Approved") {
        inputs.rejection_reason = "";
        let response = await UpdateSubscriptionPaymentFinalStatus(inputs, {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        });
        if (response.success) {
          toast.success(response.data.message);
          navigate("/admin/subscription-list");
        } else {
          toast.error(response.data.message);
        }
      } else {
        let description = rejReason.filter((elem) =>
          elem.sno == inputs.rejection_reason ? elem : ""
        );
        inputs.rejection_reason_data = description[0].description;

        let response = await UpdateSubscriptionPaymentFinalStatus(inputs, {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        });
        if (response.success) {
          toast.success(response.data.message);
          navigate("/admin/subscription-list");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("Error in user status updation");
    }
  };
  const handleDiscard = async () => {
    toast.success("Changes discarded");
    navigate("/admin/subscription-list");
  };
  const getUserInfo = async () => {
    try {
      let response = await getSingleUser(location.state.user_reg_id);
      if (response.success) {
        setData(response.data.Data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {}
  };
  const getRejectedReason = async () => {
    try {
      let response = await getRejectionReason();
      if (response.success) {
        setRejReason(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error in status updation page");
    }
  };

  const downloadInvoice = () => {
    console.log("Invoice")
  }
  const downloadChallan = () => {
    console.log("Challan")
  }

  useEffect(() => {
    if (location.state) {
      setInputs({
        ack_no: location.state.ack_no,
        name: location.state.name,
        mobile: location.state.mobile,
        id: location.state.id,
        email: location.state.email,
        status: location.state.status,
        address: location.state.address,
        cors_plan: location.state.cors_plan,
        date_created: location.state.date_created,
        GST_name: location.state.GST_name,
        GST_number: location.state.GST_number,
        gst_receiptAmt: location.state.gst_receiptAmt,
        gst_receiptNo: location.state.gst_receiptNo,
        approved_by: location.state.approved_by,
        approved_date: location.state.approved_date,
        path_sub_pdf: location.state.path_sub_pdf,
        payment_verification_date: location.state.payment_verification_date,
        payment_verified_by: location.state.payment_verified_by,
        region_name: location.state.region_name,
        rejection_reason: location.state.rejection_reason,
        state_id: location.state.state_id,
        sub_gst: location.state.sub_gst,
        subs_receiptAmt: location.state.subs_receiptAmt,
        subs_receiptNo: location.state.subs_receiptNo,
        subscription_charge: location.state.subscription_charge,
        user_reg_id: location.state.user_reg_id,
      });
    }
  }, [location.state]);

  useEffect(() => {
    getUserInfo();
    getRejectedReason();
  }, []);
  return (
    <Sidebar>
      <div className="clear">
        <div className="section_heading">
          <h2 className="title_heading">Approve User</h2>
        </div>
        <div>
          <div className="box_header">
            <div style={{ padding: "5px 0px" }}>
              <i className="fa-solid fa-pen-to-square"></i>&nbsp; User Details
            </div>
          </div>
          <div>
            <div className="box_body">
              {/* BEGIN FORM */}
              <form
                action="#"
                id="form_page"
                onSubmit={handleSubmit}
                className="form-horizontal"
                encType="multipart/form-data"
                //   style={{"margin-left: 30px; margin-right: 30px;"}}
              >
                <div>
                  {subsData.status === "Approved" ? (
                    <h2 style={{ color: "green" }}>Approved</h2>
                  ) : subsData.status === "Pending" ? (
                    <h1 style={{ color: "orange" }}>Pending</h1>
                  ) : subsData.status === "Verified" ? (
                    <h1 style={{ color: "blue" }}>Verified</h1>
                  ) : subsData.status === "Rejected" ? (
                    <h1 style={{ color: "red" }}>Rejected</h1>
                  ) : null}
                </div>
                <hr />

                <div className="form-group row mt-2">
                  <label htmlFor="name" className="control-label col-md-2">
                    Name:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <label htmlFor="name" className="control-label col-md-2 mt-1">
                    User ID:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="username"
                      value={data.username}
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-group row mt-2">
                  <label
                    htmlFor="mobile_no"
                    className="control-label col-md-2 mt-1"
                  >
                    Mobile No:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="mobile_no"
                      value={data.mobile_no}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <label
                    htmlFor="email"
                    className="control-label col-md-2 mt-1"
                  >
                    Email ID:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>
                <hr />

                <div>
                  <h3>Subscription Details:</h3>
                </div>

                <div className="form-group row mt-2">
                  <label
                    htmlFor="ack_no"
                    className="control-label col-md-2 mt-1"
                  >
                    Ack. No:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="ack_no"
                      value={location.state.ack_no}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <label
                    htmlFor="date_created"
                    className="control-label col-md-2 mt-1"
                  >
                    Date of Purchase:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="ack_no"
                      value={formattedDate}
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-group row mt-2">
                  <label
                    htmlFor="subscription_charge"
                    className="control-label col-md-2 mt-1"
                  >
                    Subscription Amount:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="subscription_charge"
                      value={location.state.subscription_charge}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <label
                    htmlFor="gst_receiptAmt"
                    className="control-label col-md-2"
                  >
                    GST Amount:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="gst_receiptAmt"
                      value={location.state.gst_receiptAmt}
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-group row mt-2">
                  <label
                    htmlFor="subs_receiptAmt"
                    className="control-label col-md-2 mt-2"
                  >
                    Subscription Paid:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="subs_receiptAmt"
                      value={location.state.subs_receiptAmt}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <label
                    htmlFor="sub_gst"
                    className="control-label col-md-2 mt-1"
                  >
                    GST Paid:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="sub_gst"
                      value={location.state.sub_gst || "0.00"}
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-group row mt-2">
                  <label
                    htmlFor="subs_receiptNo"
                    className="control-label col-md-2 mt-1"
                  >
                    Subscription Receipt:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="subs_receiptNo"
                      value={location.state.subs_receiptNo}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <label
                    htmlFor="gst_receiptNo"
                    className="control-label col-md-2 mt-1"
                  >
                    GST Receipt:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="gst_receiptNo"
                      value={location.state.gst_receiptNo || 0}
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group row mt-2">
                  <label
                    htmlFor="sub_gst"
                    className="control-label col-md-2 mt-1"
                  >
                    Subscription PDF:
                  </label>
                  <div className="col-md-4 mt-1">
                    {location?.state?.path_sub_pdf ? (
                      <a
                        href={`/${location.state.path_sub_pdf}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        View Subscription PDF
                      </a>
                    ) : (
                      <p>No PDF available</p>
                    )}
                  </div>
                  <label
                    htmlFor="sub_gst"
                    className="control-label col-md-2 mt-1"
                  >
                    GST PDF:
                  </label>
                  <div className="col-md-4 mt-1">
                    {location?.state?.sub_gst ? (
                      <a
                        href={`/${location.state.sub_gst}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View GST PDF
                      </a>
                    ) : (
                      <p>No PDF available</p>
                    )}
                  </div>
                </div>
                <hr />
                <h3>Plan Details</h3>
                <div className="table-div-admin">
                  <table className=" data_table">
                    <thead>
                      <tr>
                        <th>Plan ID</th>
                        <th>Subscription Charge</th>
                        <th>GST Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-light">
                        <td>{subsData.cors_plan}</td>
                        <td>{subsData.subscription_charge}</td>
                        <td>{subsData.gst_receiptAmt}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Total Amount</td>
                        <td style={{ fontWeight: "bold" }}>
                          {subsData.subscription_charge}
                        </td>
                        <td style={{ fontWeight: "bold" }}>
                          {subsData.gst_receiptAmt}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="form-group row mt-2">
                  <label
                    htmlFor="status"
                    className="control-label col-md-2 mt-1"
                  >
                    Update Status:<span className="red">*</span>
                  </label>
                  <div className="col-md-4">
                    {subsData.status === "Pending" ? (
                      <select
                        className="form-control app_status"
                        name="status"
                        value={inputs.status}
                        onChange={handleChange}
                        size="1"
                        required
                      >
                        <option value="">{subsData.status}</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    ) : subsData.status === "Verified" ? (
                      <select
                        className="form-control app_status"
                        name="status"
                        value={inputs.status}
                        onChange={handleChange}
                        size="1"
                        required
                      >
                        <option value="">{subsData.status}</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    ) : subsData.status === "Approved" ? (
                      <select
                        className="form-control app_status"
                        name="status"
                        value={inputs.status}
                        onChange={handleChange}
                        size="1"
                        required
                      >
                        <option value="">{subsData.status}</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    ) : subsData.status === "Rejected" ? (
                      <input name="status" value={inputs.status} placeholder="rejeted" className="form-control app_status" readOnly />
                    ): ""}
                  </div>
                </div>
                {inputs.status === "Rejected" ? (
                  <div className="form-group row mt-2">
                    <label
                      htmlFor="rejection_reason"
                      className="control-label col-md-2 mt-1"
                    >
                      Reason :<span className="red">*</span>
                    </label>
                    <div className="col-md-4">
                      <select
                        className="form-control app_status"
                        name="rejection_reason"
                        value={inputs.rejection_reason}
                        onChange={handleChange}
                        size="1"
                        required
                      >
                        {rejReason.map((elem, idx) => {
                          return (
                            <option value={elem.sno} key={idx}>
                              {elem.description}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="form-actions mt-4">
                  <button
                    type="submit"
                    name="submit"
                    className="btn btn-success col-md-2 me-3"
                  >
                    SUBMIT
                  </button>
                  <button
                    type="button"
                    onClick={handleDiscard}
                    className="btn btn-info col-md-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              {
                inputs.status==="Approved" ? <div>
                <hr/>
                <h3>Invoice and Challan Details:</h3>
                <div>
                  <button onClick={downloadInvoice}>Download Invoice</button>
                  <button onClick={downloadChallan}>Download Challan</button>
                </div>
              </div> :""
              }
              <br />
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default UpdateSubsStatus;
