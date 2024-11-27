import React, { useState, useEffect } from "react";
import "../styles/sidebar.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import toast from "react-hot-toast";
import { getAdminInfo, logoutAdmin } from "../../services/Apis";

const Sidebar = ({ children }) => {
  const [info, setInfo] = useState([]);
  const [activeSubmenu, setActiveSubmenu] = useState({});
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const isSubmenuActive = (paths) => {
    return paths.some((path) => location.pathname.includes(path));
  };

  // Toggle submenu visibility
  const toggleSubmenu = (menu) => {
    setActiveSubmenu((prev) => ({
      [menu]: prev[menu] ? false : true, // Close if the same menu, otherwise open
    }));
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const logouthandle = async () => {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      let response = await logoutAdmin(token);

      if (response.data.success) {
        localStorage.clear();
        toast.success(response.data.message);
        window.location.href = "/admin/login";
      }
    } catch (error) {
      toast.error("Error in logout page!");
    }
  };

  const getAdminInfoId = async () => {
    try {
      if (info.length === 0) {
        let response = await getAdminInfo({
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        });
        if (response.success) {
          setInfo(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("Error in getting admin info");
    }
  };

  useEffect(() => {
    getAdminInfoId();
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Check if it's mobile view
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="row mx-0">
        <div className="col-md-2" style={{ backgroundColor: "#002147" }}>
          <div className="header-nav">
            {isMobileView && <input type="checkbox" id="sub-nav" />}
            <div id="navigation-links">
              <Link
                to="/admin/dashboard"
                className="fs-5 px-2 text-white"
                style={{ textDecoration: "none", marginTop: "8px" }}
              >
                CORS Admin Portal
              </Link>
              {isMobileView && (
                <label htmlFor="sub-nav" className="sub-nav-toggle">
                  <span>&#9776;</span>
                </label>
              )}
            </div>

            <nav id="sub-navigation" className="sidebar mt-1">
              <ul className="nav nav-pills flex-column">
                <li className={`nav-item cus-nav-item`}>
                  <NavLink
                    to="/admin/dashboard"
                    className="nav-link text-white py-3"
                  >
                    <i className="fa-solid fa-chart-line mx-2"></i>
                    <span className="ms-4 d-sm-inline  item-span">
                      Dashboard
                    </span>
                  </NavLink>
                </li>

                <li
                  className={`nav-item cus-nav-item submenu-toggle`}
                  onClick={() => toggleSubmenu("registration")}
                >
                  <Link
                    to="#"
                    className={`nav-link text-white py-3 ${
                      activeSubmenu["registration"] ? "open_menu" : ""
                    }`}
                  >
                    <i className="fa-solid fa-users mx-2"></i>
                    <span className="ms-4 d-sm-inline item-span">
                      Registration List
                    </span>
                    <i className="fa-solid fa-caret-down ms-4 toggle-icon"></i>
                  </Link>

                  {(activeSubmenu["registration"] ||
                    isSubmenuActive([
                      "/admin/user-list",
                      "/admin/user-accepted-list",
                      "/admin/user-rejected-list",
                      "/admin/user-pending-list",
                      "/admin/user-r1-list",
                      "/admin/user-r2-list",
                    ])) && (
                    <ul className="submenu show">
                      <li className={`nav-item cus-nav-item`}>
                        <NavLink
                          to="/admin/user-list"
                          className="nav-link text-white py-3"
                        >
                          <i className="fa-solid fa-list mx-2"></i>
                          <span className="ms-2 d-sm-inline item-span">
                            Total Users List
                          </span>
                        </NavLink>
                      </li>
                      <li className={`nav-item cus-nav-item`}>
                        <NavLink
                          to="/admin/user-accepted-list"
                          className="nav-link text-white py-3"
                        >
                          <i className="fa-solid fa-user-check mx-2"></i>
                          <span className="ms-2 d-sm-inline item-span">
                            Accepted Users List
                          </span>
                        </NavLink>
                      </li>
                      <li className={`nav-item cus-nav-item`}>
                        <NavLink
                          to="/admin/user-rejected-list"
                          className="nav-link text-white py-3"
                        >
                          <i className="fa-solid fa-user-xmark mx-2"></i>
                          <span className="ms-2 d-sm-inline item-span">
                            Rejected Users List
                          </span>
                        </NavLink>
                      </li>
                      <li className={`nav-item cus-nav-item`}>
                        <NavLink
                          to="/admin/user-pending-list"
                          className="nav-link text-white py-3"
                        >
                          <i className="fa-solid fa-user-pen mx-2"></i>
                          <span className="ms-2 d-sm-inline item-span">
                            Pending Users List
                          </span>
                        </NavLink>
                      </li>
                      <li className={`nav-item cus-nav-item`}>
                        <NavLink
                          to="/admin/user-r1-list"
                          className="nav-link text-white py-3"
                        >
                          <i className="fa-solid fa-user-group mx-2"></i>
                          <span className="ms-2 d-sm-inline item-span">
                            Region-1 Users List
                          </span>
                        </NavLink>
                      </li>
                      <li className={`nav-item cus-nav-item`}>
                        <NavLink
                          to="/admin/user-r2-list"
                          className="nav-link text-white py-3"
                        >
                          <i className="fa-solid fa-user-group mx-2"></i>
                          <span className="ms-2 d-sm-inline item-span">
                            Region-2 Users List
                          </span>
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  className={`nav-item cus-nav-item  submenu-toggle`}
                  onClick={() => toggleSubmenu("subscription")}
                >
                  <Link
                    to="#"
                    className={`nav-link text-white py-3 ${
                      activeSubmenu["subscription"] ? "open_menu" : ""
                    }`}
                  >
                    <i className="fa-solid fa-list mx-2 "></i>
                    <span className="ms-4 d-sm-inline item-span">
                      Subscription List
                    </span>
                    <i className="fa-solid fa-caret-down ms-4 toggle-icon"></i>
                  </Link>
                  {(activeSubmenu["subscription"] ||
                    isSubmenuActive([
                      "/admin/subscription-list",
                      "/admin/subscription-accepted-list",
                      "/admin/subscription-rejected-list",
                      "/admin/subscription-verified-list",
                      "/admin/subscription-pending-list",
                      "/admin/subscription-r1-list",
                      "/admin/subscription-r2-list",
                    ])) && (
                    <ul className="submenu show">
                      <li className={`nav-item cus-nav-item`}>
                        <NavLink
                          to="/admin/subscription-list"
                          className="nav-link text-white py-3"
                        >
                          <i className="fa-solid fa-users mx-2 "></i>
                          <span className="ms-2 d-sm-inline  item-span">
                            Total Users List
                          </span>
                        </NavLink>
                      </li>
                      <li className={`nav-item cus-nav-item`}>
                        <NavLink
                          to="/admin/subscription-accepted-list"
                          className="nav-link text-white py-3"
                        >
                          <i className="fa-solid fa-user-check mx-2"></i>
                          <span className="ms-2 d-sm-inline  item-span">
                            Accepted Users List
                          </span>
                        </NavLink>
                      </li>
                      <li className={`nav-item cus-nav-item`}>
                        <NavLink
                          to="/admin/subscription-rejected-list"
                          className="nav-link text-white py-3"
                        >
                          <i className="fa-solid fa-user-xmark mx-2 "></i>
                          <span className="ms-2 d-sm-inline  item-span">
                            Rejected Users List
                          </span>
                        </NavLink>
                      </li>
                      <li className={`nav-item cus-nav-item`}>
                        <NavLink
                          to="/admin/subscription-verified-list"
                          className="nav-link text-white py-3"
                        >
                          <i className="fa-solid fa-user-pen mx-2 "></i>
                          <span className="ms-2 d-sm-inline  item-span">
                            Verified Users List
                          </span>
                        </NavLink>
                      </li>
                      <li className={`nav-item cus-nav-item`}>
                        <NavLink
                          to="/admin/subscription-pending-list"
                          className="nav-link text-white py-3"
                        >
                          <i className="fa-solid fa-user-clock mx-2"></i>
                          <span className="ms-2 d-sm-inline  item-span">
                            Pending Users List
                          </span>
                        </NavLink>
                      </li>
                      <li className={`nav-item cus-nav-item `}>
                        <NavLink
                          to="/admin/subscription-r1-list"
                          className="nav-link text-white py-3"
                        >
                          <i className="fa-solid fa-user-group mx-2 "></i>
                          <span className="ms-2 d-sm-inline  item-span">
                            Region-1 Users List
                          </span>
                        </NavLink>
                      </li>
                      <li className={`nav-item cus-nav-item `}>
                        <NavLink
                          to="/admin/subscription-r2-list"
                          className="nav-link text-white py-3"
                        >
                          <i className="fa-solid fa-user-group mx-2 "></i>
                          <span className="ms-2 d-sm-inline  item-span">
                            Region-2 Users List
                          </span>
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
                <li className={`nav-item cus-nav-item  `}>
                  <NavLink
                    to="/admin/user-transfer"
                    className="nav-link text-white py-3"
                  >
                    <i className="fa-solid fa-arrow-right-arrow-left mx-2"></i>
                    <span className="ms-4 d-sm-inline  item-span">
                      Transfer Region
                    </span>
                  </NavLink>
                </li>
                <li className={`nav-item cus-nav-item `}>
                  <NavLink
                    to="/admin/services"
                    className="nav-link text-white py-3"
                  >
                    <i className="fa-solid fa-gear mx-2 "></i>
                    <span className="ms-4 d-sm-inline  item-span">
                      CORS Services
                    </span>
                  </NavLink>
                </li>
                <li className={`nav-item cus-nav-item`}>
                  <NavLink
                    to="/admin/reg-rejection"
                    className="nav-link text-white py-3"
                  >
                    <i className="fa-solid fa-user-large-slash mx-2 "></i>
                    <span className="ms-4 d-sm-inline  item-span">
                      Regs. Rejection List
                    </span>
                  </NavLink>
                </li>
                <li className={`nav-item cus-nav-item`}>
                  <NavLink
                    to="/admin/sub-rejection"
                    className="nav-link text-white py-3"
                  >
                    <i className="fa-solid fa-ban mx-2 "></i>
                    <span className="ms-4 d-sm-inline  item-span">
                      Subs. Rejection List
                    </span>
                  </NavLink>
                </li>
                <li className={`nav-item cus-nav-item`}>
                  <NavLink
                    to="/admin/user-categories"
                    className="nav-link text-white py-3"
                  >
                    <i className="fa-solid fa-table-list mx-2 "></i>
                    <span className="ms-4 d-sm-inline  item-span">
                      User Categories
                    </span>
                  </NavLink>
                </li>

                <li className={`nav-item cus-nav-item `}>
                  <NavLink
                    to="/admin/usage-details"
                    className="nav-link text-white py-3"
                  >
                    <i className="fa-solid fa-database mx-2 "></i>
                    <span className="ms-4 d-sm-inline  item-span">
                      Usage Details
                    </span>
                  </NavLink>
                </li>
                <li className={`nav-item cus-nav-item `}>
                  <NavLink
                    to="/admin/feedbacks"
                    className="nav-link text-white py-3"
                  >
                    <i className="fa-solid fa-comment mx-2 "></i>
                    <span className="ms-4 d-sm-inline  item-span">
                      Feedback
                    </span>
                  </NavLink>
                </li>
                <li className={`nav-item cus-nav-item`}>
                  <NavLink
                    to="/admin/report"
                    className="nav-link text-white py-3"
                  >
                    <i className="fa-solid fa-file-csv mx-2 "></i>
                    <span className="ms-4 d-sm-inline item-span">
                      Report D2
                    </span>
                  </NavLink>
                </li>
              </ul>
              <div className="user-menu">
                <div className="user-info" onClick={toggleUserDropdown}>
                  <img
                    src={info.profilePic ? info.profilePic : ""}
                    alt="profile"
                    className="rounded-circle"
                  />
                  <span className="mx-1">{info.full_name}</span>
                  <i className="fa-solid fa-caret-down ms-2"></i>
                </div>
                {isUserDropdownOpen && (
                  <ul className="user-dropdown">
                    <li>
                      <NavLink
                        to="/admin/profile"
                        className="nav-link py-1 item-span mx-0"
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/change-password"
                        className="nav-link py-1 item-span mx-0"
                      >
                        Change Password
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={logouthandle}
                        className="nav-link py-1 item-span mx-0 bg-none text-white"
                        style={{
                          width: "100%",
                          textAlign: "left",
                          paddingLeft: "10px",
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </nav>
          </div>
        </div>
        <div className="col-md-10">{children}</div>
      </div>
      <div
        className="d-flex justify-content-center"
        style={{
          backgroundColor: "#002147",
          color: "#fff",
          padding: "5px",
          fontSize: "13px",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <div>
          &copy; {currentYear} CORS | Survey of India | All rights reseved.
        </div>
      </div>
    </>
  );
};

export default Sidebar;
