import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { sitterController } from "./sitter.controller";

const router = Router();

router.post("/", auth(UserRole.SITTER), sitterController.createSitter);
router.get("/", auth(UserRole.ADMIN), sitterController.getOwnAllSitter);
router.get("/:id", auth(UserRole.SITTER), sitterController.getSingleSitter);

router.patch(
  "/bookings/:id",
  auth(UserRole.SITTER),
  sitterController.updateSitterBookingStatus,
);
export const sitterRouter = router;
