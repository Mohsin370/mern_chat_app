import { Schema, model } from "mongoose";
import { IUserSchema } from "../interface/interface";

const UserSchema = new Schema<IUserSchema>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
    default: "anonymous",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  image: { type: String },
});

const user = model<IUserSchema>("User", UserSchema);
export default user;
