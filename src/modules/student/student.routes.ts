import { Router } from "express";
import {
  createStudent,
  getMyProfile,
  getMyDashboard,
  updateMyProfile,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
} from "./student.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = Router();

// 🌐 Public registration
router.post("/", createStudent);

// 📊 My Dashboard (for logged-in student)
router.get("/me/dashboard", authenticate, authorizeRoles("STUDENT"), getMyDashboard);

// 👤 My Profile (for logged-in student)
router.get("/me", authenticate, authorizeRoles("STUDENT"), getMyProfile);
router.patch("/me", authenticate, authorizeRoles("STUDENT"), updateMyProfile);

// 👀 View routes (authenticated users)
router.get("/", authenticate, getAllStudents);
router.get("/:id", authenticate, getSingleStudent);

// 🔒 Admin routes
router.patch("/:id", authenticate, authorizeRoles("ADMIN"), updateStudent);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteStudent);

export default router;