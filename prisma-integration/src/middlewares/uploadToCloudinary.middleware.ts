import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { StatusCode } from "../constants/StatusCodes";
import { uploadFileToCloudinary } from "../utils/cloudinary";
import fs from "fs/promises"; // Import fs.promises for async file operations
import path from "path"; // Import path module

export async function uploadToCloudinary(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const file = req.file;

    if (!file) {
      throw new AppError("Please upload the file", StatusCode.BAD_REQUEST.code);
    }

    // When using diskStorage, the file buffer is NOT available.
    // Instead, the file is saved to disk, and `file.path` contains its location.
    const filePath = file.path;
    const mimetype = file.mimetype;

    if (!filePath) {
      throw new AppError(
        "File path not found after upload.",
        StatusCode.INTERNAL_SERVER_ERROR.code
      );
    }

    let fileBuffer;
    try {
      fileBuffer = await fs.readFile(filePath); // Read the file from the disk
    } catch (readError: any) {
      throw new AppError(
        `Failed to read file from disk: ${readError.message}`,
        StatusCode.INTERNAL_SERVER_ERROR.code
      );
    }

    console.log("File read from disk successfully.");

    const base64String = `data:${mimetype};base64,${fileBuffer.toString(
      "base64"
    )}`;

    const result = await uploadFileToCloudinary(base64String);

    console.log("Cloudinary upload result:", result);

    if (result && result.secure_url && result.public_id) {
      (req as any).fileUrl = {
        url: result.secure_url,
        public_id: result.public_id,
      };
      // Optional: Delete the temporary file from the disk after successful upload
      try {
        await fs.unlink(filePath);
        console.log(`Temporary file deleted: ${filePath}`);
      } catch (unlinkError: any) {
        console.error(
          `Error deleting temporary file ${filePath}: ${unlinkError.message}`
        );
        // Log the error but don't prevent the request from proceeding, as the upload was successful
      }
    } else {
      throw new AppError(
        "Failed to upload file to Cloudinary or retrieve URL.",
        StatusCode.INTERNAL_SERVER_ERROR.code
      );
    }

    next();
  } catch (error) {
    next(error);
  }
}
