import { authConstants } from "../../common/constants/auth.constants";
import { ILoginDetails } from "../../common/types/auth.types";
import { createToken } from "../utils/authorize";
import authRepo from "./auth.repo";

const login = async (loginDetails: ILoginDetails) => {
  try {
    const user: any = await authRepo.findOneUser(loginDetails.email);

    if (user && loginDetails.password === user.password) {
      const accessToken = createToken(
        { user },
        process.env.ACCESS_TOKEN_SECRET || "",
        "1d"
      );
      return { accessToken };
    }

    throw authConstants.INVALID_DETAILS;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userDetails: ILoginDetails) => {
  try {
    const user = await authRepo.findOneUser(userDetails.email);
    if (user) throw authConstants.DUPLICATE_USER;
    await authRepo.createUser(userDetails);
    return authConstants.USER_CREATED;
  } catch (error) {
    throw error;
  }
};
export default {
  login,
  createUser,
};
