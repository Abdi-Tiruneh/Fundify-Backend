const express = require("express");
const UserController = require("../controllers/userController");
const { validateUser } = require("../models/user");
const validate = require("../middleware/validateReqBody");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

const router = express.Router();
const userController = new UserController();

router.post(
  "/",
  validate(validateUser),
  userController.createUser.bind(userController)
);
router.get("/", [auth, admin], userController.getUsers.bind(userController));
router.get("/me", auth, userController.getUser.bind(userController));
router.put("/", auth, userController.updateUser.bind(userController));
router.delete("/", auth, userController.deleteUser.bind(userController));

module.exports = router;
