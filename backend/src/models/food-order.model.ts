import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;
const foodOrderSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "Users",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  foodOrderItems: [
    {
      type: {
        foodId: Types.ObjectId,
        quantity: Number,
      },
      ref: "FoodOrderItem",
      required: true,
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "Cancelled", "Delivered"],
    default: "Pending",
  },
  createdAt: Date,
  updatedAt: Date,
});

export const FoodOrder = model("FoodOrder", foodOrderSchema);
