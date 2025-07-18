import multer from "multer";

// In your multer.js middleware
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    // console.log('📥 File received:', {
    //   name: file.originalname,
    //   type: file.mimetype,
    //   size: file.size
    // });

    if (['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});