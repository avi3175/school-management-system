import { prisma } from "../../config/prisma.js";

// ➕ CREATE SINGLE ATTENDANCE
export const createAttendanceService = async (data: any) => {
  const { date, studentId, status } = data;

  // Check if attendance already exists for this student on this date
  const attendanceDate = date ? new Date(date) : new Date();
  attendanceDate.setHours(0, 0, 0, 0);

  const nextDay = new Date(attendanceDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const existing = await prisma.attendance.findFirst({
    where: {
      studentId,
      date: {
        gte: attendanceDate,
        lt: nextDay,
      },
    },
  });

  if (existing) {
    throw new Error("Attendance already marked for this student today");
  }

  const attendance = await prisma.attendance.create({
    data: {
      date: attendanceDate,
      studentId,
      status,
    },
    include: {
      student: {
        include: {
          user: true,
          class: true,
          section: true,
        },
      },
    },
  });

  return attendance;
};

// ➕ BULK ATTENDANCE
export const bulkAttendanceService = async (data: any) => {
  const { date, records } = data;
  const attendanceDate = date ? new Date(date) : new Date();
  attendanceDate.setHours(0, 0, 0, 0);

  const results = [];

  for (const record of records) {
    const nextDay = new Date(attendanceDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Check existing
    const existing = await prisma.attendance.findFirst({
      where: {
        studentId: record.studentId,
        date: {
          gte: attendanceDate,
          lt: nextDay,
        },
      },
    });

    if (existing) {
      // Update if exists
      const updated = await prisma.attendance.update({
        where: { id: existing.id },
        data: { status: record.status },
        include: {
          student: {
            include: {
              user: true,
              class: true,
              section: true,
            },
          },
        },
      });
      results.push(updated);
    } else {
      // Create if not
      const created = await prisma.attendance.create({
        data: {
          date: attendanceDate,
          studentId: record.studentId,
          status: record.status,
        },
        include: {
          student: {
            include: {
              user: true,
              class: true,
              section: true,
            },
          },
        },
      });
      results.push(created);
    }
  }

  return results;
};

// 📥 GET ATTENDANCE BY DATE
export const getAttendanceByDateService = async (query: any) => {
  const { date, classId, sectionId } = query;

  const attendanceDate = date ? new Date(date) : new Date();
  attendanceDate.setHours(0, 0, 0, 0);

  const nextDay = new Date(attendanceDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const where: any = {
    date: {
      gte: attendanceDate,
      lt: nextDay,
    },
  };

  if (classId) {
    where.student = { classId };
  }

  if (sectionId) {
    where.student = { ...where.student, sectionId };
  }

  const attendance = await prisma.attendance.findMany({
    where,
    include: {
      student: {
        include: {
          user: true,
          class: true,
          section: true,
        },
      },
    },
    orderBy: {
      student: {
        roll: "asc",
      },
    },
  });

  return attendance;
};

// 📄 GET STUDENT ATTENDANCE REPORT
export const getStudentAttendanceReportService = async (studentId: string, query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 30;
  const skip = (page - 1) * limit;

  const [records, total] = await Promise.all([
    prisma.attendance.findMany({
      where: { studentId },
      skip,
      take: limit,
      orderBy: { date: "desc" },
      include: {
        student: {
          include: {
            user: true,
          },
        },
      },
    }),
    prisma.attendance.count({ where: { studentId } }),
  ]);

  // Stats
  const present = await prisma.attendance.count({
    where: { studentId, status: "PRESENT" },
  });
  const absent = await prisma.attendance.count({
    where: { studentId, status: "ABSENT" },
  });
  const late = await prisma.attendance.count({
    where: { studentId, status: "LATE" },
  });

  return {
    records,
    stats: { present, absent, late, total },
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// ✏️ UPDATE ATTENDANCE
export const updateAttendanceService = async (id: string, data: any) => {
  return prisma.attendance.update({
    where: { id },
    data,
    include: {
      student: {
        include: {
          user: true,
          class: true,
          section: true,
        },
      },
    },
  });
};