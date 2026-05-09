import { Router } from "express";
import { getDashboardStats } from "./dashboard.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = Router();

router.get("/", authenticate, authorizeRoles("ADMIN"), getDashboardStats);

export default router;