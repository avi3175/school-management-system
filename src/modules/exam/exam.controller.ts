import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createExamSchema } from "./exam.validation.js";
import {
  createExamService,
  getAllExamsService,
  getSingleExamService,
  updateExamService,
  deleteExamService,
} from "./exam.service.js";

// ➕ Create Exam
export const createExam = asyncHandler(async (req: Request, res: Response) => {
  const validated = createExamSchema.parse(req.body);

  const exam = await createExamService(validated);

  res.status(201).json({ success: true, data: exam });
});

// 📥 Get All Exams
export const getAllExams = asyncHandler(async (req: Request, res: Response) => {
  const result = await getAllExamsService(req.query);

  res.json({ success: true, data: result.exams, meta: result.meta });
});

// 📄 Get Single Exam
export const getSingleExam = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid exam id" });

  const exam = await getSingleExamService(id);

  if (!exam) return res.status(404).json({ success: false, message: "Exam not found" });

  res.json({ success: true, data: exam });
});

// ✏️ Update Exam
export const updateExam = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid exam id" });

  const exam = await updateExamService(id, req.body);

  res.json({ success: true, data: exam });
});

// ❌ Delete Exam
export const deleteExam = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid exam id" });

  await deleteExamService(id);

  res.json({ success: true, message: "Exam deleted successfully" });
});