"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUserMiddleware = exports.authFoodPartnerMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const foodPartner_model_1 = require("../models/foodPartner.model");
const user_model_1 = require("../models/user.model");
const authFoodPartnerMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.partner_token;
        if (!token)
            return res.status(401).json({ message: "Please login as a Food Partner" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const foodPartner = await foodPartner_model_1.FoodPartner.findById(decoded.id).select("-password");
        if (!foodPartner)
            return res.status(401).json({ message: "Food Partner not found" });
        req.foodPartner = foodPartner;
        next();
    }
    catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.authFoodPartnerMiddleware = authFoodPartnerMiddleware;
const authUserMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.user_token;
        if (!token)
            return res.status(401).json({ message: "Please login as a User" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await user_model_1.User.findById(decoded.id).select("-password");
        if (!user)
            return res.status(401).json({ message: "User not found" });
        req.user = user;
        next();
    }
    catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.authUserMiddleware = authUserMiddleware;
