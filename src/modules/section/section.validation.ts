import { z } from "zod";

export const createSectionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  classId: z.string().min(1, "Class ID is required"),
});

export const updateSectionSchema = z.object({
  name: z.string().optional(),
  classId: z.string().optional(),
});