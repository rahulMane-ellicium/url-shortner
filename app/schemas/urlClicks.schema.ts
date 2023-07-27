import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize";
import { userSchema } from "./user.schema";
import { urlSchema } from "./url.schema";

export const urlClickSchema = sequelize.define(
  "urlClicks",
  {
    click: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { timestamps: true, paranoid: true }
);

userSchema.hasMany(urlClickSchema);
urlClickSchema.belongsTo(userSchema);

urlSchema.hasMany(urlClickSchema);
urlClickSchema.belongsTo(urlSchema);
