const express=require("express")
const router=express.Router()
const {usageUserType,getallusageUserType,getsingleusageUserType,updateusageUserType,deleteUsageUserData}=require('../controllers/usage_user_typeControllers')
// const { Model } = require("sequelize")

router.route("/usageUserType").post(usageUserType)
router.route("/getallusageUserType").get(getallusageUserType)
router.route("/getsingleusageUserType/:id").get(getsingleusageUserType)
router.route("/updateusageUserType/:id").put(updateusageUserType)
router.route("/deleteUsageUserData/:id").delete(deleteUsageUserData)






module.exports=router







