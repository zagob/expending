import fs from "fs";

export const deleteFile = async (filenamePath: string) => {
  try {
    await fs.promises.unlink(filenamePath);
  } catch {
    return;
  }

  await fs.promises.unlink(filenamePath);
};
