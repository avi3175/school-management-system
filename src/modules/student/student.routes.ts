import { Router } from "express";

import {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
} from "./student.controller.js";

import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = Router();

// 🔒 Create Student (ADMIN only)
router.post(
  "/",
  authenticate,
  authorizeRoles("ADMIN"),
  createStudent
);

// 👀 Get all students (logged in users)
router.get("/", authenticate, getAllStudents);

// 📄 Get single student
router.get("/:id", authenticate, getSingleStudent);

// ✏️ Update student (ADMIN only)
router.patch(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  updateStudent
);

// ❌ Delete student (ADMIN only)
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  deleteStudent
);

export default router;