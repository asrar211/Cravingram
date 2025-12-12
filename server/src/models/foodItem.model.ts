import { FoodPartner } from './foodPartner.model';
import mongoose, { Document, Schema, Types } from "mongoose";

export interface IFoodItem extends Document {
    name: string;
    description: string;
    videoUrl: String,
    videoId: String,
    foodPartner: Types.ObjectId;
    likes: Types.ObjectId[];
}

const foodItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    videoId: {
        type: String,
    },
    foodPartner:{
        type: mongoose.Types.ObjectId,
        ref: "FoodPartner",
        required: true,
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    
}, {timestamps: true});

export const FoodItem = mongoose.model<IFoodItem>("FoodItem", foodItemSchema);