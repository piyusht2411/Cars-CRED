"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});
function arrayLimit(val) {
    return val.length <= 10;
}
const Car = (0, mongoose_1.model)('Car', carSchema);
exports.default = Car;
