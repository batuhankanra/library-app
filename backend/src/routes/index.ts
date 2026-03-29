import { Router } from "express";
import authRoutes from "./auth.route";
import book from "./book"
import borrow from "./borrow"
import admin from "./admin"
const router = Router();

router.use("/auth", authRoutes);
router.use("/book",book)
router.use("/borrow",borrow)
router.use("/admin",admin)
export default router;