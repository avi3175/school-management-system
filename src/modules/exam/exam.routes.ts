import { Router } from "express";
import {
  createExam,
  getAllExams,
  getSingleExam,
  updateExam,
  deleteExam,
} from "./exam.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = Router();

router.post("/", authenticate, authorizeRoles("ADMIN"), createExam);
router.get("/", authenticate, getAllExams);
router.get("/:id", authenticate, getSingleExam);
router.patch("/:id", authenticate, authorizeRoles("ADMIN"), updateExam);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteExam);

export default router;