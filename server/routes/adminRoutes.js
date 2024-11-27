const express = require("express");
const router = express.Router()
const controllers = require("../controllers/adminControllers")
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

router.post("/register", upload.single("profilePic"), controllers.register)
router.post("/login", controllers.login)
router.post("/get-admin-info-by-id", authMiddleware, controllers.adminInfo);
router.get("/get-all-admin-info", authMiddleware,controllers.getAllAdminInfo);
router.post("/logout", authMiddleware, controllers.logout);
router.put("/update-status", controllers.updateStatus);
router.put("/update-profile", controllers.updateProfile);
router.delete("/delete-admin-request", controllers.deleteAdminRequest)

module.exports = router; 