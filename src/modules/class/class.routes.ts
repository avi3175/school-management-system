import { Router } from "express";
import {
  createClass,
  getAllClasses,
  getSingleClass,
  updateClass,
  deleteClass,
} from "./class.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = Router();

router.post("/", authenticate, authorizeRoles("ADMIN"), createClass);
router.get("/", authenticate, getAllClasses);
router.get("/:id", authenticate, getSingleClass);
router.patch("/:id", authenticate, authorizeRoles("ADMIN"), updateClass);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteClass);

export default router;