import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createTeacherSchema } from "./teacher.validation.js";
import {
  createTeacherService,
  getAllTeachersService,
  getSingleTeacherService,
  getTeacherByUserIdService,
  updateTeacherService,
  deleteTeacherService,
  getTeacherDashboardService,  // ✅ add this
} from "./teacher.service.js";

// ➕ Create Teacher (Public registration)
export const createTeacher = async (req: Request, res: Response) => {
  try {
    const validated = createTeacherSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const teacher = await createTeacherService({
      ...validated,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      data: teacher,
    });
  } catch (err: any) {
    if (err.code === "P2002") {
      const field = err.meta?.target?.[0];
      return res.status(409).json({ success: false, message: `${field} already exists` });
    }
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// 👤 My Profile
export const getMyProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  const teacher = await getTeacherByUserIdService(userId);

  if (!teacher) {
    return res.status(404).json({
      success: false,
      message: "Teacher not found",
    });
  }

  res.json({ success: true, data: teacher });
});

// ✏️ Update My Profile
export const updateMyProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  const teacher = await getTeacherByUserIdService(userId);

  if (!teacher) {
    return res.status(404).json({
      success: false,
      message: "Teacher not found",
    });
  }

  const updated = await updateTeacherService(teacher.id, req.body);

  res.json({ success: true, data: updated });
});

// 📥 Get All Teachers
export const getAllTeachers = asyncHandler(async (req: Request, res: Response) => {
  const result = await getAllTeachersService(req.query);

  res.json({
    success: true,
    data: result.teachers,
    meta: result.meta,
  });
});

// 📄 Get Single Teacher
export const getSingleTeacher = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid teacher id",
    });
  }

  const teacher = await getSingleTeacherService(id);

  if (!teacher) {
    return res.status(404).json({
      success: false,
      message: "Teacher not found",
    });
  }

  res.json({
    success: true,
    data: teacher,
  });
});

// ✏️ Update Teacher (Admin)
export const updateTeacher = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid teacher id",
    });
  }

  const teacher = await updateTeacherService(id, req.body);

  res.json({
    success: true,
    data: teacher,
  });
});

// ❌ Delete Teacher
export const deleteTeacher = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid teacher id",
    });
  }

  const teacher = await deleteTeacherService(id);

  res.json({
    success: true,
    message: "Teacher deleted successfully",
    data: teacher,
  });
});








// 📊 My Dashboard
export const getMyDashboard = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  const teacher = await getTeacherByUserIdService(userId);

  if (!teacher) {
    return res.status(404).json({ success: false, message: "Teacher not found" });
  }

  const dashboard = await getTeacherDashboardService(teacher.id);

  res.json({ success: true, data: dashboard });
});