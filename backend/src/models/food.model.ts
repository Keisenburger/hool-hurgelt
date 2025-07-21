import mongoose from "mongoose";
const { Schema, model } = mongoose;
const foodSchema = new Schema({
  foodName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "FoodCategory",
  },

  createdAt: Date,
  updatedAt: Date,
});

export const Food = model("Food", foodSchema);

// pass = VUdkhPNDzxXy6NwJ
// username = erdembileg0906
