import { Router } from "express";
import { createMessage } from "../controller/message";
import { authorizeMiddleware } from "../middleware/authMiddleware";
const router = Router();

router.post("/", authorizeMiddleware, createMessage);

export default router;
