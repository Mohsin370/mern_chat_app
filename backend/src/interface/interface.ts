import { Schema } from "mongoose";

interface IUserSchema extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  __v: number;
}

interface IMessageSchema extends Document {
  _id: string;
  message: string;
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  date: Date;
  createdAt: Date;
  isRead: boolean;
}

interface IConversationSchema extends Document {
  _id: string;
  participants: Schema.Types.ObjectId[];
  messages: IMessageSchema[];
  createdAt: Date;
  updatedAt: Date;
}

export  { IUserSchema, IMessageSchema, IConversationSchema };
