const express = require("express");
const AuthController = require("../controllers/authController");

const router = express.Router();
const authController = new AuthController();

router.post("/", authController.authUser.bind(authController));

module.exports = router;
