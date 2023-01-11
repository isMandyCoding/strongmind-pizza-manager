import { Request, Response } from "express";
import { ToppingService } from "../services/ToppingService";
import { DeleteResultView } from "../views/DeleteResultView";
import { ToppingView } from "../views/ToppingView";


export class ToppingController {
  
  static getToppings = async (req: Request, resp: Response): Promise<Response<ToppingView[]>> => {
    const toppings = await ToppingService.getAllToppings();
    return resp.send(toppings);
  }

  static createTopping = async (req: Request, resp: Response): Promise<Response<ToppingView>> => {
    console.error("Not implemented");
    return resp.send(new ToppingView({id: 1, name: req.body.name}));

  }
  
  static updateTopping = async (req: Request, resp: Response): Promise<Response<ToppingView>> => {
    console.error("Not implemented");
    return resp.send(new ToppingView({id: req.body.id, name: req.body.name}));
  }

  static deleteTopping = async (req: Request, resp: Response): Promise<Response<ToppingView>> => {
    console.error("Not implemented");
    
    return resp.send(new DeleteResultView(req.body.id, "success"));
  }

}