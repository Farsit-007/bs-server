import { Pet, Service } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createServiceInto = async (
  payload: Omit<Service, "createdAt" | "updatedAt">,
  userId: string,
) => {
  console.log(payload);
  const sitterProfile = await prisma.sitterProfiles.findUnique({
    where: {
      id: payload.sitterId,
    },
  });

  if (!sitterProfile) {
    throw new Error("sitterProfile not available!");
  }
  if (sitterProfile?.userId !== userId) {
    throw new Error("User not matched");
  }

  const result = await prisma.service.create({
    data: {
      ...payload,
      sitterId: sitterProfile?.id,
    },
  });
  return result;
};

const getOwnAllServiceInto = async (userId: string) => {
  const sitter = await prisma.sitterProfiles.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!sitter) {
    throw new Error("Sitter Profile not available!");
  }

  const result = await prisma.service.findMany({
    where: {
      sitterId: sitter.id,
    },
    include: {
      sitter: true,
    },
  });
  return result;
};

const getPublicServiceInto = async () => {
  const result = await prisma.service.findMany({
    include: {
      sitter: true,
    },
  });
  return result;
};

const getSingleServiceInto = async (petId: string, userId: string) => {
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

export const serviceService = {
  createServiceInto,
  getOwnAllServiceInto,
  getSingleServiceInto,
  getPublicServiceInto,
};
