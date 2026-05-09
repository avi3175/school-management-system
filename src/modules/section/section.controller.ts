import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createSectionSchema } from "./section.validation.js";
import {
  createSectionService,
  getAllSectionsService,
  getSingleSectionService,
  updateSectionService,
  deleteSectionService,
} from "./section.service.js";

// ➕ Create Section
export const createSection = asyncHandler(async (req: Request, res: Response) => {
  const validated = createSectionSchema.parse(req.body);

  const section = await createSectionService(validated);

  res.status(201).json({ success: true, data: section });
});

// 📥 Get All Sections
export const getAllSections = asyncHandler(async (req: Request, res: Response) => {
  const result = await getAllSectionsService(req.query);

  res.json({ success: true, data: result.sections, meta: result.meta });
});

// 📄 Get Single Section
export const getSingleSection = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid section id" });

  const section = await getSingleSectionService(id);

  if (!section) return res.status(404).json({ success: false, message: "Section not found" });

  res.json({ success: true, data: section });
});

// ✏️ Update Section
export const updateSection = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid section id" });

  const section = await updateSectionService(id, req.body);

  res.json({ success: true, data: section });
});

// ❌ Delete Section
export const deleteSection = asyncHandler(async (req: Request, res: Response) => {
  const id = typeof req.params.id === "string" ? req.params.id : null;

  if (!id) return res.status(400).json({ success: false, message: "Invalid section id" });

  await deleteSectionService(id);

  res.json({ success: true, message: "Section deleted successfully" });
});