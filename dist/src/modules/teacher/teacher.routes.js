import { Router } from "express";
import { createTeacher, getAllTeachers, getSingleTeacher, updateTeacher, deleteTeacher, } from "./teacher.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
const router = Router();
// 🔒 Create Teacher (ADMIN only)
router.post("/", authenticate, authorizeRoles("ADMIN"), createTeacher);
// 👀 Get all teachers (authenticated users)
router.get("/", authenticate, getAllTeachers);
// 📄 Get single teacher
router.get("/:id", authenticate, getSingleTeacher);
// ✏️ Update teacher (ADMIN only)
router.patch("/:id", authenticate, authorizeRoles("ADMIN"), updateTeacher);
// ❌ Delete teacher (ADMIN only)
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteTeacher);
export default router;
//# sourceMappingURL=teacher.routes.js.map