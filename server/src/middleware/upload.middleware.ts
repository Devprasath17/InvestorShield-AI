import multer from 'multer';
import path from 'path';

// Store files in memory or temp dir. For OCR, temp dir is often better
// so Tesseract can read it directly from the file system.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // We can use the OS temp directory or a local uploads folder.
    // Let's use a local 'uploads' directory relative to the project root.
    // Ensure the folder exists before using it.
    import('fs').then(fs => {
      const uploadDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    });
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Please upload a valid image file (JPEG, PNG, WebP).'));
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter,
});
