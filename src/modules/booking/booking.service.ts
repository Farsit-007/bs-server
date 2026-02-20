import { Booking, Pet } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createBookingInto = async (
  payload: Omit<Booking, "id" | "createdAt" | "updatedAt">,
  userId: string,
) => {
  //  1.User exists
  //  2.User is OWNER
  //  3.Pet belongs to that owner
  //  4.Service exists
  //  5.Sitter exists
  //  6.Calculate totalPrice
  //  7.Create booking

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not available!");
  }

  if (user.id !== payload.ownerId) {
    throw new Error("Unauthorized");
  }
  const pet = await prisma.pet.findUnique({
    where: { id: payload.petId },
  });

  if (!pet) {
    throw new Error("Pet not found!");
  }

  if (pet.ownerId !== userId) {
    throw new Error("You can only book for your own pet!");
  }
  const service = await prisma.service.findUnique({
    where: { id: payload.serviceId },
  });

  if (!service) {
    throw new Error("Service not found!");
  }

  // Convert start and end dates into milliseconds
  // getTime() returns the number of milliseconds since Jan 1, 1970
  const startTime = new Date(payload.startDate).getTime();
  const endTime = new Date(payload.endDate).getTime();

  // Validate that end date is after start date
  if (endTime <= startTime) {
    throw new Error("End date must be after start date");
  }

  // Calculate the difference in milliseconds
  const durationInMilliseconds = endTime - startTime;

  // Convert milliseconds to hours
  // 1 hour = 1000 ms × 60 sec × 60 min = 3,600,000 ms
  const durationHours = durationInMilliseconds / (1000 * 60 * 60);

  // Calculate total price
  // Multiply total hours by service hourly price
  const totalPrice = durationHours * service.price;

  // Optional: round to 2 decimal places for currency format
  // const totalPrice = Number((durationHours * service.price).toFixed(2));

  const result = await prisma.booking.create({
    data: {
      ...payload,
      ownerId: userId,
      totalPrice,
    },
  });

  return result;
};

const getSitterBookingInto = async (sitterId: string) => {
  const sitter = await prisma.sitterProfiles.findUnique({
    where: {
      id: sitterId,
    },
  });
  const result = await prisma.booking.findMany({
    where: {
      sitterId: sitter?.id,
    },
    include: {
      owner: true,
      sitter: true,
      pet: true,
    },
  });
  return result;
};

const getSitterSingleBookingInto = async (bookingId: string) => {
  const result = await prisma.booking.findFirstOrThrow({
    where: {
      id: bookingId,
    },
    include: {
      owner: true,
      sitter: true,
      pet: true,
    },
  });
  return result;
};

const getOwnerBookingInto = async (ownerId: string) => {
  const result = await prisma.booking.findMany({
    where: {
      ownerId: ownerId,
    },
    include: {
      owner: true,
      sitter: true,
      pet: true,
    },
  });
  return result;
};

const getOwnerSingleBookingInto = async (bookingId: string) => {
  const result = await prisma.booking.findFirstOrThrow({
    where: {
      id: bookingId,
    },
    include: {
      owner: true,
      sitter: true,
      pet: true,
    },
  });
  return result;
};

export const BookingService = {
  createBookingInto,
  getSitterBookingInto,
  getSitterSingleBookingInto,
  getOwnerBookingInto,
  getOwnerSingleBookingInto,
};
