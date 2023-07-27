import { authRouter } from "../auth/auth.routes";
import { IExcludedPaths } from "../../common/types/routes.types";
import { Route, Routes } from "./routes.types";
import { urlRouter } from "../url/url.routes";
import { paymentRouter } from "../paymentGateway/payment.route";



export const routes: Routes = [
   new Route('/auth',authRouter),
   new Route('/url',urlRouter),
   new Route('/payment',paymentRouter)
];
