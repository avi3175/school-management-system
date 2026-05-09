import { prisma } from "../../config/prisma.js";

// ➕ CREATE PARENT
export const createParentService = async (data: any) => {
  const { name, email, password, role, ...parentData } = data;

  // 👤 Create user first
  const user = await prisma.user.create({
    data: { name, email, password, role },
  });

  try {
    // 👨‍👩‍👧 Create parent
    const parent = await prisma.parent.create({
      data: {
        userId: user.id,
        ...parentData,
      },
      include: { user: true },
    });

    return parent;
  } catch (error) {
    // Rollback: delete the user if parent creation fails
    await prisma.user.delete({
      where: { id: user.id },
    });
    throw error;
  }
};

// 📥 GET ALL PARENTS (pagination + search)
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
        user: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      include: { user: true },
    }),
    prisma.parent.count(),
  ]);

  return {
    parents,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// 📄 GET SINGLE PARENT
export const getSingleParentService = async (id: string) => {
  return prisma.parent.findUnique({
    where: { id },
    include: { user: true },
  });
};

// ✏️ UPDATE PARENT
export const updateParentService = async (id: string, data: any) => {
  const { name, email, ...parentData } = data;

  const parent = await prisma.parent.findUnique({ where: { id } });
  if (!parent) throw new Error("Parent not found");

  if (name || email) {
    await prisma.user.update({
      where: { id: parent.userId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
      },
    });
  }

  return prisma.parent.update({
    where: { id },
    data: parentData,
    include: { user: true },
  });
};

// ❌ DELETE PARENT
export const deleteParentService = async (id: string) => {
  const parent = await prisma.parent.delete({ where: { id } });

  await prisma.user.delete({ where: { id: parent.userId } });

  return parent;
};