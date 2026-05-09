import { prisma } from "../../config/prisma.js";

// ➕ CREATE EXAM
export const createExamService = async (data: any) => {
  const exam = await prisma.exam.create({
    data: {
      name: data.name,
      subjectId: data.subjectId,
      classId: data.classId,
      date: new Date(data.date),
      totalMarks: data.totalMarks,
      passingMarks: data.passingMarks,
    },
    include: {
      subject: true,
      class: true,
    },
  });

  return exam;
};

// 📥 GET ALL EXAMS (pagination + search)
export const getAllExamsService = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = query.search || "";
  const classId = query.classId;
  const subjectId = query.subjectId;

  const where: any = {};

  if (search) {
    where.name = { contains: search, mode: "insensitive" };
  }

  if (classId) {
    where.classId = classId;
  }

  if (subjectId) {
    where.subjectId = subjectId;
  }

  const [exams, total] = await Promise.all([
    prisma.exam.findMany({
      where,
      skip,
      take: limit,
      include: {
        subject: true,
        class: true,
      },
      orderBy: { date: "desc" },
    }),
    prisma.exam.count({ where }),
  ]);

  return {
    exams,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// 📄 GET SINGLE EXAM
export const getSingleExamService = async (id: string) => {
  return prisma.exam.findUnique({
    where: { id },
    include: {
      subject: true,
      class: true,
    },
  });
};

// ✏️ UPDATE EXAM
export const updateExamService = async (id: string, data: any) => {
  const updateData: any = { ...data };

  if (data.date) {
    updateData.date = new Date(data.date);
  }

  return prisma.exam.update({
    where: { id },
    data: updateData,
    include: {
      subject: true,
      class: true,
    },
  });
};

// ❌ DELETE EXAM
export const deleteExamService = async (id: string) => {
  return prisma.exam.delete({
    where: { id },
  });
};