import { Router } from "express";
import {
  createSubject,
  getAllSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubject,
} from "./subject.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = Router();

router.post("/", authenticate, authorizeRoles("ADMIN"), createSubject);
router.get("/", authenticate, getAllSubjects);
router.get("/:id", authenticate, getSingleSubject);
router.patch("/:id", authenticate, authorizeRoles("ADMIN"), updateSubject);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteSubject);

export default router;