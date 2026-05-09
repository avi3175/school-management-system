import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createAttendanceSchema, bulkAttendanceSchema } from "./attendance.validation.js";
import {
  createAttendanceService,
  bulkAttendanceService,
  getAttendanceByDateService,
  getStudentAttendanceReportService,
  updateAttendanceService,
} from "./attendance.service.js";

// ➕ Mark Single Attendance
export const markAttendance = asyncHandler(async (req: Request, res: Response) => {
  const validated = createAttendanceSchema.parse(req.body);

  const attendance = await createAttendanceService(validated);

  res.status(201).json({ success: true, data: attendance });
});

// ➕ Bulk Attendance
export const bulkAttendance = asyncHandler(async (req: Request, res: Response) => {
  const validated = bulkAttendanceSchema.parse(req.body);

  const result = await bulkAttendanceService(validated);

  res.status(201).json({ success: true, data: result });
});

// 📥 Get Attendance by Date
export const getAttendanceByDate = asyncHandler(async (req: Request, res: Response) => {
  const attendance = await getAttendanceByDateService(req.query);

  res.json({ success: true, data: attendance });
});

// 📄 Student Attendance Report
export const getStudentReport = asyncHandler(async (req: Request, res: Response) => {
  const studentId = typeof req.params.studentId === "string" ? req.params.studentId : null;

  if (!studentId) return res.status(400).json({ success: false, message: "Invalid student id" });

  const result = await getStudentAttendanceReportService(studentId, req.query);

  res.json({ success: true, ...result });
});

// ✏️ Update Attendance
export const updateAttendance = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid attendance id" });

  const attendance = await updateAttendanceService(id, req.body);

  res.json({ success: true, data: attendance });
});