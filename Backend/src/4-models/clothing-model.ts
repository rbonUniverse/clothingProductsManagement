import mongoose from "mongoose";

export interface IClothingModel extends mongoose.Document {
  brand: string;
  clothingType: string;
  price: number;
  material: string;
}

export const ClothingSchema = new mongoose.Schema<IClothingModel>(
  {
    brand: {
      type: String,
      required: [true, "Missing brand"],
      minlength: [2, "Brand name too short"],
      maxlength: [30, "Band name too long"],
      trim: true,
      unique: true,
    },
    clothingType: {
      type: String,
      required: [true, "Missing clothingType"],
      minlength: [2, "Clothing Type too short"],
      maxlength: [30, "Clothing Type too long"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Missing price"],
      min: [1, "Price can not be below 0"],
      max: [10000, "Price can not exceed 500"],
      trim: true,
    },
    material: {
      type: String,
      required: [true, "Missing material"],
      min: [0, "Material can not be below 0"],
      max: [20, "Material can not exceed 20"],
      trim: true,
    },
  },
  {
    versionKey: false, // Don't add __v for new documents
  }
);

export const ClothingModel = mongoose.model<IClothingModel>(
  "ClothingModel",
  ClothingSchema,
  "clothing"
);
