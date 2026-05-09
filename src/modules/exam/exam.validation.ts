import { z } from "zod";

export const createExamSchema = z.object({
  name: z.string().min(1, "Name is required"),
  subjectId: z.string().min(1, "Subject ID is required"),
  classId: z.string().min(1, "Class ID is required"),
  date: z.string().min(1, "Date is required"),
  totalMarks: z.number().min(1, "Total marks required"),
  passingMarks: z.number().min(1, "Passing marks required"),
});

export const updateExamSchema = z.object({
  name: z.string().optional(),
  subjectId: z.string().optional(),
  classId: z.string().optional(),
  date: z.string().optional(),
  totalMarks: z.number().optional(),
  passingMarks: z.number().optional(),
});