import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createSubjectSchema } from "./subject.validation.js";
import {
  createSubjectService,
  getAllSubjectsService,
  getSingleSubjectService,
  updateSubjectService,
  deleteSubjectService,
} from "./subject.service.js";

// ➕ Create Subject
export const createSubject = asyncHandler(async (req: Request, res: Response) => {
  const validated = createSubjectSchema.parse(req.body);

  const subject = await createSubjectService(validated);

  res.status(201).json({ success: true, data: subject });
});

// 📥 Get All Subjects
export const getAllSubjects = asyncHandler(async (req: Request, res: Response) => {
  const result = await getAllSubjectsService(req.query);

  res.json({ success: true, data: result.subjects, meta: result.meta });
});

// 📄 Get Single Subject
export const getSingleSubject = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid subject id" });

  const subject = await getSingleSubjectService(id);

  if (!subject) return res.status(404).json({ success: false, message: "Subject not found" });

  res.json({ success: true, data: subject });
});

// ✏️ Update Subject
export const updateSubject = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid subject id" });

  const subject = await updateSubjectService(id, req.body);

  res.json({ success: true, data: subject });
});

// ❌ Delete Subject
export const deleteSubject = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid subject id" });

  await deleteSubjectService(id);

  res.json({ success: true, message: "Subject deleted successfully" });
});