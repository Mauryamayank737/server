import { uploadImageClodinary } from "../utils/uploadImageCloudinary.js";

export const uploadImageController = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await uploadImageClodinary(file.buffer); // Use buffer

    return res.json({
      message: "Image uploaded successfully",
      data: result,
      success: true,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      message: error.message || "Upload failed",
      error: true,
      success: false,
    });
  }
};

