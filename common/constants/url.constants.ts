import { MessageHandler } from "../../app/utils/responseHandler";

export const urlConstants = {
  SHORT_URL: "/shorten",
  REDIRECT: "/:shortUrlId",
  GET_REPORTS: "/getReports",
  GET_MY_URLS : "/getMyUrls",
  CUSTOM_URL : "/customUrl"
};

export const urlErrors = {
  INVALID_URL: new MessageHandler(400, "Bad Request Invalid Url!!"),
  NO_URLS: new MessageHandler(200, "You Have Not Created Urls yet!!"),
  URL_ALREADY_PRESENT : new MessageHandler(403,"Url Already Exists!!")
};



