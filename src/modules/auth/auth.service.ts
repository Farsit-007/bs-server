import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";

export const secret = "lnasklndfknaskdnfsnad;fnsa;d";

const createUserInto = async (
  payload: Omit<User, "id" | "createdAt" | "updatedAt">,
) => {
  const hashPassword = await bcrypt.hash(payload.password, 12);

  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashPassword,
    },
  });

  const { password, ...withoutPassword } = result;

  return withoutPassword;
};

const loginUserInto = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!user) {
    throw new Error("User not found!");
  }

  const ismatched = bcrypt.compare(payload.password, user?.password);

  if (!ismatched) {
    throw new Error("Invalid cradentials!");
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      role: user.role,
    },
    secret,
    { expiresIn: "1d" },
  );
  const { password, createdAt, updatedAt, ...userWithoutPassword } = user;
  return { token, user: userWithoutPassword };
};

export const authService = {
  createUserInto,
  loginUserInto,
};
