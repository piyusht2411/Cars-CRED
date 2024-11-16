import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary';

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    //@ts-ignore
    folder: 'blog_images', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Allowed file formats
  },
});

// Multer instance for handling file uploads
const upload = multer({ storage });

export default upload;
