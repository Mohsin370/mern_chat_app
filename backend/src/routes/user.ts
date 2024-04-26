import { Router } from "express";
import { login, signup, getUsers } from "../controller/user";
const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/:id', getUsers);



export default router;