import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createParentSchema } from "./parent.validation.js";
import {
  createParentService,
  getAllParentsService,
  getSingleParentService,
  updateParentService,
  deleteParentService,
} from "./parent.service.js";

// ➕ Create Parent
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
    res.status(400).json({ success: false, message: err.message });
  }
};

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

// ✏️ Update Parent
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

  const parent = await deleteParentService(id);

  res.json({ success: true, message: "Parent deleted successfully", data: parent });
});