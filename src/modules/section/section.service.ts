import { prisma } from "../../config/prisma.js";

// ➕ CREATE SECTION
export const createSectionService = async (data: any) => {
  return prisma.section.create({
    data,
    include: {
      class: true,
      _count: {
        select: { students: true },
      },
    },
  });
};

// 📥 GET ALL SECTIONS
export const getAllSectionsService = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const classId = query.classId;

  const where: any = {};
  if (classId) where.classId = classId;

  const [sections, total] = await Promise.all([
    prisma.section.findMany({
      where,
      skip,
      take: limit,
      include: {
        class: true,
        _count: {
          select: { students: true },
        },
      },
    }),
    prisma.section.count({ where }),
  ]);

  return {
    sections,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// 📄 GET SINGLE SECTION
export const getSingleSectionService = async (id: string) => {
  return prisma.section.findUnique({
    where: { id },
    include: {
      class: true,
      students: {
        include: {
          user: true,
        },
      },
      _count: {
        select: { students: true },
      },
    },
  });
};

// ✏️ UPDATE SECTION
export const updateSectionService = async (id: string, data: any) => {
  return prisma.section.update({
    where: { id },
    data,
    include: {
      class: true,
      _count: {
        select: { students: true },
      },
    },
  });
};

// ❌ DELETE SECTION
export const deleteSectionService = async (id: string) => {
  return prisma.section.delete({
    where: { id },
  });
};