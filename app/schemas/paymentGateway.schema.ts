import { DataTypes } from "sequelize";
import { sequelize } from "../utils/sequelize";
import { userSchema } from "./user.schema";

export const paymentGatewaySchema = sequelize.define('userPayments',{
    paymentStatus:{
        type:DataTypes.ENUM,
        values:['pending','failed','success'],
        defaultValue:'pending'
    },
    amount:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

userSchema.hasOne(paymentGatewaySchema);
paymentGatewaySchema.belongsTo(userSchema);