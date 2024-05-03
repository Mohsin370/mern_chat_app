import { Router } from "express";
import { getConversationMessages, getUserConversations } from "../controller/conversation";
import { authorizeMiddleware } from "../middleware/middleware";
const router = Router();

router.get("/user/:userId", authorizeMiddleware, getUserConversations);
router.get("/:conversationId?", authorizeMiddleware, getConversationMessages);

export default router;
