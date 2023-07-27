import { NextFunction, Request, Response, Router } from "express";
import { authRoutes } from "../../common/constants/auth.constants";
import authService from "./auth.service";
import { ResponseHandler } from "../utils/responseHandler";
import { validateBody } from "../utils/body.validators";

export const authRouter = Router();
const {LOGIN,SIGN_UP} = authRoutes

authRouter.post(LOGIN,validateBody,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await authService.login(req.body);
        res.send( new ResponseHandler(response));
    } catch (error) {
     next(error);
    }
});

authRouter.post(SIGN_UP,validateBody,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await authService.createUser(req.body);
        res.send( new ResponseHandler(response));
    } catch (error) {
     next(error);
    }
});