import { generate } from "shortid";
import urlRepo from "./url.repo";
import { checkURLExists, validateUrl } from "../utils/urlValidator";
import { urlErrors } from "../../common/constants/url.constants";
import { IClickData, IUrl } from "../../common/types/url.types";
import paymentRepo from "../paymentGateway/payment.repo";
import {
  paymentGatewayCodes,
  stripeConstants,
} from "../../common/constants/paymentGateway.constants";

const { BASE_URL } = process.env;

const getShortUrl = async (longUrl: string, userId: number) => {
  try {
    const isValidUrl = await validateUrl(longUrl);
    if (!isValidUrl) throw urlErrors.INVALID_URL;
    const urlStatus = await checkURLExists(longUrl);
    if (urlStatus) {
      const shortId = generate();
      const shortUrl = `${BASE_URL}/${shortId}`;
      await urlRepo.saveUrl({ shortUrlId: shortId, longUrl, userId });
      return { shortUrl };
    }

    throw urlErrors.INVALID_URL;
  } catch (error) {
    throw error;
  }
};

const redirect = async (shortUrlId: string) => {
  try {
    const url: any = (await urlRepo.getLongUrl(shortUrlId)) as unknown as IUrl;
    if (url) {
      await urlRepo.updateClick(url["user.id"], shortUrlId);
      return {
        longUrl: url.longUrl,
        email: url["user.email"],
        userId: url["user.id"],
      };
    }
    throw urlErrors.INVALID_URL;
  } catch (error) {
    throw error;
  }
};

const getAllUrls = async (userId: number) => {
  try {
    const urls = await urlRepo.getAllUrls(userId);
    if (urls) return urls;
    return urlErrors.NO_URLS;
  } catch (error) {
    throw error;
  }
};

const getReports = async (userId: number) => {
  try {
    const reports: IClickData[] = (await urlRepo.getReports(
      userId
    )) as unknown as IClickData[];
    if (reports) {
      const filteredReports = reports.map((data: any) => {
        return {
          click: data.click,
          shortUrl: `${BASE_URL}/${data.url.shortUrlId}`,
        };
      });
      return filteredReports;
    }
    throw urlErrors.NO_URLS;
  } catch (error) {
    throw error;
  }
};

const getCustomUrl = async (
  userId: number,
  customName: string,
  longUrl: string
) => {
  try {
    const url = await urlRepo.getLongUrl(customName);
    const paymentDetails: any = await paymentRepo.getPaymentDetails(userId);
    const { PAYMENT_SUCCESS } = stripeConstants;
    if (url) throw urlErrors.URL_ALREADY_PRESENT;
    if (paymentDetails) {
      if (paymentDetails.paymentStatus === PAYMENT_SUCCESS) {
        const customUrl = BASE_URL + "/" + customName;
        await urlRepo.saveUrl({ shortUrlId: customName, longUrl, userId });
        return { customUrl };
      }
    }
    throw paymentGatewayCodes.NOT_FOUND;
  } catch (error) {
    throw error;
  }
};

export default { getShortUrl, redirect, getAllUrls, getReports, getCustomUrl };
