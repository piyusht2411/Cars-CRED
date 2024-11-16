import { Schema, model, Document, Types } from 'mongoose';

interface ICar extends Document {
  title: string;
  description: string;
  images: string[];
  tags: string[];
  userId: Types.ObjectId
}

const carSchema = new Schema<ICar>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    validate: [arrayLimit, 'Exceeds the limit of 10 images'],
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

function arrayLimit(val: string[]) {
  return val.length <= 10;
}

const Car = model<ICar>('Car', carSchema);

export default Car;
