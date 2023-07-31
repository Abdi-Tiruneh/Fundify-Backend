import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

import { validateUser } from "../models/user";
import validate from "../middleware/validateReqBody";
import admin from "../middleware/admin";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/", validate(validateUser), createUser);
router.get("/", [auth, admin], getUsers);
router.get("/me", auth, getUser);
router.put("/", auth, updateUser);
router.delete("/", auth, deleteUser);

export default router;
