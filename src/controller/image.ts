import  { Request, Response } from 'express';

export const uploadImages = async (req: Request, res: Response) => {
    try {
      const files = req.files as Express.Multer.File[]; 
  
      if (!files || files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
      }
  
      const imageUrls = files.map((file) => file.path);
  
      res.status(200).json({
        message: 'Images uploaded successfully!',
        images: imageUrls,
      });
    } catch (error: any) {
      console.error('Error uploading images:', error);
      res.status(500).json({ message: 'Error uploading images', error: error.message });
    }
  };

