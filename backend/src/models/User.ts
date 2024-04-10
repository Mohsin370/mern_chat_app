import { Schema, model } from "mongoose";

interface IUserSchema extends Document {
  name: string;
  email: string;
  password: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  __v: number;
  id: string;
}

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
  picture: { type: String },
});


const user = model<IUserSchema>("User", UserSchema);
export default user;
