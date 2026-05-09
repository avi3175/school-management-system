import { z } from "zod";

export const createTeacherSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["TEACHER"]),

  designation: z.string().optional(),
  department: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

export const updateTeacherSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  designation: z.string().optional(),
  department: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
});