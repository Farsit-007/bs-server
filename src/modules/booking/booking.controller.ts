import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await BookingService.createBookingInto(
      req.body,
      req?.user?.id,
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Booking created successfully!",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Something went wrong",
      data: null,
    });
  }
};

const getSingleBooking = async (req: Request, res: Response) => {
  try {
    const result = await BookingService.getSitterSingleBookingInto(
      req?.params?.id as string,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking retrived successfully!",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Something went wrong",
      data: null,
    });
  }
};

const getSitterBooking = async (req: Request, res: Response) => {
  try {
    const result = await BookingService.getSitterBookingInto(req?.user?.id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Sitter Booking retrived successfully!",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Something went wrong",
      data: null,
    });
  }
};

const getSitterSingleBooking = async (req: Request, res: Response) => {
  try {
    const result = await BookingService.getSitterSingleBookingInto(
      req?.params?.id as string,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking retrived successfully!",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Something went wrong",
      data: null,
    });
  }
};

const getOwnerBooking = async (req: Request, res: Response) => {
  try {
    const result = await BookingService.getOwnerBookingInto(req?.user?.id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Sitter Booking retrived successfully!",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Something went wrong",
      data: null,
    });
  }
};

const getOwnerSingleBooking = async (req: Request, res: Response) => {
  try {
    const result = await BookingService.getOwnerSingleBookingInto(
      req?.params?.id as string,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking retrived successfully!",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message || "Something went wrong",
      data: null,
    });
  }
};

export const BookingController = {
  createBooking,
  getSitterBooking,
  getSingleBooking,
  getSitterSingleBooking,
  getOwnerBooking,
  getOwnerSingleBooking,
};
