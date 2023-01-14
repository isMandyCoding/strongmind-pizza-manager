import { describe, expect, jest, it, beforeEach } from "@jest/globals";
import { ToppingService } from "../../src/services/ToppingService";
import { ToppingView } from "../../src/views/ToppingView";
import { ToppingController } from "../../src/controllers/ToppingController";
import { DeleteResultView } from "../../src/views/DeleteResultView";
import { NextFunction, Request, request, Response, response, Send } from "express";
jest.mock("../../src/services/ToppingService");

describe("ToppingController", () => {

  
  let MOCK_TOPPINGS: ToppingView[];
  let MOCK_TOPPING: ToppingView;
  let req: Request;
  let resp: Response;
  let next: NextFunction;
  let mRespSend: jest.Mocked<Send>


  beforeEach(() => {
    
    MOCK_TOPPINGS = [
      new ToppingView({
        id: 1,
        name: "Pepperoni"
      }),
      new ToppingView({
        id: 2,
        name: "Ham"
      }),
      new ToppingView({
        id: 3,
        name: "Mushrooms"
      }),
    ];

    MOCK_TOPPING = new ToppingView({
      id: 4,
      name: "Olives"
    });

    req = jest.mocked(request);

    
    resp = jest.mocked(response);
    mRespSend = jest.mocked(response.send);    

    next = jest.fn();
  });

  it("getToppings should get all toppings", async () => {
    // Arrange
    const mToppingServiceGet = jest.mocked(ToppingService.getAllToppings);
    mToppingServiceGet.mockResolvedValue(MOCK_TOPPINGS); 


    // Act
    await ToppingController.getToppings(req, resp, next);

    // Assert
    expect(mRespSend).toBeCalledTimes(1);
    expect(mRespSend).toBeCalledWith(MOCK_TOPPINGS);
    
  });

  it("createTopping should create new topping", async () => {
      // Arrange
      const mToppingServiceCreate = jest.mocked(ToppingService.createNewTopping);
      mToppingServiceCreate.mockResolvedValue(MOCK_TOPPING);
      req.body = {
        name: MOCK_TOPPING.name,
      };

      // Act
      await ToppingController.createTopping(req, resp, next);

      // Assert
      expect(mToppingServiceCreate).toBeCalledTimes(1);
      expect(mToppingServiceCreate).toBeCalledWith(new ToppingView(req.body));
      expect(mRespSend).toBeCalledTimes(1);
      expect(mRespSend).toBeCalledWith(MOCK_TOPPING);
  });

  it("updateTopping should update topping", async () => {
    // Arrange
    const mTOppingServiceUpdate = jest.mocked(ToppingService.updateExistingTopping);
    mTOppingServiceUpdate.mockImplementation(async (topping: ToppingView) => {
      return topping;
    })
    req.body = {
      id: MOCK_TOPPING.id,
      name: "Anchovies",
    }

    // Act
    await ToppingController.updateTopping(req, resp, next);

    // Assert
    expect(mTOppingServiceUpdate).toBeCalledTimes(1);
    expect(mTOppingServiceUpdate).toBeCalledWith(new ToppingView(req.body));
    expect(mRespSend).toBeCalledTimes(1);
    expect(mRespSend).toBeCalledWith(MOCK_TOPPING);
  });

  it("deleteTopping should delete topping", async () => {
    // Arrange
    const deleteResult = new DeleteResultView(MOCK_TOPPING.id ?? 0, "success");
    const mToppingServiceDelete = jest.mocked(ToppingService.deleteExistingTopping);
    mToppingServiceDelete.mockImplementation(async (topping) => {
      return deleteResult;
    });
    req.body = {
      id: MOCK_TOPPING.id,
      name: MOCK_TOPPING.name,
    }

    // Act
    await ToppingController.deleteTopping(req, resp, next);

    // Assert
    expect(mToppingServiceDelete).toBeCalledTimes(1);
    expect(mToppingServiceDelete).toBeCalledWith(new ToppingView(req.body));
    expect(mRespSend).toBeCalledTimes(1);
    expect(mRespSend).toBeCalledWith(deleteResult);
  });

});