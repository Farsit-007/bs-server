import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { petService } from "./pet.service";

const createPet = async (req: Request, res: Response) => {
  try {
    const result = await petService.createPetInto(req.body, req?.user?.id);

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

const getOwnAllPet = async (req: Request, res: Response) => {
  try {
    const result = await petService.getOwnAllPetInto(req?.user?.id);

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

const getSinglePet = async (req: Request, res: Response) => {
  try {
    const result = await petService.getSinglePetInto(
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

export const petController = {
  createPet,
  getOwnAllPet,
  getSinglePet,
};
