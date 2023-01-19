import { describe, expect, jest, it, beforeEach } from "@jest/globals";
import { PizzaService } from "../../src/services/PizzaService";
import { PizzaView } from "../../src/views/PizzaView";
import { PizzaController } from "../../src/controllers/PizzaController";
import { DeleteResultView } from "../../src/views/DeleteResultView";
import { ToppingView } from "../../src/views/ToppingView";
import { BadUserInputError } from "../../src/errors/ClientSafeError";
jest.mock("../../src/services/PizzaService");

describe("PizzaController", () => {

  
  let MOCK_TOPPINGS: ToppingView[];
  let MOCK_PIZZAS: PizzaView[];
  let MOCK_PIZZA: PizzaView;
  let req: any;
  let resp: any;
  let next: any;


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
      new PizzaView({
        id: 1,
        name: "Ultimate Porker",
        toppings: MOCK_TOPPINGS.slice(0, 1),
      }),
      new PizzaView({
        id: 2,
        name: "Hamroom",
        toppings: MOCK_TOPPINGS.slice(1, 2),
      }),
    ];

    MOCK_PIZZA = new PizzaView({
      id: 4,
      name: "Manager's Special",
      toppings: MOCK_TOPPINGS,
    });

    req = {
      body: {}
    }
    resp = {
      send: jest.fn()
    }
    next = jest.fn();
  });

  it("getPizzas should get all toppings", async () => {
    // Arrange
    const mPizzaServiceGet = jest.mocked(PizzaService.getAllPizzas);
    mPizzaServiceGet.mockResolvedValue(MOCK_PIZZAS);


    // Act
    await PizzaController.getPizzas(req, resp, next);

    // Assert
    expect(resp.send).toBeCalledTimes(1);
    expect(resp.send).toBeCalledWith(MOCK_PIZZAS);
  });

  it("createPizza should create new topping", async () => {
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
      await PizzaController.createPizza(req, resp, next);

      // Assert
      expect(mPizzaServiceCreate).toBeCalledTimes(1);
      expect(mPizzaServiceCreate).toBeCalledWith(new PizzaView(req.body));
      expect(resp.send).toBeCalledTimes(1);
      expect(resp.send).toBeCalledWith(new PizzaView(MOCK_PIZZA));
  });

  describe("updatePizza", () => {

    let mPizzaServiceUpdate: any;
    beforeEach(() => {
      mPizzaServiceUpdate = jest.mocked(PizzaService.updateExistingPizza);
    });

    it("should update pizza and its toppings", async () => {
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
      await PizzaController.updatePizza(req, resp, next);
  
      // Assert
      expect(mPizzaServiceUpdate).toBeCalledTimes(1);
      expect(mPizzaServiceUpdate).toBeCalledWith(req.body);
      expect(resp.send).toBeCalledTimes(1);
      expect(resp.send).toBeCalledWith(new PizzaView(req.body));
    });

    it("should call next with BadUserInputError if name is empty", async () => {

      // Arrange
      const testPizza = MOCK_PIZZA;
      testPizza.name = "";
      req.body = testPizza;
      const expectedError = new BadUserInputError({
        error: {
          message: "There was invalid user input",
          code: "BAD_USER_INPUT",
          status: 400,
          detail: [
                {
                    target: {
                        name: ""
                    },
                    value: "",
                    property: "name",
                    children: [],
                    constraints: {
                      isLength: "Name must be between 1 and 50 characters"
                    }
                }
            ]
        }
      });

      // Act
      await PizzaController.updatePizza(req, resp, next);

      // Assert
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(expectedError);
      expect(resp.send).toBeCalledTimes(0);
      expect(mPizzaServiceUpdate).toBeCalledTimes(0);

    });

    it("should call next with BadUserInputError if toppings is not an array", async () => {

      // Arrange
      req.body = {
        id: MOCK_PIZZA.id,
        name: MOCK_PIZZA.name,
        toppings: "Not an Array"
      };
      const expectedError = new BadUserInputError({
        error: {
          message: "There was invalid user input",
          code: "BAD_USER_INPUT",
          status: 400,
          detail: [
                {
                    target: {
                        toppings: "Not an Array"
                    },
                    value: "Not an Array",
                    property: "toppings",
                    children: [],
                    constraints: {
                      isLength: "Toppings must be an array"
                    }
                }
            ]
        }
      });

      // Act
      await PizzaController.updatePizza(req, resp, next);

      // Assert
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(expectedError);
      expect(resp.send).toBeCalledTimes(0);
      expect(mPizzaServiceUpdate).toBeCalledTimes(0);

    });
  });

  

  it("deletePizza should delete pizza", async () => {
    // Arrange
    const deleteResult = new DeleteResultView(MOCK_PIZZA.id ?? 0, "success");
    const mPizzaServiceDelete = jest.mocked(PizzaService.deleteExistingPizza);
    mPizzaServiceDelete.mockResolvedValue(deleteResult);
    req.body = {
      id: MOCK_PIZZA.id,
      name: MOCK_PIZZA.name,
      toppings: MOCK_PIZZA.toppings,
    }

    // Act
    await PizzaController.deletePizza(req, resp, next);

    // Assert
    expect(mPizzaServiceDelete).toBeCalledTimes(1);
    expect(mPizzaServiceDelete).toBeCalledWith(req.body);
    expect(resp.send).toBeCalledTimes(1);
    expect(resp.send).toBeCalledWith(deleteResult);
  });

});