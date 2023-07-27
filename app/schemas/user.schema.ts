import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize";
import { urlSchema } from "./url.schema";

export const userSchema = sequelize.define(
  "users",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

userSchema.hasMany(urlSchema, {
  foreignKey: "userId",
});

urlSchema.belongsTo(userSchema);
