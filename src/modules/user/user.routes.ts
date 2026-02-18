import { Router } from "express";
import { userController } from "./user.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.OWNER, UserRole.SITTER),
  userController.getMe,
);

export const userRouter = router;
