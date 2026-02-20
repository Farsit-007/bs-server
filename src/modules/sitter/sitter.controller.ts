import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { sitterService } from "./sitter.service";

const createSitter = async (req: Request, res: Response) => {
  try {
    const result = await sitterService.createSitterInto(
      req.body,
      req?.user?.id,
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Sitter created successfully!",
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

const getOwnAllSitter = async (req: Request, res: Response) => {
  try {
    const result = await sitterService.getOwnAllSitterInto(req?.user?.id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Sitters retrived successfully!",
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

const getSingleSitter = async (req: Request, res: Response) => {
  try {
    const result = await sitterService.getSingleSitterInto(
      req?.params?.id as string,
      req?.user?.id as string,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Pet retrived successfully!",
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

const updateSitterBookingStatus = async (req: Request, res: Response) => {
  try {
    const result = await sitterService.updateSitterBookingStatus(
      req?.params?.id as string,
      req?.body.status,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Pet retrived successfully!",
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

export const sitterController = {
  createSitter,
  getOwnAllSitter,
  getSingleSitter,
  updateSitterBookingStatus,
};
