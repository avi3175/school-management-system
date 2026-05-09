import { Router } from "express";
import {
  createParent,
  getMyProfile,
  updateMyProfile,
  getAllParents,
  getSingleParent,
  updateParent,
  deleteParent,
} from "./parent.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = Router();

// 🌐 Public registration
router.post("/", createParent);

// 👤 My Profile (for logged-in parent)
router.get("/me", authenticate, authorizeRoles("PARENT"), getMyProfile);
router.patch("/me", authenticate, authorizeRoles("PARENT"), updateMyProfile);

// 👀 View routes (authenticated users)
router.get("/", authenticate, getAllParents);
router.get("/:id", authenticate, getSingleParent);

// 🔒 Admin routes
router.patch("/:id", authenticate, authorizeRoles("ADMIN"), updateParent);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteParent);

export default router;