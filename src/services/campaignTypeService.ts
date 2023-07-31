import { CampaignType } from "../models/campaignType";
import { ResourceNotFoundError, ConflictError } from "../errors/CustomErrors";

//initialize the CampaignType model
CampaignType.initModel();

export async function createCampaignTypeService(
  name: string,
  description: string | null
) {
  const existingCampaignType = await CampaignType.findOne({
    where: { name },
  });
  if (existingCampaignType) {
    throw new ConflictError(
      "CampaignType with the provided name already exists."
    );
  }

  const campaignType = await CampaignType.create({
    name,
    description,
  });

  return campaignType;
}

export async function getCampaignTypesService() {
  const campaignTypes = await CampaignType.findAll();
  return campaignTypes;
}

export async function getCampaignTypeService(campaignTypeId: string) {
  const campaignType = await CampaignType.findByPk(campaignTypeId);
  if (!campaignType) {
    throw new ResourceNotFoundError("Campaign Type not found");
  }

  return campaignType;
}

export async function updateCampaignTypeService(
  campaignTypeId: string,
  updatedData: Partial<CampaignType>
) {
  const campaignType = await getCampaignTypeService(campaignTypeId);
  const updatedCampaignType = await campaignType.update(updatedData);

  return updatedCampaignType;
}

export async function deleteCampaignTypeService(campaignTypeId: string) {
  const campaignType = await getCampaignTypeService(campaignTypeId);
  await campaignType.destroy();
}
