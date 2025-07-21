import { Request, Response } from "express";
import { FoodOrder } from "../../models/index.js";

export const updateFoodOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.foodOrderId;
    const { foodId, totalPrice, status, userId } = req.body;

    const updatedOrder = await FoodOrder.findByIdAndUpdate(
      id,
      {
        user: userId,
        foodOrderItems: foodId,
        totalPrice: totalPrice,
        status: status,
        updatedAt: new Date(),
      },
      { new: true }
    ).populate([
      {
        path: "foodOrderItems",
        populate: {
          path: "category",
        },
      },
      { path: "user" },
    ]);

    if (!updatedOrder) {
      console.error("Error finding Order");
      res
        .status(404)
        .json({ success: false, error: "Failed to find food order" });
    }

    res.json({
      success: true,
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating food order:", error);
    res.status(400).json({
      success: false,
      error: "Failed to update order",
    });
  }
};
