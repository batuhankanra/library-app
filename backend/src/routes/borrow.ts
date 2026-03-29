import { Router } from "express";
import { borrow, returnBook } from "../controllers/borrow.controller";
import { authMiddleware } from "../middlewares/auth.middleware";



const router = Router();
router.post("/:id/borrow", authMiddleware, borrow);

router.post("/:id/return", authMiddleware, returnBook);

export default router