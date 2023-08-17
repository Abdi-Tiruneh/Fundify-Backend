import cloudinary from "../config/cloudinary";

export default async function uploadImage(file: Express.Multer.File) {
  const result = await cloudinary.uploader.upload(file.path);
  return result.url;
}
