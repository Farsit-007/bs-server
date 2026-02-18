import { Pet } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createPetInto = async (
  payload: Omit<Pet, "id" | "createdAt" | "updatedAt">,
  userId: string,
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not available!");
  }

  const result = await prisma.pet.create({
    data: {
      ...payload,
      ownerId: user?.id,
    },
  });
  return result;
};

const getOwnAllPetInto = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not available!");
  }

  const result = await prisma.pet.findMany({
    include: {
      owner: true,
    },
  });
  return result;
};

const getSinglePetInto = async (petId: string, userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not available!");
  }

  const result = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
    include: {
      owner: true,
    },
  });
  return result;
};

export const petService = {
  createPetInto,
  getOwnAllPetInto,
  getSinglePetInto,
};
