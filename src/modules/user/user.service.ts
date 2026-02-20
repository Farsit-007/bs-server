import { Status } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getme = async (userId: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return result;
};

const getAllUser = async () => {
  const result = await prisma.user.findMany();
  return result;
};

const getSingleUser = async (userId: string) => {
  const result = await prisma.user.findMany({
    where: {
      id: userId,
    },
  });
  return result;
};

const updateUser = async (status: Status, userId: string) => {
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status: status,
    },
  });
  return result;
};

const getAllPets = async () => {
  const result = await prisma.pet.findMany({
    include: {
      owner: true,
    },
  });
  return result;
};
export const userService = {
  getme,
  getAllUser,
  getSingleUser,
  updateUser,
  getAllPets,
};
