import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import studentRoutes from "../modules/student/student.routes.js";
import teacherRoutes from "../modules/teacher/teacher.routes.js"; // ✅ add
import parentRoutes from "../modules/parent/parent.routes.js"; // ✅ add
const router = Router();
// Example route
router.get("/test", (req, res) => {
    res.json({ message: "API working" });
});
router.use("/auth", authRoutes);
router.use("/students", studentRoutes);
router.use("/teachers", teacherRoutes); // ✅ add
router.use("/parents", parentRoutes); // ✅ add
// 🔒 Protected route
router.get("/admin-only", authenticate, authorizeRoles("ADMIN"), (req, res) => {
    res.json({ message: "Welcome Admin!" });
});
export default router;
//# sourceMappingURL=index.js.map