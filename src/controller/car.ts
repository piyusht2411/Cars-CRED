import { Request, Response } from 'express';
import Car from '../model/car'; 

export const addCar = async (req: Request, res: Response) => {
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
  
      const newCar = new Car({
        title,
        description,
        images,
        tags,
        userId, 
      });
  
      await newCar.save();
  
      res.status(201).json({
        message: 'Car added successfully',
        car: newCar,
      });
    } catch (error: any) {
      res.status(500).json({
        message: 'Error adding car',
        error: error.message,
      });
    }
  };  

export const getUserCars = async (req: Request, res: Response) => {
    try {
      const userId = req.userId; 
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized access' });
      }
  
      const { keyword } = req.query;

      const searchQuery: any = { userId }; 
  
      if (keyword && typeof keyword === 'string') {
        searchQuery.$or = [
          { title: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
          { tags: { $regex: keyword, $options: 'i' } },
        ];
      }
  
      const cars = await Car.find(searchQuery);
  
      res.status(200).json({
        message: 'Cars retrieved successfully',
        cars,
      });
    } catch (error: any) {
      res.status(500).json({
        message: 'Error retrieving cars',
        error: error.message,
      });
    }
  };

export const getCarDetail = async (req: Request, res: Response) => {
    try {
      const carId = req.params.id;
  
      if (!carId) {
        return res.status(400).json({ message: 'Car ID is required' });
      }
  
      const car = await Car.findById(carId);
  
      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }
  
      res.status(200).json({
        message: 'Car details retrieved successfully',
        car,
      });
    } catch (error: any) {
      res.status(500).json({
        message: 'Error retrieving car details',
        error: error.message,
      });
    }
  };

export const updateCar = async (req: Request, res: Response) => {
    try {
      const carId = req.params.id; 
      const { title, description, images, tags } = req.body; 
  
      if (!title && !description && !images && !tags) {
        return res.status(400).json({ message: 'Please provide fields to update' });
      }
  
      const updatedCar = await Car.findByIdAndUpdate(
        carId,
        {
          title,
          description,
          images,
          tags,
        },
        { new: true } 
      );
  
      if (!updatedCar) {
        return res.status(404).json({ message: 'Car not found' });
      }
  
      res.status(200).json({
        message: 'Car updated successfully',
        car: updatedCar,
      });
    } catch (error: any) {
      res.status(500).json({
        message: 'Error updating car',
        error: error.message,
      });
    }
  };

export const deleteCar = async (req: Request, res: Response) => {
    try {
      const carId = req.params.id; 
  
      const deletedCar = await Car.findByIdAndDelete(carId);
  
      if (!deletedCar) {
        return res.status(404).json({ message: 'Car not found' });
      }
  
      res.status(200).json({
        message: 'Car deleted successfully',
        car: deletedCar,
      });
    } catch (error: any) {
      res.status(500).json({
        message: 'Error deleting car',
        error: error.message,
      });
    }
  };
  
