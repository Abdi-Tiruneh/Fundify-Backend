import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import Joi from "joi";

interface CampaignTypeAttributes {
  id: string;
  name: string;
  description: string | null;
}

interface CampaignTypeCreationAttributes
  extends Optional<CampaignTypeAttributes, "id"> {}

class CampaignType extends Model<
  CampaignTypeAttributes,
  CampaignTypeCreationAttributes
> {
  public campaignTypeId!: string;
  public name!: string;
  public description!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initModel(): void {
    CampaignType.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(255),
          unique: true,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "campaign_types",
      }
    );
  }
}

function validateCampaignType(campaignType: CampaignTypeAttributes) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().allow(null).optional(),
  });

  return schema.validate(campaignType);
}

export { CampaignType, validateCampaignType };
