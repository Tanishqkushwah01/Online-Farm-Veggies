import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Online-Farm-Veggies/ProfilePictures",
    resource_type: "image",
  } as any,
});

const upload = multer({
  storage,
});

export default upload;