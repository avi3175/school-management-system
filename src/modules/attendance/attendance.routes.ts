import { Router } from "express";
import {
  markAttendance,
  bulkAttendance,
  getAttendanceByDate,
  getStudentReport,
  updateAttendance,
} from "./attendance.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = Router();

router.post("/", authenticate, authorizeRoles("ADMIN", "TEACHER"), markAttendance);
router.post("/bulk", authenticate, authorizeRoles("ADMIN", "TEACHER"), bulkAttendance);
router.get("/", authenticate, getAttendanceByDate);
router.get("/student/:studentId", authenticate, getStudentReport);
router.patch("/:id", authenticate, authorizeRoles("ADMIN", "TEACHER"), updateAttendance);

export default router;