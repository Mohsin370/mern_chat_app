import { Request, Response } from "express";
import Message from "../models/Message";
import Conversation from "../models/Conversations";
import { IMessageSchema } from "../interface/interface";
import mongoose from "mongoose";

const createMessage = async (req: Request, res: Response) => {
  try {
    let conversationId = req.body.conversationId;
    let receiver =  new mongoose.Types.ObjectId(req.body.receiver)
    if (!conversationId) {
      //try to find conversation between two users
      const res = await Conversation.findOne({
        participants: { $all: [req.body.sender, receiver] },
      })
        .select("_id")
        .exec();
      conversationId = res?._id;

      if (!conversationId) {
        //createConversation if does not exist
        await Conversation.create({
          participants: [req.body.sender, req.body.receiver],
        }).then((el) => {
          conversationId = el._id;
        });
      }
    }
    req.body.conversationId = conversationId;

    const message: IMessageSchema = await Message.create(req.body);

    await Conversation.findByIdAndUpdate(conversationId, {
      //ad ref object of messages in conversation
      $push: { messages: message._id },
    });

    res.status(201).json({ message, conversationId });
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
