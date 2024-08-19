import {Router} from 'express';
import cloudinary from '../utils/cloudinary';
import upload from '../middleware/multer';
const Routes_upload = Router();

Routes_upload.post('/upload', upload.single('image'), function (req, res) {
    cloudinary.uploader.upload(req.file.path, function (err, result){
      if(err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error"
        })
      }
  
      res.status(200).json({
        success: true,
        message:"Uploaded!",
        data: result
      })
    })
});

export default Routes_upload;