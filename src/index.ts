import express, { Express, Request, Response , Application, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import db = require('./config/db');
import userRoutes from "./routes/user";
import carsRoutes from "./routes/car";

declare global {
    namespace Express {
      interface Request {
        userId?: string ;
  }
}}


dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

var corsOptions = {
  origin: ["http://localhost:3000", "https://car-management-app-frontend-wtna.vercel.app"],
  credentials: true
};

app.use(morgan('dev')); 
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/user', userRoutes);
app.use('/api/cars', carsRoutes);
app.use((err: Error, req: Request, res:Response, next: NextFunction) => {
    res.status(500).json({message: err.message});  
  });


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Server');
});

const start = async () => {
  try {
    // connectDB
    await db.connectDB(process.env.MONGO_URL!);
    app.listen(port, () => console.log(`Server is connected to port : ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
