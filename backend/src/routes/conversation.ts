import { Router } from "express";
import { getConversationMessages, getUserConversations } from "../controller/conversation";
const router = Router();



router.get("/user/:userId", getUserConversations);
router.get("/:conversationId?", getConversationMessages);

export default router;
