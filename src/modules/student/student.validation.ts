import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["STUDENT"]),

  classId: z.string(),
  sectionId: z.string(),
  roll: z.number(),

  parentName: z.string().optional(),
  parentPhone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
});