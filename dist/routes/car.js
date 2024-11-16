"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const car_1 = require("../controller/car");
const authMiddleware_1 = require("../middleware/authMiddleware");
const multer_1 = __importDefault(require("../config/multer"));
const image_1 = require("../controller/image");
const router = (0, express_1.Router)();
router.post('/add-car', authMiddleware_1.authenticateToken, car_1.addCar);
router.get('/get-cars', authMiddleware_1.authenticateToken, car_1.getUserCars);
router.get('/get-car/:id', authMiddleware_1.authenticateToken, car_1.getCarDetail);
router.put('/update-car/:id', authMiddleware_1.authenticateToken, car_1.updateCar);
router.delete('/delete-car/:id', authMiddleware_1.authenticateToken, car_1.deleteCar);
router.post('/upload-images', multer_1.default.array('images', 10), image_1.uploadImages);
exports.default = router;
