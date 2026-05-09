import { prisma } from "../../config/prisma.js";

// ➕ CREATE TEACHER
export const createTeacherService = async (data: any) => {
  const { name, email, password, role, ...teacherData } = data;

  // 👤 Create user first
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      role,
    },
  });

  try {
    // 👨‍🏫 Create teacher
    const teacher = await prisma.teacher.create({
      data: {
        userId: user.id,
        ...teacherData,
      },
      include: {
        user: true,
      },
    });

    return teacher;
  } catch (error) {
    // Rollback: delete the user if teacher creation fails
    await prisma.user.delete({
      where: { id: user.id },
    });
    throw error;
  }
};

// 📥 GET ALL TEACHERS (pagination + search)
export const getAllTeachersService = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = query.search || "";

  const [teachers, total] = await Promise.all([
    prisma.teacher.findMany({
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
      },
    }),
    prisma.teacher.count(),
  ]);

  return {
    teachers,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// 📄 GET SINGLE TEACHER
export const getSingleTeacherService = async (id: string) => {
  return prisma.teacher.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
};

// ✏️ UPDATE TEACHER
export const updateTeacherService = async (id: string, data: any) => {
  const { name, email, ...teacherData } = data;

  const teacher = await prisma.teacher.findUnique({
    where: { id },
  });

  if (!teacher) throw new Error("Teacher not found");

  if (name || email) {
    await prisma.user.update({
      where: { id: teacher.userId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
      },
    });
  }

  return prisma.teacher.update({
    where: { id },
    data: teacherData,
    include: {
      user: true,
    },
  });
};

// ❌ DELETE TEACHER
export const deleteTeacherService = async (id: string) => {
  const teacher = await prisma.teacher.delete({
    where: { id },
  });

  await prisma.user.delete({
    where: { id: teacher.userId },
  });

  return teacher;
};