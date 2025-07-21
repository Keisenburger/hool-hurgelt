import { Request, Response } from "express";
import { Food } from "../../models/index.js";

export const getFoodById = async (req: Request, res: Response) => {
  try {
    const id = req.params.foodId;
    const food = await Food.findById(id).populate("category");
    res.json({
      success: true,
      data: food,
    });
  } catch (error) {
    console.error("Error fetching food", error);
    res.status(404).json({ success: false, error: "Failed to fetch food" });
  }
};
