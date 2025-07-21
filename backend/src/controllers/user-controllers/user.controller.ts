import { Request, Response } from "express";
import { User } from "../../models/user.model.js";
import bcrypt from "bcrypt";

export const refresh = (req: Request, res: Response) => {
  res.send("auth/refresh GET huselt irle");
};

export const resetPasswordReq = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne(email);
    console.log(user);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};

export const verifyResetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOneAndUpdate(email, {
      isVerified: true,
    });
    const newUsre = await User.findOne(email);
    console.log(newUsre);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = bcrypt.hash(password, salt);
    const user = await User.findOneAndUpdate(email, {
      password: hashedPassword,
    });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
