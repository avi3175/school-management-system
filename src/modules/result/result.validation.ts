import { z } from "zod";

export const createResultSchema = z.object({
  examId: z.string().min(1, "Exam ID is required"),
  studentId: z.string().min(1, "Student ID is required"),
  marksObtained: z.number().min(0, "Marks cannot be negative"),
  grade: z.string().optional(),
  remarks: z.string().optional(),
});

export const bulkResultSchema = z.object({
  examId: z.string().min(1, "Exam ID is required"),
  results: z.array(
    z.object({
      studentId: z.string(),
      marksObtained: z.number().min(0),
      grade: z.string().optional(),
      remarks: z.string().optional(),
    })
  ),
});