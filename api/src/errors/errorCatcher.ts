import { NextFunction } from "express";

type ErrorCatcherCallback = () => Promise<any>

export const errorCatcher = async (next: NextFunction, callBack: ErrorCatcherCallback) => {
  try {
    return await callBack();
  } catch (error) {
    next(error);
  }
}