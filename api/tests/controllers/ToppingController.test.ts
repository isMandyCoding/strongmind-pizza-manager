import { describe, expect, jest, it, beforeEach } from "@jest/globals";
import { ToppingService } from "../../src/services/ToppingService";
import { ToppingView } from "../../src/views/ToppingView";
import { ToppingController } from "../../src/controllers/ToppingController";
import { DeleteResultView } from "../../src/views/DeleteResultView";
jest.mock("../../src/services/ToppingService");

describe("ToppingController", () => {

  
  let MOCK_TOPPINGS: ToppingView[];
  let MOCK_TOPPING: ToppingView;
  let req;
  let resp;


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

    req = {
      body: MOCK_TOPPINGS,
    };

    resp = {
      json: jest.fn(),
      send: jest.fn()
    }
  });

  it("getToppings should get all toppings", async () => {
    // Arrange
    const mToppingServiceGet = jest.mocked(ToppingService.getAllToppings);
    mToppingServiceGet.mockResolvedValue(MOCK_TOPPINGS);


    // Act
    await ToppingController.getToppings(req, resp);

    // Assert
    expect(resp.send).toBeCalledTimes(1);
    expect(resp.send).toBeCalledWith(MOCK_TOPPINGS);
    
  });

  it("createTopping should create new topping", async () => {
      // Arrange
      const mToppingServiceCreate = jest.mocked(ToppingService.createNewTopping);
      mToppingServiceCreate.mockResolvedValue(MOCK_TOPPING);
      req.body = {
        name: MOCK_TOPPING.name,
      }

      // Act
      await ToppingController.getToppings(req, resp);

      // Assert
      expect(mToppingServiceCreate).toBeCalledTimes(1);
      expect(mToppingServiceCreate).toBeCalledWith(req.body);
      expect(resp.send).toBeCalledTimes(1);
      expect(resp.send).toBeCalledWith(MOCK_TOPPING);
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
    await ToppingController.updateTopping(req, resp);

    // Assert
    expect(mTOppingServiceUpdate).toBeCalledTimes(1);
    expect(mTOppingServiceUpdate).toBeCalledWith(req.body);
    expect(resp.send).toBeCalledTimes(1);
    expect(resp.send).toBeCalledWith(MOCK_TOPPING);
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
    await ToppingController.deleteTopping(req, resp);

    // Assert
    expect(mToppingServiceDelete).toBeCalledTimes(1);
    expect(mToppingServiceDelete).toBeCalledWith(req.body);
    expect(resp.send).toBeCalledTimes(1);
    expect(resp.send).toBeCalledWith(deleteResult);
  });

});