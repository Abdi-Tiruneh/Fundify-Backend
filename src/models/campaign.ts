import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import Joi from "joi";
import { User } from "./user";
import { CampaignType } from "./campaignType";

interface CampaignAttributes {
  id: string;
  title: string;
  shortDescription: string;
  city: string;
  goalAmount: number;
  fundingType: "DONATION" | "EQUITY" | "REWARD";
  campaignStage:
    | "INITIAL"
    | "PENDING"
    | "FUNDING"
    | "REJECTED"
    | "PAUSED"
    | "COMPLETED"
    | "SUSPENDED";
  campaignImage: string | null;
  description: string | null;
  campaignDuration: number;
  enabled: boolean;
  approvedAt: Date | null;
  approvedBy: string | null;
  completedAt: Date | null;
}

interface CampaignCreationAttributes
  extends Optional<CampaignAttributes, "id"> {
  campaignTypeId: string;
  userId: string;
}

class Campaign
  extends Model<CampaignAttributes, CampaignCreationAttributes>
  implements CampaignAttributes
{
  public id!: string;
  public title!: string;
  public shortDescription!: string;
  public city!: string;
  public goalAmount!: number;
  public fundingType!: "DONATION" | "EQUITY" | "REWARD";
  public campaignStage!:
    | "INITIAL"
    | "PENDING"
    | "FUNDING"
    | "REJECTED"
    | "PAUSED"
    | "COMPLETED"
    | "SUSPENDED";
  public campaignImage!: string | null;
  public description!: string | null;
  public risks!: string | null;
  public campaignDuration!: number;
  public commissionRate!: number | null;
  public enabled!: boolean;
  public approvedAt!: Date | null;
  public approvedBy!: string | null;
  public completedAt!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Campaign.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    goalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fundingType: {
      type: DataTypes.ENUM("DONATION", "EQUITY", "REWARD"),
      allowNull: false,
    },
    campaignStage: {
      type: DataTypes.ENUM(
        "INITIAL",
        "PENDING",
        "FUNDING",
        "REJECTED",
        "PAUSED",
        "COMPLETED",
        "SUSPENDED"
      ),
      allowNull: false,
      defaultValue: "INITIAL",
    },
    campaignImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    campaignDuration: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    approvedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    approvedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Campaign",
    tableName: "campaigns",
  }
);

CampaignType.hasMany(Campaign, {
  foreignKey: "campaignTypeId",
  onDelete: "RESTRICT",
});
Campaign.belongsTo(CampaignType, {
  foreignKey: "campaignTypeId",
});

User.hasMany(Campaign, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
});
Campaign.belongsTo(User, {
  foreignKey: "userId",
});

function validateCampaign(campaign: Partial<CampaignAttributes>) {
  const schema = Joi.object({
    title: Joi.string().required(),
    shortDescription: Joi.string().required(),
    city: Joi.string().required(),
    goalAmount: Joi.number().positive().required(),
    fundingType: Joi.string().valid("DONATION", "EQUITY", "REWARD").required(),
    campaignDuration: Joi.number().integer().min(1).required(),
    campaignTypeId: Joi.string().uuid().required(),
  });

  return schema.validate(campaign);
}

export { Campaign, validateCampaign };
