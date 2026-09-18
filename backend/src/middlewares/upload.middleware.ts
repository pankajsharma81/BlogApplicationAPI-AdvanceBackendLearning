import multer from "multer";
import { AppError } from "../utils/app-error.js";

const storage = multer.memoryStorage();

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new AppError("Only JPEG, JPG, PNG and WEBP images are allowed", 400),
    );
  }
  cb(null, true);
};

export const uploadImagePost = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
