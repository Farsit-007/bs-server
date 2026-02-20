import {
  BookingStatus,
  SitterProfiles,
} from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createSitterInto = async (
  payload: Omit<SitterProfiles, "createdAt" | "updatedAt">,
  userId: string,
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user?.id !== userId) {
    throw new Error("User not available!");
  }

  if (!user) {
    throw new Error("User not available!");
  }

  const result = await prisma.sitterProfiles.create({
    data: {
      ...payload,
      userId: user?.id,
    },
  });
  return result;
};

const getOwnAllSitterInto = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not available!");
  }

  const result = await prisma.sitterProfiles.findMany({
    include: {
      user: true,
    },
  });
  return result;
};

const getSingleSitterInto = async (SitterId: string, userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not available!");
  }

  const result = await prisma.sitterProfiles.findUnique({
    where: {
      id: SitterId,
    },
    include: {
      user: true,
    },
  });
  return result;
};

const updateSitterBookingStatus = async (
  bookingId: string,
  status: BookingStatus,
) => {

  const result = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: status,
    },
  });
  return result;
};

export const sitterService = {
  createSitterInto,
  getOwnAllSitterInto,
  getSingleSitterInto,
  updateSitterBookingStatus,
};
