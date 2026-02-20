import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { BookingController } from "./booking.controller";

const router = Router();

router.post("/", auth(UserRole.OWNER), BookingController.createBooking);
router.get(
  "/sitter",
  auth(UserRole.SITTER),
  BookingController.getSitterBooking,
);

router.get(
  "/sitter/:id",
  auth(UserRole.SITTER),
  BookingController.getSitterSingleBooking,
);

router.get("/owner", auth(UserRole.OWNER), BookingController.getOwnerBooking);

router.get(
  "/owner/:id",
  auth(UserRole.OWNER),
  BookingController.getOwnerSingleBooking,
);

router.get("/:id", auth(UserRole.OWNER), BookingController.getSingleBooking);


export const bookingRouter = router;
