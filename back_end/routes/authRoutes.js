const express = require("express");

const router = express.Router();

const AuthController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");


/* ===========================
   REGISTER
=========================== */

router.post(

    "/register",

    AuthController.register

);



/* ===========================
   LOGIN
=========================== */

router.post(

    "/login",

    AuthController.login

);



/* ===========================
   GET PROFILE
=========================== */

router.get(

    "/profile",

    authMiddleware,

    AuthController.profile

);


module.exports = router;