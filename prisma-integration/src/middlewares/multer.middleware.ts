import multer, { Multer } from "multer";
import { AppError } from "../utils/appError";
import { StatusCode } from "../constants/StatusCodes";
import { Request } from "express";
import path from "path";

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure this directory exists or Multer will throw an error
    cb(null, path.join(__dirname, "../uploads"));
    console.log(`${__dirname}`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = `${uniqueSuffix}+${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter,
});

export default upload;
