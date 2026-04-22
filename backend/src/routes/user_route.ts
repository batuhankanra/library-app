import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getUser, updateUserByAdmin } from "../controllers/admin.controller";
import { requireRole } from "../middlewares/role";

const router = Router();

router.get(
  "/",
  authMiddleware,
  requireRole("admin"),
  getUser
);
router.patch(
  "/users/:id",
  authMiddleware,
  requireRole("admin"),
  updateUserByAdmin
);

export default router;