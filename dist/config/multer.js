"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = __importDefault(require("./cloudinary"));
// Configure Cloudinary storage
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default,
    params: {
        //@ts-ignore
        folder: 'blog_images', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Allowed file formats
    },
});
// Multer instance for handling file uploads
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
