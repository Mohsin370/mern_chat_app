import { Router } from "express";
import { createMessage } from "../controller/message";
const router = Router();

router.post("/", createMessage);

export default router;
