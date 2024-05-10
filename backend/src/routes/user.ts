import { Router } from "express";
import { login, signup, getUsers } from "../controller/user";
import { authorizeMiddleware } from "../middleware/authMiddleware";
const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/:id", authorizeMiddleware, getUsers);

export default router;
