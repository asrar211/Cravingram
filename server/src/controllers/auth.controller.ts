import { Request, Response } from "express";
import { User } from "../models/user.model";
import { FoodPartner } from "../models/foodPartner.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All Fields are Required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Already Registered Please Login" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.cookie("user_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(201).json({
      message: "User Registered Successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All Fields are Required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Invalid Credentials" });

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.cookie("user_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({
      message: "User Logged in Successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("user_token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};


export const registerFoodPartner = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All Fields are Required" });

    const existing = await FoodPartner.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Already Registered Please Login" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const partner = await FoodPartner.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: partner._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.cookie("partner_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(201).json({
      message: "Food Partner Registered Successfully",
      foodPartner: { id: partner._id, name: partner.name, email: partner.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const loginFoodPartner = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All Fields are Required" });

    const partner = await FoodPartner.findOne({ email });
    if (!partner)
      return res.status(404).json({ message: "Invalid Credentials" });

    const comparePassword = await bcrypt.compare(password, partner.password);
    if (!comparePassword)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: partner._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });


    res.cookie("partner_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({
      message: "Food Partner Logged in Successfully",
      foodPartner: {
        id: partner._id,
        name: partner.name,
        email: partner.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const logoutFoodPartner = async (req: Request, res: Response) => {
  try {
    res.clearCookie("partner_token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
