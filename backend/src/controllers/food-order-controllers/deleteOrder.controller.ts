import { Request, Response } from "express";
import { FoodOrder } from "../../models/index.js";

export const deleteFoodOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.foodOrderId;
    const deletedOrder = await FoodOrder.findByIdAndDelete(id);

    if (!deletedOrder) {
      console.error("Error finding Order");
      res.status(404).json({
        success: false,
        error: "Failed to find order",
      });
    }
    res.json({
      success: true,
      data: deletedOrder,
    });
  } catch (error) {
    console.error("Error deleting Order:", error);
    res.status(400).json({
      success: false,
      error: "Failed to delete Order",
    });
  }
};
