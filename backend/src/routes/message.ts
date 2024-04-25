import { Router } from "express";
import { createMessage } from "../controller/message";
const router = Router();

router.get("/", (req, res) => {
  console.log("here");
  res.send("new route");
});

router.post("/", createMessage);

export default router;
