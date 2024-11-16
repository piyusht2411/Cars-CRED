import {Schema, model, Document } from "mongoose";
import { genSaltSync, hashSync } from "bcrypt";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
  }

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }

})

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) { return next(); }
    const salt =  genSaltSync(10);
    user.password = hashSync(user.password, salt);
    next();
});

const User = model('User', userSchema);

export default User;
