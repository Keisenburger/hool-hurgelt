import { Request, Response } from "express";
import { User } from "../../models/index.js";
import bcrypt from "bcrypt";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, phoneNumber, address, password } = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = bcrypt.hash(password, salt);
    const user = await User.create({
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
      address: address,
      isVerified: false,
      createdAt: new Date(),
    });
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Failed to create user:", error);
    res.status(400).json({ success: false, error: "Failed to create user" });
  }
};
