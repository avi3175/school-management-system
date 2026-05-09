import { Router } from "express";
import {
  createSection,
  getAllSections,
  getSingleSection,
  updateSection,
  deleteSection,
} from "./section.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = Router();

router.post("/", authenticate, authorizeRoles("ADMIN"), createSection);
router.get("/", authenticate, getAllSections);
router.get("/:id", authenticate, getSingleSection);
router.patch("/:id", authenticate, authorizeRoles("ADMIN"), updateSection);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteSection);

export default router;