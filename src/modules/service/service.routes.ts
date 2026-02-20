import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { serviceController } from "./service.controller";

const router = Router();

router.post("/", auth(UserRole.SITTER), serviceController.createService);
router.get("/", auth(UserRole.SITTER), serviceController.getOwnAllService);
router.get("/public", serviceController.getPublicService);
router.get("/:id", auth(UserRole.SITTER), serviceController.getSingleService);
export const serviceRouter = router;
