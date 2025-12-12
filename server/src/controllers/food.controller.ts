import { upload } from './../middlewares/multer.middleware';
import { Request, Response } from "express";
import { uploadFile } from "../services/imageKit";
import { v4 as uuidv4 } from 'uuid';
import { FoodItem } from "../models/foodItem.model";

export const addFood =async (req: Request, res: Response) => {
    try {
        const {name, description} = req.body;
        const video = req.file!;
        if (!video || !name || !description) return res.status(400).json({ message: "All fields are required" });

        const foodPartner = (req as any).foodPartner;
        if (!foodPartner) return res.status(401).json({ message: "Unauthorized" });


        const base64 = video.buffer.toString("base64");
        const fileString = `data:${video.mimetype};base64,${base64}`;

        const uploaded = await uploadFile(fileString, uuidv4());
        const foodItem = await FoodItem.create({
            name,
            description,
            videoUrl: uploaded.url,
            videoId: uploaded.fileId,
            foodPartner: (req as any).foodPartner._id
        })
        return res.json({ message: "Food Added", foodItem})
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Server Error"})
    }
};

export const getFood = async (req: Request, res: Response) => {
    try {
        const foodItems = await FoodItem.find({}).populate("foodPartner", "name");

        return res.status(201).json({
            message: "Food Items fetched Successfully",
            foodItems
        })
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Server Error"})
    }
};

export const getFoodItemsByPartner = async (req: Request, res: Response) => {
    try {
        const foodPartner = (req as any).foodPartner;
        if (!foodPartner) return res.status(401).json({ message: "Unauthorized" });
        
        const foodItems = await FoodItem.find({ foodPartner: foodPartner._id}).select("-password");
        return res.status(201).json({
            message: "Food Items fetched Successfully",
            foodItems
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Server Error"})
    }
};

export const likeReel = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;
        const reelId = req.params.id;

        const reel = await FoodItem.findById(reelId);
        if (!reel) return res.status(404).json({ message: "Reel Not Found"})

        const alreadyLiked = reel.likes.includes(userId);
        if(alreadyLiked){
            reel.likes = reel.likes.filter((id) => id.toString() !== userId.toString());
        }else {
            reel.likes.push(userId);
        }

        await reel.save();

        return res.status(201).json({
            liked: !alreadyLiked,
            likesCount: reel.likes.length
        })
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Server Error"})
    }
};


export const getTotalLikesForFoodPartner = async (req: Request, res: Response) => {
  try {
    const foodPartnerId = (req as any).foodPartner._id;

    const items = await FoodItem.find({ foodPartner: foodPartnerId });

    const totalLikes = items.reduce((sum, item) => sum + (item.likes?.length || 0), 0);

    return res.status(200).json({
      foodPartnerId,
      totalLikes,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
