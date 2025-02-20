import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    genderPreference: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    bio: {
      type: String,
      default: "",
    },
      
    profilePicture: {
      type: String,
      default: "",
    },
    likes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dislikes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    matches: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    },
);