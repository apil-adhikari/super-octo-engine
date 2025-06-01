import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration:
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadFileToCloudinary = async (
  file: string,
  folder = "posts"
) => {
  console.log("CLOUDINARY");
  return await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "image",
    transformation: {
      width: 2000,
      height: 1333,
      crop: "limit",
    },
  });
};
