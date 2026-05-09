import { prisma } from "../../config/prisma.js";

// ➕ CREATE TEACHER
// ➕ CREATE TEACHER
export const createTeacherService = async (data: any) => {
  const {
    name,
    email,
    password,
    role,
    classId,
    sectionId,
    subjectIds,
    ...teacherData
  } = data;

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
    // Build data object explicitly
    const createData: any = {
      userId: user.id,
      ...teacherData,
    };

    if (classId) createData.classId = classId;
    if (sectionId) createData.sectionId = sectionId;
    if (subjectIds && subjectIds.length > 0) {
      createData.subjects = {
        connect: subjectIds.map((id: string) => ({ id })),
      };
    }

    const teacher = await prisma.teacher.create({
      data: createData,
      include: {
        user: true,
        class: true,
        section: true,
        subjects: true,
      },
    });

    return teacher;
  } catch (error) {
    await prisma.user.delete({
      where: { id: user.id },
    });
    throw error;
  }
};

// 📥 GET ALL TEACHERS (pagination + search + filter by class/section)
export const getAllTeachersService = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = query.search || "";
  const classId = query.classId;
  const sectionId = query.sectionId;

  const where: any = {
    user: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  };

  if (classId) where.classId = classId;
  if (sectionId) where.sectionId = sectionId;

  const [teachers, total] = await Promise.all([
    prisma.teacher.findMany({
      skip,
      take: limit,
      where,
      include: {
        user: true,
        class: true,
        section: true,
        subjects: true,
      },
      orderBy: {
        user: {
          name: "asc",
        },
      },
    }),
    prisma.teacher.count({ where }),
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
      class: true,
      section: true,
      subjects: true,
    },
  });
};

// 📄 GET TEACHER BY USER ID (for "my profile")
export const getTeacherByUserIdService = async (userId: string) => {
  return prisma.teacher.findUnique({
    where: { userId },
    include: {
      user: true,
      class: true,
      section: true,
      subjects: true,
    },
  });
};

// ✏️ UPDATE TEACHER (Admin or self)
export const updateTeacherService = async (id: string, data: any) => {
  const {
    name,
    email,
    classId,
    sectionId,
    subjectIds,
    ...teacherData
  } = data;

  const teacher = await prisma.teacher.findUnique({
    where: { id },
  });

  if (!teacher) throw new Error("Teacher not found");

  // Update user if name or email provided
  if (name || email) {
    await prisma.user.update({
      where: { id: teacher.userId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
      },
    });
  }

  // Prepare update data
  const updateData: any = { ...teacherData };

  if (classId !== undefined) updateData.classId = classId;
  if (sectionId !== undefined) updateData.sectionId = sectionId;

  // Handle subjects
  if (subjectIds !== undefined) {
    updateData.subjects = {
      set: [], // disconnect all existing
      connect: subjectIds.map((id: string) => ({ id })),
    };
  }

  return prisma.teacher.update({
    where: { id },
    data: updateData,
    include: {
      user: true,
      class: true,
      section: true,
      subjects: true,
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