import { prisma } from "../../config/prisma.js";

// ➕ CREATE SINGLE RESULT
export const createResultService = async (data: any) => {
  // Check if result already exists for this student + exam
  const existing = await prisma.result.findFirst({
    where: {
      examId: data.examId,
      studentId: data.studentId,
    },
  });

  if (existing) {
    throw new Error("Result already exists for this student in this exam");
  }

  const result = await prisma.result.create({
    data: {
      examId: data.examId,
      studentId: data.studentId,
      marksObtained: data.marksObtained,
      grade: data.grade,
      remarks: data.remarks,
    },
    include: {
      exam: {
        include: {
          subject: true,
          class: true,
        },
      },
      student: {
        include: {
          user: true,
          class: true,
          section: true,
        },
      },
    },
  });

  return result;
};

// ➕ BULK RESULTS
export const bulkResultService = async (data: any) => {
  const { examId, results } = data;
  const createdResults = [];

  for (const record of results) {
    const existing = await prisma.result.findFirst({
      where: {
        examId,
        studentId: record.studentId,
      },
    });

    if (existing) {
      // Update if exists
      const updated = await prisma.result.update({
        where: { id: existing.id },
        data: {
          marksObtained: record.marksObtained,
          grade: record.grade,
          remarks: record.remarks,
        },
        include: {
          exam: { include: { subject: true, class: true } },
          student: { include: { user: true, class: true, section: true } },
        },
      });
      createdResults.push(updated);
    } else {
      // Create if not
      const created = await prisma.result.create({
        data: {
          examId,
          studentId: record.studentId,
          marksObtained: record.marksObtained,
          grade: record.grade,
          remarks: record.remarks,
        },
        include: {
          exam: { include: { subject: true, class: true } },
          student: { include: { user: true, class: true, section: true } },
        },
      });
      createdResults.push(created);
    }
  }

  return createdResults;
};

// 📥 GET RESULTS BY EXAM
export const getResultsByExamService = async (examId: string) => {
  const results = await prisma.result.findMany({
    where: { examId },
    include: {
      exam: {
        include: {
          subject: true,
        },
      },
      student: {
        include: {
          user: true,
          class: true,
          section: true,
        },
      },
    },
    orderBy: {
      marksObtained: "desc",
    },
  });

  return results;
};

// 📄 GET STUDENT RESULTS
export const getStudentResultsService = async (studentId: string) => {
  const results = await prisma.result.findMany({
    where: { studentId },
    include: {
      exam: {
        include: {
          subject: true,
        },
      },
      student: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      exam: {
        date: "desc",
      },
    },
  });

  return results;
};

// ✏️ UPDATE RESULT
export const updateResultService = async (id: string, data: any) => {
  return prisma.result.update({
    where: { id },
    data: {
      marksObtained: data.marksObtained,
      grade: data.grade,
      remarks: data.remarks,
    },
    include: {
      exam: {
        include: {
          subject: true,
          class: true,
        },
      },
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

// ❌ DELETE RESULT
export const deleteResultService = async (id: string) => {
  return prisma.result.delete({
    where: { id },
  });
};