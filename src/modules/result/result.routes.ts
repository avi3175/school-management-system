import { Router } from "express";
import {
  createResult,
  bulkResult,
  getResultsByExam,
  getStudentResults,
  updateResult,
  deleteResult,
} from "./result.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = Router();

router.post("/", authenticate, authorizeRoles("ADMIN", "TEACHER"), createResult);
router.post("/bulk", authenticate, authorizeRoles("ADMIN", "TEACHER"), bulkResult);
router.get("/exam/:examId", authenticate, getResultsByExam);
router.get("/student/:studentId", authenticate, getStudentResults);
router.patch("/:id", authenticate, authorizeRoles("ADMIN", "TEACHER"), updateResult);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteResult);

export default router;