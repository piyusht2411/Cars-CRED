"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCar = exports.updateCar = exports.getCarDetail = exports.getUserCars = exports.addCar = void 0;
const car_1 = __importDefault(require("../model/car"));
const addCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, images, tags } = req.body;
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
        if (!title || !description || !images || !Array.isArray(images)) {
            return res.status(400).json({ message: 'Invalid input' });
        }
        if (images.length > 10) {
            return res.status(400).json({ message: 'You can upload up to 10 images only' });
        }
        const newCar = new car_1.default({
            title,
            description,
            images,
            tags,
            userId,
        });
        yield newCar.save();
        res.status(201).json({
            message: 'Car added successfully',
            car: newCar,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error adding car',
            error: error.message,
        });
    }
});
exports.addCar = addCar;
const getUserCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
        const { keyword } = req.query;
        const searchQuery = { userId };
        if (keyword && typeof keyword === 'string') {
            searchQuery.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { tags: { $regex: keyword, $options: 'i' } },
            ];
        }
        const cars = yield car_1.default.find(searchQuery);
        res.status(200).json({
            message: 'Cars retrieved successfully',
            cars,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error retrieving cars',
            error: error.message,
        });
    }
});
exports.getUserCars = getUserCars;
const getCarDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carId = req.params.id;
        if (!carId) {
            return res.status(400).json({ message: 'Car ID is required' });
        }
        const car = yield car_1.default.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json({
            message: 'Car details retrieved successfully',
            car,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error retrieving car details',
            error: error.message,
        });
    }
});
exports.getCarDetail = getCarDetail;
const updateCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carId = req.params.id;
        const { title, description, images, tags } = req.body;
        if (!title && !description && !images && !tags) {
            return res.status(400).json({ message: 'Please provide fields to update' });
        }
        const updatedCar = yield car_1.default.findByIdAndUpdate(carId, {
            title,
            description,
            images,
            tags,
        }, { new: true });
        if (!updatedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json({
            message: 'Car updated successfully',
            car: updatedCar,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error updating car',
            error: error.message,
        });
    }
});
exports.updateCar = updateCar;
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carId = req.params.id;
        const deletedCar = yield car_1.default.findByIdAndDelete(carId);
        if (!deletedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json({
            message: 'Car deleted successfully',
            car: deletedCar,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error deleting car',
            error: error.message,
        });
    }
});
exports.deleteCar = deleteCar;
