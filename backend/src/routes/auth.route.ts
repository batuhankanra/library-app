import { Router } from "express";
import {  getMyProfile, login, register, } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", authMiddleware, getMyProfile);
export default router;