import express from "express";

import {
  createCampaignType,
  getCampaignTypes,
  getCampaignType,
  updateCampaignType,
  deleteCampaignType,
} from "../controllers/campaignTypeController";

import { validateCampaignType } from "../models/campaignType";
import validateUUID from "../middleware/validateUUID";
import validate from "../middleware/validateReqBody";
import admin from "../middleware/admin";
import auth from "../middleware/auth";

const router = express.Router();

router.post(
  "/",
  [auth, admin, validate(validateCampaignType)],
  createCampaignType
);
router.get("/", getCampaignTypes);
router.get("/:id", validateUUID, getCampaignType);
router.put(
  "/:id",
  [auth, admin, validateUUID, validate(validateCampaignType)],
  updateCampaignType
);
router.delete("/:id", [auth, admin, validateUUID], deleteCampaignType);

export default router;
