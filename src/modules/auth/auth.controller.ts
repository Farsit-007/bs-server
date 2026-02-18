import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const createUser = async (req: Request, res: Response) => {
  console.log("Hitted");
  try {
    const result = await authService.createUserInto(req.body);

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

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserInto(req.body);
    res.cookie("token", result.token, {
      secure: false,
      httpOnly: true,
      sameSite: "strict", // none,strict,lax
    });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User logged in successfully!",
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

export const authController = {
  createUser,
  loginUser,
};
