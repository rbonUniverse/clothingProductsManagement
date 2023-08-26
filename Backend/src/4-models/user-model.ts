import mongoose from "mongoose";
import RoleModel from "./role-model";

export interface IUserModel extends mongoose.Document {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: RoleModel;
}

export const UserSchema = new mongoose.Schema<IUserModel>(
  {
    firstName: {
      type: String,
      required: [true, "Missing first name"],
      minlength: [2, "First name too short"],
      maxlength: [30, "First name long"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Missing Last name"],
      minlength: [2, "Last name too short"],
      maxlength: [30, "Last name long"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Missing username"],
      minlength: [2, "Username too short"],
      maxlength: [30, "Username long"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Missing password"],
      minlength: [2, "Password too short"],
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      enum: [RoleModel.Admin, RoleModel.User], // Use enum values here
      required: [true, "Missing role"],
    },
  },
  {
    versionKey: false, // Don't add __v for new documents
    toJSON: { virtuals: true }, // Create virtual fields when returning JSON
    id: false,
  }
);

export const UserModel = mongoose.model<IUserModel>(
  "UserModel",
  UserSchema,
  "users"
);
