import { z } from "zod";

export const createClassSchema = z.object({
  name: z.string().min(1, "Name is required"),
  level: z.number().min(1, "Level is required"),
});

export const updateClassSchema = z.object({
  name: z.string().optional(),
  level: z.number().optional(),
});