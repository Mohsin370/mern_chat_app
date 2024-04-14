import { Router } from "express";
const router = Router();

router.get('/', (req, res) => {
    console.log("here")
    res.send('new route');
});



export default router;