import { prisma } from "../../config/prisma.js";
import { hashPassword, comparePassword } from "../../utils/bcrypt.js";
import { generateToken } from "../../utils/jwt.js";

export const registerUser = async (data: any) => {
  const hashed = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashed,
      role: data.role,
    },
  });

  return user;
};

export const loginUser = async (data: any) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) throw new Error("User not found");

  const isMatch = await comparePassword(data.password, user.password);

  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  return { user, token };
};