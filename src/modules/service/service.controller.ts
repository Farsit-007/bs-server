import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { serviceService } from "./service.service";

const createService = async (req: Request, res: Response) => {
  try {
    const result = await serviceService.createServiceInto(
      req.body,
      req?.user?.id,
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Services created successfully!",
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

const getOwnAllService = async (req: Request, res: Response) => {
  try {
    const result = await serviceService.getOwnAllServiceInto(req?.user?.id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Services retrived successfully!",
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

const getPublicService = async (req: Request, res: Response) => {
  try {
    const result = await serviceService.getPublicServiceInto();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Services retrived successfully!",
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


const getSingleService = async (req: Request, res: Response) => {
  try {
    const result = await serviceService.getSingleServiceInto(
      req?.params?.id as string,
      req?.user?.id as string,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Service retrived successfully!",
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

export const serviceController = {
  createService,
  getOwnAllService,
  getPublicService,
  getSingleService,
};
