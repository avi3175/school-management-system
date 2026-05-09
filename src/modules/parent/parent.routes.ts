import { Router } from "express";
import {
  createParent,
  getAllParents,
  getSingleParent,
  updateParent,
  deleteParent,
} from "./parent.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = Router();

router.post("/", authenticate, authorizeRoles("ADMIN"), createParent);
router.get("/", authenticate, getAllParents);
router.get("/:id", authenticate, getSingleParent);
router.patch("/:id", authenticate, authorizeRoles("ADMIN"), updateParent);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteParent);

export default router;