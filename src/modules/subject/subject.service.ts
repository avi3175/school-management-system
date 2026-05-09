import { prisma } from "../../config/prisma.js";

// ➕ CREATE SUBJECT
export const createSubjectService = async (data: any) => {
  const subject = await prisma.subject.create({
    data,
  });

  return subject;
};

// 📥 GET ALL SUBJECTS (pagination + search)
export const getAllSubjectsService = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = query.search || "";

  const [subjects, total] = await Promise.all([
    prisma.subject.findMany({
      skip,
      take: limit,
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { code: { contains: search, mode: "insensitive" } },
        ],
      },
    }),
    prisma.subject.count(),
  ]);

  return {
    subjects,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// 📄 GET SINGLE SUBJECT
export const getSingleSubjectService = async (id: string) => {
  return prisma.subject.findUnique({
    where: { id },
  });
};

// ✏️ UPDATE SUBJECT
export const updateSubjectService = async (id: string, data: any) => {
  return prisma.subject.update({
    where: { id },
    data,
  });
};

// ❌ DELETE SUBJECT
export const deleteSubjectService = async (id: string) => {
  return prisma.subject.delete({
    where: { id },
  });
};