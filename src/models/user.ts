import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import Joi from "joi";

interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  avatar?: string;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "isAdmin" | "avatar"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public isAdmin!: boolean;
  public avatar?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {};

  public static initModel(): void {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1, 100],
          },
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1, 100],
          },
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isAlphanumeric: true,
            len: [4, 20],
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
            len: [1, 255],
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [8, 100],
          },
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        avatar: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "User",
      }
    );
  }
}

function validateUser(user: UserAttributes) {
  const schema = Joi.object({
    firstName: Joi.string().alphanum().min(1).max(100).required(),
    lastName: Joi.string().alphanum().min(1).max(100).required(),
    username: Joi.string().alphanum().min(4).max(20).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(8).max(100).required(),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(user);
}

export { User, validateUser };
