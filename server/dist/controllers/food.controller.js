"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalLikesForFoodPartner = exports.likeReel = exports.getFoodItemsByPartner = exports.getFood = exports.addFood = void 0;
const imageKit_1 = require("../services/imageKit");
const uuid_1 = require("uuid");
const foodItem_model_1 = require("../models/foodItem.model");
const addFood = async (req, res) => {
    try {
        const { name, description } = req.body;
        const video = req.file;
        if (!video || !name || !description)
            return res.status(400).json({ message: "All fields are required" });
        const foodPartner = req.foodPartner;
        if (!foodPartner)
            return res.status(401).json({ message: "Unauthorized" });
        const base64 = video.buffer.toString("base64");
        const fileString = `data:${video.mimetype};base64,${base64}`;
        const uploaded = await (0, imageKit_1.uploadFile)(fileString, (0, uuid_1.v4)());
        const foodItem = await foodItem_model_1.FoodItem.create({
            name,
            description,
            videoUrl: uploaded.url,
            videoId: uploaded.fileId,
            foodPartner: req.foodPartner._id
        });
        return res.json({ message: "Food Added", foodItem });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ message: "Server Error" });
    }
};
exports.addFood = addFood;
const getFood = async (req, res) => {
    try {
        const foodItems = await foodItem_model_1.FoodItem.find({}).populate("foodPartner", "name");
        return res.status(201).json({
            message: "Food Items fetched Successfully",
            foodItems
        });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ message: "Server Error" });
    }
};
exports.getFood = getFood;
const getFoodItemsByPartner = async (req, res) => {
    try {
        const foodPartner = req.foodPartner;
        if (!foodPartner)
            return res.status(401).json({ message: "Unauthorized" });
        const foodItems = await foodItem_model_1.FoodItem.find({ foodPartner: foodPartner._id }).select("-password");
        return res.status(201).json({
            message: "Food Items fetched Successfully",
            foodItems
        });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ message: "Server Error" });
    }
};
exports.getFoodItemsByPartner = getFoodItemsByPartner;
const likeReel = async (req, res) => {
    try {
        const userId = req.user._id;
        const reelId = req.params.id;
        const reel = await foodItem_model_1.FoodItem.findById(reelId);
        if (!reel)
            return res.status(404).json({ message: "Reel Not Found" });
        const alreadyLiked = reel.likes.includes(userId);
        if (alreadyLiked) {
            reel.likes = reel.likes.filter((id) => id.toString() !== userId.toString());
        }
        else {
            reel.likes.push(userId);
        }
        await reel.save();
        return res.status(201).json({
            liked: !alreadyLiked,
            likesCount: reel.likes.length
        });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ message: "Server Error" });
    }
};
exports.likeReel = likeReel;
const getTotalLikesForFoodPartner = async (req, res) => {
    try {
        const foodPartnerId = req.foodPartner._id;
        const items = await foodItem_model_1.FoodItem.find({ foodPartner: foodPartnerId });
        const totalLikes = items.reduce((sum, item) => sum + (item.likes?.length || 0), 0);
        return res.status(200).json({
            foodPartnerId,
            totalLikes,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
};
exports.getTotalLikesForFoodPartner = getTotalLikesForFoodPartner;
