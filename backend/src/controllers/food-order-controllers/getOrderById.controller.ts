import { Request, Response } from "express";
import { FoodOrder } from "../../models/index.js";

export const getFoodOrderById = async (req: Request, res: Response) => {
  try {
    const id = req.params.foodOrderId;
    const foodOrder = await FoodOrder.findById(id).populate([
      {
        path: "foodOrderItems",
        populate: {
          path: "category",
        },
      },
      { path: "user" },
    ]);

    res.json({
      success: true,
      data: foodOrder,
    });
  } catch (error) {
    console.error("Error fetching Order:", error);
    res
      .status(404)
      .json({ success: false, error: "Failed to fetch food order" });
  }
};
