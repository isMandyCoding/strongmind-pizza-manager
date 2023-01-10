import { RequestHandler } from "express";
import { ToppingRepository } from "../repositories/ToppingRepository";


export class ToppingController {
  
  static getToppings: RequestHandler = async (req, resp) => {
    const toppings = await ToppingRepository.find();
    resp.send(toppings);
  }

  static createTopping: RequestHandler = async (req, resp) => {
    console.error("Not implemented");
  }
  
  static updateTopping: RequestHandler = async () => {
    console.error("Not implemented");
  }

  static deleteTopping: RequestHandler = async () => {
    console.error("Not implemented");
  }

}