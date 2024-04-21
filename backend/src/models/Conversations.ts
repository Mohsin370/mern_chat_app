import { Schema } from "mongoose";
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


export default ConversationSchema;