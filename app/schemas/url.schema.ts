import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize";


export const urlSchema = sequelize.define(
  "urls",
  {
    shortUrlId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);


