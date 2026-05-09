import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createParentSchema } from "./parent.validation.js";
import {
  createParentService,
  getAllParentsService,
  getSingleParentService,
  getParentByUserIdService,
  updateParentService,
  deleteParentService,
} from "./parent.service.js";

// ➕ Create Parent (Public registration)
export const createParent = async (req: Request, res: Response) => {
  try {
    const validated = createParentSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const parent = await createParentService({
      ...validated,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, data: parent });
  } catch (err: any) {
    if (err.code === "P2002") {
      const field = err.meta?.target?.[0];
      return res.status(409).json({ success: false, message: `${field} already exists` });
    }
    res.status(400).json({ success: false, message: err.message });
  }
};

// 👤 My Profile
export const getMyProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  const parent = await getParentByUserIdService(userId);

  if (!parent) {
    return res.status(404).json({ success: false, message: "Parent profile not found" });
  }

  res.json({ success: true, data: parent });
});

// ✏️ Update My Profile
export const updateMyProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  const parent = await getParentByUserIdService(userId);

  if (!parent) {
    return res.status(404).json({ success: false, message: "Parent profile not found" });
  }

  const updated = await updateParentService(parent.id, req.body);

  res.json({ success: true, data: updated });
});

// 📥 Get All Parents
export const getAllParents = asyncHandler(async (req: Request, res: Response) => {
  const result = await getAllParentsService(req.query);

  res.json({ success: true, data: result.parents, meta: result.meta });
});

// 📄 Get Single Parent
export const getSingleParent = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid parent id" });

  const parent = await getSingleParentService(id);

  if (!parent) return res.status(404).json({ success: false, message: "Parent not found" });

  res.json({ success: true, data: parent });
});

// ✏️ Update Parent (Admin)
export const updateParent = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid parent id" });

  const parent = await updateParentService(id, req.body);

  res.json({ success: true, data: parent });
});

// ❌ Delete Parent
export const deleteParent = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid parent id" });

  await deleteParentService(id);

  res.json({ success: true, message: "Parent deleted successfully" });
});