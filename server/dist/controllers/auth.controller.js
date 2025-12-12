"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutFoodPartner = exports.loginFoodPartner = exports.registerFoodPartner = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = require("../models/user.model");
const foodPartner_model_1 = require("../models/foodPartner.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isProd = process.env.NODE_ENV === "production";
const cookieSettings = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
};
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: "All Fields are Required" });
        const existingUser = await user_model_1.User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "Already Registered Please Login" });
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await user_model_1.User.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.cookie("user_token", token, cookieSettings);
        return res.status(201).json({
            message: "User Registered Successfully",
            user: { id: user._id, name: user.name, email: user.email },
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "All Fields are Required" });
        const user = await user_model_1.User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "Invalid Credentials" });
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid Credentials" });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.cookie("user_token", token, cookieSettings);
        return res.status(200).json({
            message: "User Logged in Successfully",
            user: { id: user._id, name: user.name, email: user.email },
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
};
exports.loginUser = loginUser;
const logoutUser = async (req, res) => {
    try {
        res.clearCookie("user_token", { path: "/" });
        return res.status(200).json({ message: "Logout successful" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
};
exports.logoutUser = logoutUser;
// ===================== FOOD PARTNER AUTH ======================
const registerFoodPartner = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: "All Fields are Required" });
        const existing = await foodPartner_model_1.FoodPartner.findOne({ email });
        if (existing)
            return res.status(400).json({ message: "Already Registered Please Login" });
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const partner = await foodPartner_model_1.FoodPartner.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = jsonwebtoken_1.default.sign({ id: partner._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.cookie("partner_token", token, cookieSettings);
        return res.status(201).json({
            message: "Food Partner Registered Successfully",
            foodPartner: { id: partner._id, name: partner.name, email: partner.email },
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
};
exports.registerFoodPartner = registerFoodPartner;
const loginFoodPartner = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "All Fields are Required" });
        const partner = await foodPartner_model_1.FoodPartner.findOne({ email });
        if (!partner)
            return res.status(404).json({ message: "Invalid Credentials" });
        const isMatch = await bcrypt_1.default.compare(password, partner.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid Credentials" });
        const token = jsonwebtoken_1.default.sign({ id: partner._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.cookie("partner_token", token, cookieSettings);
        return res.status(200).json({
            message: "Food Partner Logged in Successfully",
            foodPartner: { id: partner._id, name: partner.name, email: partner.email },
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
};
exports.loginFoodPartner = loginFoodPartner;
const logoutFoodPartner = async (req, res) => {
    try {
        res.clearCookie("partner_token", { path: "/" });
        return res.status(200).json({ message: "Logout successful" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
};
exports.logoutFoodPartner = logoutFoodPartner;
