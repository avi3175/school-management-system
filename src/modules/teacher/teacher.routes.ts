import { Router } from "express";
import {
  createTeacher,
  getMyProfile,
  updateMyProfile,
  getAllTeachers,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
} from "./teacher.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = Router();

// 🌐 Public registration
router.post("/", createTeacher);

// 👤 My Profile (for logged-in teacher)
router.get("/me", authenticate, authorizeRoles("TEACHER"), getMyProfile);
router.patch("/me", authenticate, authorizeRoles("TEACHER"), updateMyProfile);

// 👀 Get all teachers (authenticated users)
router.get("/", authenticate, getAllTeachers);

// 📄 Get single teacher
router.get("/:id", authenticate, getSingleTeacher);

// ✏️ Update teacher (ADMIN only)
router.patch("/:id", authenticate, authorizeRoles("ADMIN"), updateTeacher);

// ❌ Delete teacher (ADMIN only)
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteTeacher);

export default router;