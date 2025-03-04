import express from "express";
import { signup, login, logout  } from "../controllers/authController.js";
import { protectRoute } from "../middleware/auth.js";
const router = express.Router();

router.post("/signup",signup); //postman
router.post("/login",login);

router.post("/logout",logout);

router.get("/me,", protectRoute, (req, res) => {
    res.send({ 
        success: true,
        message: "User fetched successfully",   
        user: req.user });
});

export default router;