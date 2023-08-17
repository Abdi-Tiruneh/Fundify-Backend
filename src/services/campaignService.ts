import { Campaign } from "../models/campaign";
import { getCampaignTypeService } from "./campaignTypeService";
import { ResourceNotFoundError } from "../errors/CustomErrors";
import uploadImage from "../utils/uploadFile";

interface CreateCampaignInput {
  title: string;
  shortDescription: string;
  city: string;
  goalAmount: number;
  fundingType: "DONATION" | "EQUITY" | "REWARD";
  campaignDuration: number;
  campaignTypeId: string;
  userId: string;
}

type UpdatedData = Partial<
  Omit<CreateCampaignInput, "campaignTypeId" | "userId">
> & {
  campaignImage?: string | null;
  description?: string | null;
};

export async function createCampaignService({
  title,
  shortDescription,
  city,
  goalAmount,
  fundingType,
  campaignDuration,
  campaignTypeId,
  userId,
}: CreateCampaignInput) {
  await getCampaignTypeService(campaignTypeId);

  const campaign = await Campaign.create({
    title,
    shortDescription,
    city,
    goalAmount,
    fundingType,
    campaignDuration,
    campaignTypeId,
    userId,
    campaignStage: "INITIAL",
    enabled: false,
  });

  return campaign;
}

export async function uploadCampaignImageService(
  id: string,
  file: Express.Multer.File
) {
  const campaign = await getCampaignService(id);
  const campaignImage = await uploadImage(file);
  return await campaign.update({ campaignImage });
}

export async function updateCampaignService(
  id: string,
  updatedData: UpdatedData
) {
  const campaign = await getCampaignService(id);
  return await campaign.update(updatedData);
}

export async function getCampaignService(id: string) {
  const campaign = await Campaign.findByPk(id);
  if (!campaign) throw new ResourceNotFoundError("Campaign not found");
  return campaign;
}

export async function getCampaignByTypeService(campaignTypeId: string) {
  const campaigns = await Campaign.findAll({
    where: {
      //@ts-ignore
      campaignTypeId: campaignTypeId,
    },
    attributes: {
      exclude: ["approvedAt", "approvedBy", "campaignTypeId", "userId"],
    },
  });

  if (campaigns.length > 0) return campaigns;
  else
    throw new ResourceNotFoundError(
      "No campaigns found for the specified Campaign Type."
    );
}

export async function getCampaignsService() {
  return await Campaign.findAll({
    attributes: {
      exclude: ["approvedAt", "approvedBy", "campaignTypeId", "userId"],
    },
  });
}

export async function deleteCampaignService(id: string) {
  const campaign = await getCampaignService(id);
  await campaign.destroy();
}
