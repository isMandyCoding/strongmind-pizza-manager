import { describe, expect, jest, it, beforeEach } from "@jest/globals";
import { PizzaService } from "../../src/services/PizzaService";
import { PizzaView } from "../../src/views/PizzaView";
import { PizzaController } from "../../src/controllers/PizzaController";
import { DeleteResultView } from "../../src/views/DeleteResultView";
import { ToppingView } from "../../src/views/ToppingView";
jest.mock("../../src/services/PizzaService");

describe("PizzaController", () => {

  
  let MOCK_TOPPINGS: ToppingView[];
  let MOCK_PIZZAS: PizzaView[];
  let MOCK_PIZZA: PizzaView;
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

    MOCK_PIZZAS = [
      {
        id: 1,
        name: "Ultimate Porker",
        toppings: MOCK_TOPPINGS.slice(0, 1),
      },
      {
        id: 2,
        name: "Hamroom",
        toppings: MOCK_TOPPINGS.slice(1, 2),
      },
    ];

    MOCK_PIZZA = {
      id: 4,
      name: "Manager's Special",
      toppings: MOCK_TOPPINGS,
    }

    req = {
    };

    resp = {
      json: jest.fn(),
      send: jest.fn().mockImplementation((item: any) => {
        return {
          body: item
        }
      })
    }
  });

  it("getPizzas should get all toppings", async () => {
    // Arrange
    const mPizzaServiceGet = jest.mocked(PizzaService.getAllPizzas);
    mPizzaServiceGet.mockResolvedValue(MOCK_PIZZAS);


    // Act
    const result = await PizzaController.getPizzas(req, resp);

    // Assert
    expect(result).toBe(MOCK_PIZZAS);
    expect(resp.send).toBeCalledTimes(1);
    expect(resp.send).toBeCalledWith(MOCK_PIZZAS);
  });

  it("createTopping should create new topping", async () => {
      // Arrange
      const mPizzaServiceCreate = jest.mocked(PizzaService.createNewPizza);
      mPizzaServiceCreate.mockImplementation(async (pizza: PizzaView) => {
        const newPizza = new PizzaView(pizza);
        newPizza.id = MOCK_PIZZA.id;
        return newPizza;
      });
      req.body = {
        name: MOCK_PIZZA.name,
        toppings: MOCK_PIZZA.toppings.slice(),
      }

      // Act
      await PizzaController.createPizza(req, resp);

      // Assert
      expect(mPizzaServiceCreate).toBeCalledTimes(1);
      expect(mPizzaServiceCreate).toBeCalledWith(req.body);
      expect(resp.send).toBeCalledTimes(1);
      expect(resp.send).toBeCalledWith(MOCK_PIZZA);
  });

  it("updatePizza should update pizza and its toppings", async () => {
    // Arrange
    const mPizzaServiceUpdate = jest.mocked(PizzaService.updateExistingPizza);
    mPizzaServiceUpdate.mockImplementation(async (pizza: PizzaView) => {
      return new PizzaView(pizza);
    })
    req.body = {
      id: MOCK_PIZZA.id,
      toppings: MOCK_PIZZA.toppings.slice(),
      name: "New Pizza Name",
    }

    // Act
    await PizzaController.updatePizza(req, resp);

    // Assert
    expect(mPizzaServiceUpdate).toBeCalledTimes(1);
    expect(mPizzaServiceUpdate).toBeCalledWith(req.body);
    expect(resp.send).toBeCalledTimes(1);
    expect(resp.send).toBeCalledWith(MOCK_PIZZA);
  });

  it("deletePizza should delete pizza", async () => {
    // Arrange
    const deleteResult = new DeleteResultView(MOCK_PIZZA.id ?? 0, "success");
    const mPizzaServiceDelete = jest.mocked(PizzaService.deleteExistingPizza);
    mPizzaServiceDelete.mockImplementation(async (pizza) => {
      return deleteResult;
    });
    req.body = {
      id: MOCK_PIZZA.id,
    }

    // Act
    await PizzaController.deletePizza(req, resp);

    // Assert
    expect(mPizzaServiceDelete).toBeCalledTimes(1);
    expect(mPizzaServiceDelete).toBeCalledWith(req.body);
    expect(resp.send).toBeCalledTimes(1);
    expect(resp.send).toBeCalledWith(deleteResult);
  });

});