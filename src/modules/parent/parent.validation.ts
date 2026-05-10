import { z } from "zod";

export const createParentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["PARENT"]),

  occupation: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  relationToStudent: z.string().optional(),
  studentId: z.string().optional(),  // ✅ Add
});

export const updateParentSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  occupation: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  relationToStudent: z.string().optional(),
  studentId: z.string().nullable().optional(),  // ✅ Add
});