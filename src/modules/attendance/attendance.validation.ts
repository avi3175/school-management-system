import { z } from "zod";

export const createAttendanceSchema = z.object({
  date: z.string().optional(),
  studentId: z.string().min(1, "Student ID is required"),
  status: z.enum(["PRESENT", "ABSENT", "LATE"]),
});

export const bulkAttendanceSchema = z.object({
  date: z.string().optional(),
  records: z.array(
    z.object({
      studentId: z.string(),
      status: z.enum(["PRESENT", "ABSENT", "LATE"]),
    })
  ),
});