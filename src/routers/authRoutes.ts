import express from "express";
import authUser from "../controllers/authController";

const router = express.Router();
router.post("/", authUser);

export default router;
