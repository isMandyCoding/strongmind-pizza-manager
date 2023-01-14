import { NextFunction } from "express";

export const errorCatcher = async (next: NextFunction, callBack: Function) => {
  try {
    return await callBack();
  } catch (error) {
    next(error);
  }
}