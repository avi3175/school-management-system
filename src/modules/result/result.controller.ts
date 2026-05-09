import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createResultSchema, bulkResultSchema } from "./result.validation.js";
import {
  createResultService,
  bulkResultService,
  getResultsByExamService,
  getStudentResultsService,
  updateResultService,
  deleteResultService,
} from "./result.service.js";

// ➕ Create Single Result
export const createResult = asyncHandler(async (req: Request, res: Response) => {
  const validated = createResultSchema.parse(req.body);

  const result = await createResultService(validated);

  res.status(201).json({ success: true, data: result });
});

// ➕ Bulk Results
export const bulkResult = asyncHandler(async (req: Request, res: Response) => {
  const validated = bulkResultSchema.parse(req.body);

  const result = await bulkResultService(validated);

  res.status(201).json({ success: true, data: result });
});

// 📥 Get Results by Exam
export const getResultsByExam = asyncHandler(async (req: Request, res: Response) => {
  const examId = typeof req.params.examId === "string" ? req.params.examId : null;

  if (!examId) return res.status(400).json({ success: false, message: "Invalid exam id" });

  const results = await getResultsByExamService(examId);

  res.json({ success: true, data: results });
});

// 📄 Get Student Results
export const getStudentResults = asyncHandler(async (req: Request, res: Response) => {
  const studentId = typeof req.params.studentId === "string" ? req.params.studentId : null;

  if (!studentId) return res.status(400).json({ success: false, message: "Invalid student id" });

  const results = await getStudentResultsService(studentId);

  res.json({ success: true, data: results });
});

// ✏️ Update Result
export const updateResult = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid result id" });

  const result = await updateResultService(id, req.body);

  res.json({ success: true, data: result });
});

// ❌ Delete Result
export const deleteResult = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid result id" });

  await deleteResultService(id);

  res.json({ success: true, message: "Result deleted successfully" });
});