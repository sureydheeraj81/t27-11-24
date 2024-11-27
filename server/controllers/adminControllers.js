const admin = require("../models/admin");
const admin_log = require("../models/admin_log");
const url = require("url");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const transporter = nodemailer.createTransport({
  // host:"servey.anand@gmail.com",
  // port: 587,
  // secure: false,
  // auth: {
  //     user: "username",
  //     pass: "password"
  // }
  service: "gmail",
  auth: {
    user: "servey.anand@gmail.com",
    pass: "12345678910",
  },
});

exports.register = async (req, res) => {
  try {
    const isAdmin = await admin.findOne({
      where: {
        [Op.or]: [{ username: req.body.username }, { email: req.body.email }],
      },
    });

    if (isAdmin) {
      return res
        .status(200)
        .send({ message: "Admin profile already exist", success: false });
    }

    const newAdmin = new admin(req.body);

    let salt = await bcrypt.genSalt(10);
    let password = await newAdmin.password;
    let hashedPassword = await bcrypt.hash(password, salt);
    newAdmin.password = hashedPassword;

    await newAdmin.save();

    res.status(201).send({ message: "Registration successful", success: true });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ error: "Username or email already exists." });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const isAdmin = await admin.findOne({
      where: { username: req.body.username },
    });

    if (!isAdmin || isAdmin.status === "Deleted") {
      return res
        .status(404)
        .send({ message: "User doesn't exist", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, isAdmin.password);

    if (
      !isMatch &&
      isAdmin.status !== "Blocked" &&
      isAdmin.failed_attempt <= 5
    ) {
      isAdmin.failed_attempt = isAdmin.failed_attempt + 1;

      if (isAdmin.failed_attempt >= 5) {
        isAdmin.status = "Blocked";
        await isAdmin.save();
      }
      await isAdmin.save();
      return res.status(401).send({
        message: "Please Enter valid username and password!",
        success: false,
      });
    } else if (isAdmin.failed_attempt >= 5 || isAdmin.status === "Blocked") {
      return res.status(403).send({
        message:
          "Your account has been blocked due to unauthorized login attempts!",
        success: false,
      });
    } else if (isAdmin.status === "Pending") {
      return res
        .status(401)
        .send({ message: "Please contact to the super admin", success: false });
    }

    const token = jwt.sign({ id: isAdmin.username }, process.env.SECRET_KEY, {
      expiresIn: "6h",
    });

    const Browser = req.headers["user-agent"];
    const ipaddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    isAdmin.failed_attempt = 0;
    isAdmin.login_attempt = isAdmin.login_attempt + 1;
    const currentDate = new Date();
    isAdmin.last_login = currentDate.toISOString();

    await isAdmin.save();

    let adminlogData = new admin_log(req.body);
    adminlogData.ipaddress = ipaddress;
    adminlogData.browseragent = Browser;
    adminlogData.accessthrough = fullUrl;
    // adminlogData.session_id = get otken data from cookies

    await adminlogData.save();

    res
      .status(200)
      .send({ message: "Login successful", success: true, data: token });
  } catch (error) {
    console.error("Error creating admin:", error);

    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ error: "Username or email already exists." });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.adminInfo = async (req, res) => {
  try {
    const adminData = await admin.findOne({
      where: { username: req.body.username },
    });

    adminData.password = undefined

    if (!adminData) {
      return res
        .status(404)
        .send({ message: "Admin profile doesn't found", success: false });
    }

    res.status(200).send({
      message: "Your profile successfully fetched",
      success: true,
      data: adminData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in getting admin info data",
      success: false,
      error,
    });
  }
};

exports.getAllAdminInfo = async (req, res) => {
  try {
    const alldata = await admin.findAll();

    res.status(200).send({
      message: "All admin data fetched successfully",
      success: true,
      data: alldata,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error in getting all admin data",
      success: false,
      error,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    let isAdmin = await admin.findOne({
      where: { username: req.body.username },
    });

    if (!isAdmin) {
      return res
        .status(404)
        .send({ message: "User doesn't exist", success: false });
    }
    
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error in profile updation", success: false, error });
  }
};

exports.logout = async (req, res) => {
  try {
    const isAdmin = await admin.findOne({
      where: { username: req.body.username },
    });

    if (!isAdmin) {
      return res
        .status(404)
        .send({ message: "Admin doesn't exist", success: true });
    }

    const Browser = req.headers["user-agent"];
    const ipaddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

    let adminlogData = new admin_log(req.body);
    adminlogData.ipaddress = ipaddress;
    adminlogData.browseragent = Browser;
    adminlogData.accessthrough = fullUrl;
    adminlogData.action = "Logout";

    await adminlogData.save();

    res.status(200).send({ message: "Logout successfully", success: true });
  } catch (error) {
    res.status(500).send({ message: "Error in logout", success: false });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    let isAdmin = await admin.findOne({
      where: { username: req.body.username },
    });

    if (!isAdmin) {
      return res
        .status(404)
        .send({ message: "Admin doesn't exist", success: false });
    }

    let { status, usertype, modified_by, designation } = req.body;

    if (status !== undefined ) {
      isAdmin.status = status;
    }
    if (usertype !== undefined ) {
      isAdmin.usertype = usertype;
    }
    if (modified_by !== undefined ) {
      isAdmin.modified_by = modified_by;
    }
    if( designation !== undefined ){
      isAdmin.designation = designation;
    }

    const currentDate = new Date(Date.now());
    isAdmin.date_modified = currentDate;

    await isAdmin.save();

    res
      .status(200)
      .send({ message: "Admin status updated successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error in status updation", success: false, error });
  }
};

exports.deleteAdminRequest = async (req, res) => {
  try {
    let isAdmin = await admin.findOne({
      where: { username: req.body.username },
    });

    if (!isAdmin) {
      return res
        .status(404)
        .send({ message: "Admin doesn't exist", success: false });
    }

    isAdmin.destroy();

    res
      .status(200)
      .send({ message: "Admin request deleted successfully !", success: true });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in request deletion", success: false, error });
  }
};
