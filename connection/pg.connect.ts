import { sequelize } from "../app/utils/sequelize";

export const connectToPostgres = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("CONNECTED TO POSTGRES");
        return true;
    } catch (e) {
        throw e;
    }
}