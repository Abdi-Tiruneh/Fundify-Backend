import express from "express";
import uploadMiddleware from "../middleware/multer";
import {
  createCampaign,
  getCampaing,
  getCampaings,
  getCampaingByCampaignType,
  updateCampaign,
  uploadCampaignImage,
} from "../controllers/campaignController";

import { validateCampaign } from "../models/campaign";
import validate from "../middleware/validateReqBody";
import validateUUID from "../middleware/validateUUID";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/", [auth, validate(validateCampaign)], createCampaign);
router.put("/:id", [auth, validateUUID], updateCampaign);
router.put(
  "/image/:id",
  [auth, validateUUID, uploadMiddleware],
  uploadCampaignImage
);
router.get("/", getCampaings);
router.get("/:id", validateUUID, getCampaing);
router.get("/type/:id", validateUUID, getCampaingByCampaignType);

export default router;
