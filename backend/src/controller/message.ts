import { Request, Response } from "express";
import Message from "../models/Message";
import Conversation from "../models/Conversations";

const createMessage = async (req: Request, res: Response) => {
  try {

    let conversationId = req.body.conversationId;
    if(!conversationId){
        //createConversation
        conversationId = await Conversation.create({
            participants: [req.body.sender, req.body.receiver]
        });
    }
    req.body.conversationId = conversationId;

    const message = await Message.create(req.body);
    res.status(201).json(message);
    return;
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error while creating message",
      error: err,
    });

    throw err;
  }
};

export { createMessage };
