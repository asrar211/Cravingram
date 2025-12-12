import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { FoodPartner } from "../models/foodPartner.model";
import { User } from "../models/user.model";

export const authFoodPartnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.partner_token;
    if (!token)
      return res.status(401).json({ message: "Please login as a Food Partner" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const foodPartner = await FoodPartner.findById(decoded.id).select("-password");
    if (!foodPartner)
      return res.status(401).json({ message: "Food Partner not found" });

    (req as any).foodPartner = foodPartner;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.user_token;
    if (!token)
      return res.status(401).json({ message: "Please login as a User" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    
    const user = await User.findById(decoded.id).select("-password");
    if (!user)
      return res.status(401).json({ message: "User not found" });

    (req as any).user = user;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
