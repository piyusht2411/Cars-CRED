import {Router} from 'express';
import { addCar, deleteCar, getCarDetail, getUserCars, updateCar } from '../controller/car';
import { authenticateToken } from '../middleware/authMiddleware';
import upload from '../config/multer';
import { uploadImages } from '../controller/image';

const router = Router();

router.post('/add-car', authenticateToken, addCar);
router.get('/get-cars', authenticateToken, getUserCars);
router.get('/get-car/:id', getCarDetail);
router.put('/update-car/:id', updateCar);
router.delete('/delete-car/:id', deleteCar);
router.post('/upload-images', upload.array('images', 10), uploadImages);

export default router;