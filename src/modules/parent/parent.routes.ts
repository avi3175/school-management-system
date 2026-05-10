import { Router } from "express";
import {
  createParent,
  getMyProfile,
  getMyDashboard,
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

// 📊 My Dashboard
router.get("/me/dashboard", authenticate, authorizeRoles("PARENT"), getMyDashboard);

// 👤 My Profile
router.get("/me", authenticate, authorizeRoles("PARENT"), getMyProfile);
router.patch("/me", authenticate, authorizeRoles("PARENT"), updateMyProfile);

// 👀 View routes
router.get("/", authenticate, getAllParents);
router.get("/:id", authenticate, getSingleParent);

// 🔒 Admin routes
router.patch("/:id", authenticate, authorizeRoles("ADMIN"), updateParent);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteParent);

export default router;