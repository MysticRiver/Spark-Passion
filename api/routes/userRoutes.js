import express from "express";
import { protectRoute } from "../middleware/auth.js";
const router = express.Router();

router.put("/update", protectRoute, (req, res) => {
    res.send("update user");
});

export default router;