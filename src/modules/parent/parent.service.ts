import { prisma } from "../../config/prisma.js";

// ➕ CREATE PARENT
export const createParentService = async (data: any) => {
  const { name, email, password, role, studentId, ...parentData } = data;

  const user = await prisma.user.create({
    data: { name, email, password, role },
  });

  try {
    const parent = await prisma.parent.create({
      data: {
        userId: user.id,
        studentId: studentId || null,
        ...parentData,
      },
      include: {
        user: true,
        student: {
          include: { user: true, class: true, section: true },
        },
      },
    });

    return parent;
  } catch (error) {
    await prisma.user.delete({ where: { id: user.id } });
    throw error;
  }
};

// 📄 GET PARENT BY USER ID
export const getParentByUserIdService = async (userId: string) => {
  return prisma.parent.findUnique({
    where: { userId },
    include: {
      user: true,
      student: {
        include: { user: true, class: true, section: true },
      },
    },
  });
};

// 📊 PARENT DASHBOARD
export const getParentDashboardService = async (parentId: string) => {
  const parent = await prisma.parent.findUnique({
    where: { id: parentId },
    include: {
      user: true,
      student: {
        include: {
          user: true,
          class: true,
          section: true,
        },
      },
    },
  });

  if (!parent) throw new Error("Parent not found");

  let attendanceStats: any = null;
  let recentResults: any[] = [];
  let attendanceRecords: any[] = [];

  if (parent.student) {
    // Attendance stats
    const totalDays = await prisma.attendance.count({
      where: { studentId: parent.student.id },
    });
    const presentDays = await prisma.attendance.count({
      where: { studentId: parent.student.id, status: "PRESENT" },
    });
    const absentDays = await prisma.attendance.count({
      where: { studentId: parent.student.id, status: "ABSENT" },
    });
    const lateDays = await prisma.attendance.count({
      where: { studentId: parent.student.id, status: "LATE" },
    });

    attendanceStats = {
      total: totalDays,
      present: presentDays,
      absent: absentDays,
      late: lateDays,
      attendanceRate: totalDays > 0 ? `${Math.round((presentDays / totalDays) * 100)}%` : "0%",
    };

    // Recent attendance (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    attendanceRecords = await prisma.attendance.findMany({
      where: {
        studentId: parent.student.id,
        date: { gte: thirtyDaysAgo },
      },
      orderBy: { date: "desc" },
      take: 30,
    });

    // Recent results
    recentResults = await prisma.result.findMany({
      where: { studentId: parent.student.id },
      include: {
        exam: {
          include: { subject: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  }

  return {
    profile: {
      id: parent.id,
      name: parent.user.name,
      email: parent.user.email,
      occupation: parent.occupation,
      phone: parent.phone,
      relationToStudent: parent.relationToStudent,
    },
    myChild: parent.student
      ? {
          id: parent.student.id,
          name: parent.student.user.name,
          roll: parent.student.roll,
          class: parent.student.class?.name,
          section: parent.student.section?.name,
          gender: parent.student.gender,
        }
      : null,
    attendance: attendanceStats,
    recentAttendance: attendanceRecords,
    recentResults: recentResults.map((r: any) => ({
      id: r.id,
      examName: r.exam.name,
      subject: r.exam.subject.name,
      marksObtained: r.marksObtained,
      totalMarks: r.exam.totalMarks,
      grade: r.grade,
    })),
  };
};

// 📥 GET ALL PARENTS
export const getAllParentsService = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = query.search || "";

  const [parents, total] = await Promise.all([
    prisma.parent.findMany({
      skip,
      take: limit,
      where: {
        user: { name: { contains: search, mode: "insensitive" } },
      },
      include: {
        user: true,
        student: { include: { user: true } },
      },
    }),
    prisma.parent.count(),
  ]);

  return { parents, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

// 📄 GET SINGLE PARENT
export const getSingleParentService = async (id: string) => {
  return prisma.parent.findUnique({
    where: { id },
    include: {
      user: true,
      student: { include: { user: true, class: true, section: true } },
    },
  });
};

// ✏️ UPDATE PARENT
export const updateParentService = async (id: string, data: any) => {
  const { name, email, studentId, ...parentData } = data;

  const parent = await prisma.parent.findUnique({ where: { id } });
  if (!parent) throw new Error("Parent not found");

  if (name || email) {
    await prisma.user.update({
      where: { id: parent.userId },
      data: { ...(name && { name }), ...(email && { email }) },
    });
  }

  const updateData: any = { ...parentData };
  if (studentId !== undefined) updateData.studentId = studentId;

  return prisma.parent.update({
    where: { id },
    data: updateData,
    include: {
      user: true,
      student: { include: { user: true, class: true, section: true } },
    },
  });
};

// ❌ DELETE PARENT
export const deleteParentService = async (id: string) => {
  const parent = await prisma.parent.delete({ where: { id } });
  await prisma.user.delete({ where: { id: parent.userId } });
  return parent;
};