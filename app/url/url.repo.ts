import { IUrlDetails } from "../../common/types/url.types";
import { urlSchema } from "../schemas/url.schema";
import { urlClickSchema } from "../schemas/urlClicks.schema";
import { userSchema } from "../schemas/user.schema";
import { MessageHandler } from "../utils/responseHandler";

const saveUrl = async (urlDetails: IUrlDetails) =>
  await urlSchema.create({ ...urlDetails });
const getLongUrl = async (shortUrlId: string) =>
  await urlSchema.findOne({
    where: { shortUrlId },
    include: {
      model: userSchema,
      attributes: ["email", "id"],
    },
    raw: true,
  });

const getClicks = async (userId: number) =>
  await urlClickSchema.findOne({
    where: { userId },
    include: { model: userSchema },
  });

const updateClick = async (userId: number, shortUrlId: string) => {
  try {
    const getUrlId:IUrlDetails = await urlSchema.findOne({where:{shortUrlId},raw:true}) as unknown as IUrlDetails
    const urlClickRecord = await urlClickSchema.findOne({
      where: { urlId: getUrlId.id },
    });
    if (!urlClickRecord) {
      const url: IUrlDetails = (await urlSchema.findOne({
        where: { shortUrlId },
      })) as unknown as IUrlDetails;
      await urlClickSchema.create({ userId, click: 1, urlId: url.id });
    } else {
      await urlClickRecord.increment("click", { by: 1 });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllUrls = async (userId: number) =>
  await urlSchema.findAll({ where: { userId } });

const getReports = async (userId: number) =>
  await urlClickSchema.findAll({
    where: { userId },
    include: { model: urlSchema, attributes: ["shortUrlId"] },
  });
export default {
  saveUrl,
  getLongUrl,
  getClicks,
  updateClick,
  getAllUrls,
  getReports,
};
