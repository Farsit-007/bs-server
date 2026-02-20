import { Router } from "express";
import { userController } from "./user.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.OWNER, UserRole.SITTER),
  userController.getMe,
);
router.get("/pet", auth(UserRole.ADMIN), userController.getAllPets);
router.get("/all", auth(UserRole.ADMIN), userController.getAllUser);
router.get("/:id", auth(UserRole.ADMIN), userController.getSingleUser);
router.patch("/:id", auth(UserRole.ADMIN), userController.updateUser);

export const userRouter = router;
