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



// 📄 GET STUDENT BY USER ID (for "my profile")
export const getStudentByUserIdService = async (userId: string) => {
  return prisma.student.findUnique({
    where: { userId },
    include: {
      user: true,
      class: true,
      section: true,
    },
  });
};



// 📊 STUDENT DASHBOARD
export const getStudentDashboardService = async (studentId: string) => {
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: {
      user: true,
      class: true,
      section: true,
    },
  });

  if (!student) throw new Error("Student not found");

  // Attendance stats
  const totalDays = await prisma.attendance.count({
    where: { studentId },
  });
  const presentDays = await prisma.attendance.count({
    where: { studentId, status: "PRESENT" },
  });
  const absentDays = await prisma.attendance.count({
    where: { studentId, status: "ABSENT" },
  });
  const lateDays = await prisma.attendance.count({
    where: { studentId, status: "LATE" },
  });

  // Recent attendance (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentAttendance = await prisma.attendance.findMany({
    where: {
      studentId,
      date: { gte: thirtyDaysAgo },
    },
    orderBy: { date: "desc" },
    take: 30,
  });

  // Recent results
  const recentResults = await prisma.result.findMany({
    where: { studentId },
    include: {
      exam: {
        include: { subject: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return {
    profile: {
      id: student.id,
      name: student.user.name,
      email: student.user.email,
      roll: student.roll,
      gender: student.gender,
      imageUrl: student.user.imageUrl,
    },
    myClass: student.class ? { name: student.class.name, level: student.class.level } : null,
    mySection: student.section ? { name: student.section.name } : null,
    attendance: {
      total: totalDays,
      present: presentDays,
      absent: absentDays,
      late: lateDays,
      attendanceRate: totalDays > 0 ? `${Math.round((presentDays / totalDays) * 100)}%` : "0%",
    },
    recentAttendance,
    recentResults: recentResults.map((r) => ({
      id: r.id,
      examName: r.exam.name,
      subject: r.exam.subject.name,
      marksObtained: r.marksObtained,
      totalMarks: r.exam.totalMarks,
      grade: r.grade,
      remarks: r.remarks,
    })),
  };
};