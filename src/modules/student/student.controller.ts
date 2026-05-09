import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createStudentSchema } from "./student.validation.js";
import {
  createStudentService,
  getAllStudentsService,
  getSingleStudentService,
  getStudentByUserIdService,
  updateStudentService,
  deleteStudentService,
} from "./student.service.js";

// ➕ Create Student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const validated = createStudentSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const student = await createStudentService({
      ...validated,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, data: student });
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

  const student = await getStudentByUserIdService(userId);

  if (!student) {
    return res.status(404).json({ success: false, message: "Student profile not found" });
  }

  res.json({ success: true, data: student });
});

// ✏️ Update My Profile
export const updateMyProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  const student = await getStudentByUserIdService(userId);

  if (!student) {
    return res.status(404).json({ success: false, message: "Student profile not found" });
  }

  const updated = await updateStudentService(student.id, req.body);

  res.json({ success: true, data: updated });
});

// 📥 Get All Students
export const getAllStudents = asyncHandler(async (req: Request, res: Response) => {
  const result = await getAllStudentsService(req.query);

  res.json({ success: true, data: result.students, meta: result.meta });
});

// 📄 Get Single Student
export const getSingleStudent = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid student id" });

  const student = await getSingleStudentService(id);

  if (!student) return res.status(404).json({ success: false, message: "Student not found" });

  res.json({ success: true, data: student });
});

// ✏️ Update Student (Admin)
export const updateStudent = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid student id" });

  const student = await updateStudentService(id, req.body);

  res.json({ success: true, data: student });
});

// ❌ Delete Student
export const deleteStudent = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid student id" });

  const student = await deleteStudentService(id);

  res.json({ success: true, message: "Student deleted successfully", data: student });
});