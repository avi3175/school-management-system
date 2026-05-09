import { prisma } from "../../config/prisma.js";

export const getDashboardStatsService = async () => {
  const [
    totalStudents,
    totalTeachers,
    totalParents,
    totalClasses,
    totalSubjects,
    totalExams,
    presentToday,
    absentToday,
    lateToday,
    recentExams,
  ] = await Promise.all([
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.parent.count(),
    prisma.class.count(),
    prisma.subject.count(),
    prisma.exam.count(),

    // Today's attendance
    prisma.attendance.count({
      where: {
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
        status: "PRESENT",
      },
    }),
    prisma.attendance.count({
      where: {
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
        status: "ABSENT",
      },
    }),
    prisma.attendance.count({
      where: {
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
        status: "LATE",
      },
    }),

    // Recent 5 exams
    prisma.exam.findMany({
      take: 5,
      orderBy: { date: "desc" },
      include: {
        subject: true,
        class: true,
      },
    }),
  ]);

  // Count results for pass rate
  const totalResults = await prisma.result.count();
  const passedResults = await prisma.result.count({
    where: {
      marksObtained: {
        gte: await prisma.exam.aggregate({
          _avg: { passingMarks: true },
        }).then((r) => r._avg.passingMarks || 33),
      },
    },
  });

  // Simpler approach: count students per class
  const studentsPerClass = await prisma.class.findMany({
    include: {
      _count: {
        select: { students: true },
      },
    },
  });

  return {
    totalStudents,
    totalTeachers,
    totalParents,
    totalClasses,
    totalSubjects,
    totalExams,
    todayAttendance: {
      present: presentToday,
      absent: absentToday,
      late: lateToday,
      total: presentToday + absentToday + lateToday,
    },
    passRate: totalResults > 0 ? `${Math.round((passedResults / totalResults) * 100)}%` : "0%",
    studentsPerClass: studentsPerClass.map((c) => ({
      className: c.name,
      level: c.level,
      totalStudents: c._count.students,
    })),
    recentExams: recentExams.map((e) => ({
      id: e.id,
      name: e.name,
      subject: e.subject.name,
      class: e.class.name,
      date: e.date,
    })),
  };
};