import { Router } from "express";
import { getConversationMessages, getUserConversations } from "../controller/conversation";
const router = Router();

router.get("/", (req, res) => {
  console.log("here");
  res.send("new route");
});

router.get("/:userId", getUserConversations);
router.get("/:userId/:participantId", getConversationMessages);

export default router;
