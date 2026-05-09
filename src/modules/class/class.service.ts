import { prisma } from "../../config/prisma.js";

// ➕ CREATE CLASS
export const createClassService = async (data: any) => {
  return prisma.class.create({
    data,
    include: {
      sections: true,
      _count: {
        select: { students: true },
      },
    },
  });
};

// 📥 GET ALL CLASSES
export const getAllClassesService = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = query.search || "";

  const [classes, total] = await Promise.all([
    prisma.class.findMany({
      skip,
      take: limit,
      where: {
        name: { contains: search, mode: "insensitive" },
      },
      include: {
        sections: true,
        _count: {
          select: { students: true },
        },
      },
      orderBy: { level: "asc" },
    }),
    prisma.class.count(),
  ]);

  return {
    classes,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// 📄 GET SINGLE CLASS
export const getSingleClassService = async (id: string) => {
  return prisma.class.findUnique({
    where: { id },
    include: {
      sections: true,
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

// ✏️ UPDATE CLASS
export const updateClassService = async (id: string, data: any) => {
  return prisma.class.update({
    where: { id },
    data,
    include: {
      sections: true,
      _count: {
        select: { students: true },
      },
    },
  });
};

// ❌ DELETE CLASS
export const deleteClassService = async (id: string) => {
  return prisma.class.delete({
    where: { id },
  });
};