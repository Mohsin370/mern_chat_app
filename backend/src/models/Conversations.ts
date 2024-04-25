import { Schema, model } from "mongoose";
import { IConversationSchema } from "../interface/interface";

const ConversationSchema = new Schema<IConversationSchema>({

    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message"
    }],

    participants: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],


    
}, { timestamps: true });


const Conversation = model<IConversationSchema>("Conversation", ConversationSchema);


export default Conversation;