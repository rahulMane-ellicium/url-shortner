import { userSchema } from "../schemas/user.schema";
import { ILoginDetails } from "../../common/types/auth.types";

const createUser = async (loginDetails:ILoginDetails)=> userSchema.create({...loginDetails});
const findOneUser = async (email:string)=>userSchema.findOne({where:{email},raw:true});


export default {
    createUser,
    findOneUser
}

