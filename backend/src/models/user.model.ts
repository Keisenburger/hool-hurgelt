import mongoose from "mongoose";
const { Schema, model } = mongoose;

const authSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

export const User = model("Users", authSchema);
