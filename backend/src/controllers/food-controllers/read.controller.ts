import { Request, Response } from "express";
import { Food } from "../../models/index.js";

export const getAllFoods = async (_req: Request, res: Response) => {
  try {
    const foods = await Food.find().populate("category");
    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.error("Error fetching food:", error);
    res.status(404).json({ success: false, error: "Failed to fetch foods" });
  }
};
