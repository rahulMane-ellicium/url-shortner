import https from "https";

export const checkURLExists = async (url: string) => {
  try {
    const response: any = await new Promise((resolve, reject) => {
      https
        .get(url, (res) => {
          resolve(res);
        })
        .on("error", (err) => {
          reject(err);
        });
    });

    if (response.statusCode >= 200 && response.statusCode < 300) {
      return true;
    } else {
      return false;
    }
  } catch (err: any) {
    throw new Error(`Error while checking URL: ${err.message}`);
  }
};

export const validateUrl = async (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
