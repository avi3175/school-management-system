import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getDashboardStatsService } from "./dashboard.service.js";

export const getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
  const stats = await getDashboardStatsService();

  res.json({ success: true, data: stats });
});