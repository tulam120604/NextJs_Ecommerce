import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

export async function upload_img(img) {
  try {
    if (Array.isArray(img)) {
      const image_upload = img.map((file) =>
        cloudinary.uploader.upload(file.path)
      );
      const result = await Promise.all(image_upload);
      img.forEach((file) => fs.unlinkSync(file.path));
      return result;
    } else {
      const result = await cloudinary.uploader.upload(img.path);
      fs.unlinkSync(img.path);
      return result;
    }
  } catch (error) {
    return error;
  }
}
