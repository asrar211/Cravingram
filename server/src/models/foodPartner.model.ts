import mongoose, { Document, Schema } from "mongoose";

export interface IFoodPartner extends Document {
    name: string;
    email: string;
    password: string //change when use google Login 
}

const foodPartnerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true //change when use google Login 
    }
});

export const FoodPartner = mongoose.model<IFoodPartner>('FoodPartner', foodPartnerSchema);