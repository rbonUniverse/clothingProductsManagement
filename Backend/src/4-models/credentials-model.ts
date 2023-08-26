import mongoose from "mongoose";

export interface ICredentialsModel extends mongoose.Document {
  username: string;
  password: string;
}

export const CredentialsSchema = new mongoose.Schema<ICredentialsModel>(
  {
    username: {
      type: String,
      required: [true, "Missing first name"],
      minlength: [2, "First name too short"],
      maxlength: [30, "First name long"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Missing Last name"],
      minlength: [2, "Last name too short"],
      maxlength: [30, "Last name long"],
      trim: true,
    },
  },
  {
    versionKey: false, // Don't add __v for new documents
    id: false,
  }
);

export const CredentialsModel = mongoose.model<ICredentialsModel>(
  "CredentialsModel",
  CredentialsSchema,
  "credentials"
);
