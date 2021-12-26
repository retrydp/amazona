import nc from 'next-connect';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { onError } from '../../../utils/error';
import { isAuth, isAdmin } from '../../../utils/auth';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc({ onError });
const upload = multer();

handler.use(isAuth, isAdmin, upload.single('file'));
handler.post(async (req, res, next) => {
  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else reject(error.message);
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };
  await streamUpload(req)
    .then((result) => res.send(result))
    .catch((err) => next(err));
});

export default handler;
