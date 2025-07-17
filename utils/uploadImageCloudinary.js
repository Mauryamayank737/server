import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true
});

export const uploadImageCloudinary = async (file) => {
  if (!file || !file.buffer) {
    throw new Error("No file buffer provided");
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "avatars",
        resource_type: "auto",
        public_id: file.originalname.replace(/\.[^/.]+$/, "") // Remove extension
      },
      (error, result) => {
        if (error) {
          // console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          // console.log("Upload successful:", {
          //   url: result.secure_url,
          //   size: result.bytes,
          //   format: result.format
          //  });
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};