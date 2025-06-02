import { NextFunction, Request, Response } from "express";
import { promises as fs } from "fs";
import { AppError } from "../utils/appError";
import { StatusCode } from "../constants/StatusCodes";
import { uploadFileToCloudinary } from "../utils/cloudinary";

interface CustomRequest extends Request {
  fileUrl?: {
    url: string;
    public_id: string;
  };
}

export async function uploadToCloudinary(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const file = req.file;

    // In create routes, require file
    const isCreating = req.method === "POST";
    const isUpdating = req.method === "PATCH";

    if (isCreating && !file) {
      throw new AppError("Please upload the file", StatusCode.BAD_REQUEST.code);
    }

    // If no file is uploaded during PATCH, skip Cloudinary upload
    if (!file) {
      console.log("🟡 No file uploaded – skipping Cloudinary upload.");
      return next();
    }

    const filePath = file.path;
    const mimetype = file.mimetype;

    if (!filePath || !mimetype) {
      throw new AppError(
        "Missing file path or mimetype.",
        StatusCode.INTERNAL_SERVER_ERROR.code
      );
    }

    let fileBuffer: Buffer;
    try {
      fileBuffer = await fs.readFile(filePath);
    } catch (readError: any) {
      throw new AppError(
        `Failed to read file from disk: ${readError.message}`,
        StatusCode.INTERNAL_SERVER_ERROR.code
      );
    }

    console.log("✅ File read from disk.");

    const base64String = `data:${mimetype};base64,${fileBuffer.toString(
      "base64"
    )}`;
    const result = await uploadFileToCloudinary(base64String);

    if (result?.secure_url && result?.public_id) {
      req.fileUrl = {
        url: result.secure_url,
        public_id: result.public_id,
      };

      // Try deleting temp file
      try {
        await fs.unlink(filePath);
        console.log(`🗑️ Deleted temporary file: ${filePath}`);
      } catch (unlinkErr: any) {
        console.warn(`⚠️ Failed to delete file: ${unlinkErr.message}`);
      }
    } else {
      throw new AppError(
        "Cloudinary upload failed: Missing secure_url or public_id.",
        StatusCode.INTERNAL_SERVER_ERROR.code
      );
    }

    next();
  } catch (error) {
    next(error);
  }
}
