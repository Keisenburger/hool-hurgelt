import { Request, Response } from "express";
import { Food } from "../../models/index.js";

export const deleteFood = async (req: Request, res: Response) => {
  try {
    const id = req.params.foodId;

    const deleteFood = await Food.findByIdAndDelete(id);
    if (!deleteFood) {
      console.error("Error finding food");
      res.status(404).json({ success: false, error: "Failed to find food" });
    }

    res.json({
      success: true,
      deletedData: deleteFood,
    });
  } catch (error) {
    console.error("Error deleting food:", error);
    res.status(400).json({ success: false, error: "Failed to delete food" });
  }
};
