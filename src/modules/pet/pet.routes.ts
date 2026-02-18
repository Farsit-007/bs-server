import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { petController } from "./pet.controller";

const router = Router();

router.post("/", auth(UserRole.OWNER), petController.createPet);
router.get("/", auth(UserRole.OWNER), petController.getOwnAllPet);
router.get("/:id", auth(UserRole.OWNER), petController.getSinglePet);
export const petRouter = router;
