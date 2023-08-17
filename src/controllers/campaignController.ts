import { Request, Response, NextFunction } from "express";

import {
  createCampaignService,
  getCampaignService,
  getCampaignsService,
  getCampaignByTypeService,
  updateCampaignService,
  uploadCampaignImageService,
} from "../services/campaignService";

export async function createCampaign(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  //@ts-ignore
  const { userId } = req.user;
  const campaign = await createCampaignService({
    ...req.body,
    userId,
  });
  return res.status(201).json(campaign);
}

export async function updateCampaign(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;
  const updatedCampaign = await updateCampaignService(id, req.body);
  return res.json(updatedCampaign);
}

export async function uploadCampaignImage(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;
  if (!req.file) return res.status(400).json({ error: "No image provided" });

  const updatedCampaign = await uploadCampaignImageService(id, req.file);
  return res.json(updatedCampaign);
}

export async function getCampaings(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const campaigns = await getCampaignsService();
  return res.json(campaigns);
}

export async function getCampaing(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;
  const campaign = await getCampaignService(id);
  return res.json(campaign);
}

export async function getCampaingByCampaignType(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;
  const campaigns = await getCampaignByTypeService(id);
  return res.json(campaigns);
}
