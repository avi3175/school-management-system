import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createClassSchema } from "./class.validation.js";
import {
  createClassService,
  getAllClassesService,
  getSingleClassService,
  updateClassService,
  deleteClassService,
} from "./class.service.js";

// ➕ Create Class
export const createClass = asyncHandler(async (req: Request, res: Response) => {
  const validated = createClassSchema.parse(req.body);

  const classData = await createClassService(validated);

  res.status(201).json({ success: true, data: classData });
});

// 📥 Get All Classes
export const getAllClasses = asyncHandler(async (req: Request, res: Response) => {
  const result = await getAllClassesService(req.query);

  res.json({ success: true, data: result.classes, meta: result.meta });
});

// 📄 Get Single Class
export const getSingleClass = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid class id" });

  const classData = await getSingleClassService(id);

  if (!classData) return res.status(404).json({ success: false, message: "Class not found" });

  res.json({ success: true, data: classData });
});

// ✏️ Update Class
export const updateClass = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid class id" });

  const classData = await updateClassService(id, req.body);

  res.json({ success: true, data: classData });
});

// ❌ Delete Class
export const deleteClass = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid class id" });

  await deleteClassService(id);

  res.json({ success: true, message: "Class deleted successfully" });
});