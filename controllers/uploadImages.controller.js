import { uploadImageCloudinary } from '../utils/uploadImageCloudinary.js';

export const uploadImageController = async (req, res) => {
  try {
    // if (!req.file) {
    //   return res.status(400).json({ error: "No file uploaded" });
    // }
    console.log(req.body)

    console.log("Processing file:", {
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype
    });

    const result = await uploadImageCloudinary(req.file);
    // console.log(result.secure_url)
    
    res.status(200).json({
      success: true,
      imageUrl: result.secure_url
    });
  } catch (error) {
    console.error("Upload failed:", error.message);
    res.status(500).json({ 
      error: error.message || "Upload failed",
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
