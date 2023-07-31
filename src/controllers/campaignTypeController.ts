import { Request, Response, NextFunction } from "express";
import {
  createCampaignTypeService,
  deleteCampaignTypeService,
  getCampaignTypeService,
  getCampaignTypesService,
  updateCampaignTypeService,
} from "../services/campaignTypeService";

export async function createCampaignType(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { name, description } = req.body;
  const campaignType = await createCampaignTypeService(name, description);
  res.status(201).json(campaignType);
}

export async function getCampaignTypes(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const campaignTypes = await getCampaignTypesService();
  return res.json(campaignTypes);
}

export async function getCampaignType(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;
  const campaignType = await getCampaignTypeService(id);
  return res.json(campaignType);
}

export async function updateCampaignType(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;
  const { name, description } = req.body;
  const updatedData = { name, description };
  const updatedCampaignType = await updateCampaignTypeService(id, updatedData);
  return res.json(updatedCampaignType);
}

export async function deleteCampaignType(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;
  await deleteCampaignTypeService(id);
  res.sendStatus(204);
}
