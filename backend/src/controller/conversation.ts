import { Request, Response } from "express";
import Conversation from "../models/Conversations";
import mongoose from "mongoose";

const getConversationMessages = async (req: Request, res: Response) => {
  try {
    const conversations = await Conversation.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.conversationId),
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "messages",
          foreignField: "_id",
          as: "messages",
        },
      },
    ]);

    res.status(200).send({
      success: true,
      message: "Conversation messages retrieved successfully",
      conversation: conversations,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Cannot retrive conversations messages",
      error: err,
    });
  }
};

const getUserConversations = async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.userId); // Convert string ID to ObjectId
    const conversation = await Conversation.aggregate([
      {
        $match: { participants: userId },
      },
      {
        $lookup: {
          from: "users",
          localField: "participants",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $project: {
          _id: 1,
          messages: 1,
          createdAt: 1,
          updatedAt: 1,
          user: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$users",
                  as: "user",
                  cond: { $ne: ["$$user._id", userId] },
                },
              },
              0,
            ],
          },
        },
      },
    ]);
    res.send({
      success: true,
      message: "Conversations retrieved successfully",
      conversation: conversation,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Cannot retrive conversations",
      error: err,
    });
  }
};

export { getUserConversations, getConversationMessages };
