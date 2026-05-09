import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import studentRoutes from "../modules/student/student.routes.js";
import teacherRoutes from "../modules/teacher/teacher.routes.js"; // ✅ add
import parentRoutes from "../modules/parent/parent.routes.js"; // ✅ add
import subjectRoutes from "../modules/subject/subject.routes.js";
import attendanceRoutes from "../modules/attendance/attendance.routes.js";
import examRoutes from "../modules/exam/exam.routes.js";
import resultRoutes from "../modules/result/result.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";
import classRoutes from "../modules/class/class.routes.js";
import sectionRoutes from "../modules/section/section.routes.js";








const router = Router();

// Example route
router.get("/test", (req, res) => {
  res.json({ message: "API working" });
});

router.use("/auth", authRoutes);
router.use("/students", studentRoutes);
router.use("/teachers", teacherRoutes); // ✅ add
router.use("/parents", parentRoutes); // ✅ add
router.use("/subjects", subjectRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/exams", examRoutes);
router.use("/results", resultRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/classes", classRoutes);
router.use("/sections", sectionRoutes);








// 🔒 Protected route
router.get(
  "/admin-only",
  authenticate,
  authorizeRoles("ADMIN"),
  (req, res) => {
    res.json({ message: "Welcome Admin!" });
  }
);

export default router;