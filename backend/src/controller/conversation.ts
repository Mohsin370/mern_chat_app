import { Request, Response } from "express";
import Conversation from "../models/Conversations";
import mongoose, { ObjectId } from "mongoose";

const getConversationMessages = async (req: Request, res: Response) => {
  try {
    const conversations = await Conversation.find({
      participants: { $in: [req.params.userId, req.params.participantId] },
    });

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
  //   participants: { $in: [req.params.userId] },
  try {
    const userId = new mongoose.Types.ObjectId(req.params.userId); // Convert string ID to ObjectId
    const conversation = await Conversation.aggregate([
        {
            $match: { participants: userId }
        },
        {
            $lookup: {
                from: "users",
                localField: "participants",
                foreignField: "_id",
                as: "users"
            }
        },
        {
            $project: {
                _id: 1,
                messages: 1,
                createdAt: 1,
                updatedAt: 1,
                "user": { $arrayElemAt: [
                    {
                        $filter: {
                            input: "$users",
                            as: "user",
                            cond: { $ne: ["$$user._id", userId] }
                        }
                    }
                ,0] },
            }
        }
    ]);
    // {
    //     $project: {
    //       participants: {
    //         $filter: {
    //           input: "$userData",
    //           as: "userData",
    //           cond: { $ne: ["$$userData._id", userId] },
    //         },
    //       },
    //     },
    //   },
    console.log(conversation);
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
