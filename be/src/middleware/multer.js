import multer from 'multer';
import path from 'path'

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, String(Math.random() * 1000) + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

export default upload