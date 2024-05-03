import { Router } from "express";
import { createMessage } from "../controller/message";
import { authorizeMiddleware } from "../middleware/middleware";
const router = Router();

router.post("/", authorizeMiddleware, createMessage);

export default router;
