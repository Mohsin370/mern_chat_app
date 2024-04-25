import { Schema, model } from "mongoose";
import { IMessageSchema } from "../interface/interface";

const MessageSchema = new Schema<IMessageSchema>({
  message: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  conversationId: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
}, { timestamps: true });

const Message = model<IMessageSchema>("Message", MessageSchema);

export default Message;
