import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { Status } from "../../../generated/prisma/enums";

const getMe = async (req: Request, res: Response) => {
  try {
    const result = await userService.getme(req.user?.id);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User created successfully!",
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

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUser();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User retrived successfully!",
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

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getSingleUser(req.params.id as string);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User retrived successfully!",
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

const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.updateUser(
      req.body.status as Status,
      req.params.id as string,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User retrived successfully!",
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

const getAllPets = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllPets();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Pets retrived successfully!",
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

export const userController = {
  getMe,
  getAllUser,
  getSingleUser,
  updateUser,
  getAllPets,
};
