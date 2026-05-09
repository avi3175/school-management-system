import { prisma } from "../../config/prisma.js";
// ➕ CREATE TEACHER
export const createTeacherService = async (data) => {
    const { name, email, password, role, ...teacherData } = data;
    // 👤 Create user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password,
            role,
        },
    });
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
};
// 📥 GET ALL TEACHERS (pagination + search)
export const getAllTeachersService = async (query) => {
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
export const getSingleTeacherService = async (id) => {
    return prisma.teacher.findUnique({
        where: { id },
        include: {
            user: true,
        },
    });
};
// ✏️ UPDATE TEACHER
export const updateTeacherService = async (id, data) => {
    const { name, email, ...teacherData } = data;
    // Get teacher to find userId
    const teacher = await prisma.teacher.findUnique({
        where: { id },
    });
    if (!teacher)
        throw new Error("Teacher not found");
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
    // Update teacher
    return prisma.teacher.update({
        where: { id },
        data: teacherData,
        include: {
            user: true,
        },
    });
};
// ❌ DELETE TEACHER
export const deleteTeacherService = async (id) => {
    const teacher = await prisma.teacher.delete({
        where: { id },
    });
    // Remove linked user
    await prisma.user.delete({
        where: { id: teacher.userId },
    });
    return teacher;
};
//# sourceMappingURL=teacher.service.js.map