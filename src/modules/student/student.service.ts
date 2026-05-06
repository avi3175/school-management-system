import { prisma } from "../../config/prisma.js";

// ➕ CREATE STUDENT
export const createStudentService = async (data: any) => {
  const {
    name,
    email,
    password,
    role,
    classId,
    sectionId,
    roll,
    ...rest
  } = data;

  // 🛡️ basic validation (safe level)
  if (!classId || !sectionId) {
    throw new Error("classId and sectionId are required");
  }

  // 👤 create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      role,
    },
  });

  // 🎓 create student
  const student = await prisma.student.create({
    data: {
      userId: user.id,
      classId,
      sectionId,
      roll,
      ...rest,
    },
    include: {
      user: true,
      class: true,
      section: true,
    },
  });

  return student;
};

// 📥 GET ALL STUDENTS (pagination + search)
export const getAllStudentsService = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const search = query.search || "";

  const [students, total] = await Promise.all([
    prisma.student.findMany({
      skip,
      take: limit,
      where: {
        user: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      include: {
        user: true,
        class: true,
        section: true,
      },
    }),

    prisma.student.count(),
  ]);

  return {
    students,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// 📄 GET SINGLE STUDENT
export const getSingleStudentService = async (id: string) => {
  return prisma.student.findUnique({
    where: { id },
    include: {
      user: true,
      class: true,
      section: true,
    },
  });
};

// ✏️ UPDATE STUDENT
export const updateStudentService = async (id: string, data: any) => {
  const { classId, sectionId, roll, ...rest } = data;

  return prisma.student.update({
    where: { id },
    data: {
      classId,
      sectionId,
      roll,
      ...rest,
    },
    include: {
      user: true,
      class: true,
      section: true,
    },
  });
};

// ❌ DELETE STUDENT
export const deleteStudentService = async (id: string) => {
  const student = await prisma.student.delete({
    where: { id },
  });

  // remove linked user
  await prisma.user.delete({
    where: { id: student.userId },
  });

  return student;
};