import { beforeAll, describe, expect, jest, it } from "@jest/globals";
import { Pizza } from "../../src/database/entities/Pizza";
import { Topping } from "../../src/database/entities/Topping";
import { PizzaService } from "../../src/services/PizzaService";
import { PizzaRepository } from "../../src/repositories/PizzaRepository";
import { PizzaView } from "../../src/views/PizzaView";
import { DeleteResult, UpdateResult } from "typeorm";
import { beforeEach } from "node:test";

jest.mock("../../src/repositories/PizzaRepository");

describe("PizzaService", () => {

  let MOCK_PIZZAS: Pizza[];
  let MOCK_TOPPINGS: Topping[];
  let MOCK_PIZZA: Pizza;

  beforeEach(() => {

    MOCK_TOPPINGS = [
      {
        id: 1,
        name: "Pepperoni"
      },
      {
        id: 2,
        name: "Ham"
      },
      {
        id: 3,
        name: "Mushrooms"
      },
    ];

    MOCK_PIZZAS = [
      {
        id: 1,
        name: "Ultimate Porker",
        toppings: MOCK_TOPPINGS.slice(0, 1),
        toppingComposit: MOCK_TOPPINGS.slice(0, 1).join(","),
        combineToppingNames: jest.fn()
      },
      {
        id: 2,
        name: "Hamroom",
        toppings: MOCK_TOPPINGS.slice(1, 2),
        toppingComposit: MOCK_TOPPINGS.slice(1, 2).join(","),
        combineToppingNames: jest.fn()
      },
    ];

    MOCK_PIZZA = {
      id: 4,
      name: "Manager's Special",
      toppings: MOCK_TOPPINGS,
      toppingComposit: MOCK_TOPPINGS.join(","),
      combineToppingNames: jest.fn()
    }
  });

  it("createNewPizza should create new pizza", async () => {
    // Arrange
    const mPizzaRepoCreate = jest.mocked(PizzaRepository.create);
    mPizzaRepoCreate.mockReturnValue(MOCK_PIZZA);

    const testPizza = new PizzaView(MOCK_PIZZA);

    // Act
    const result = await PizzaService.createNewPizza(testPizza);

    // Assert
    expect(result).toBe(testPizza);
    expect(mPizzaRepoCreate).toBeCalledTimes(1);
    expect(mPizzaRepoCreate).toBeCalledWith(MOCK_PIZZA);
  });

  it("createNewPizza should throw DuplicateToppings error when repository throws dup error", async () => {
    // Arrange
    const mPizzaRepoCreate = jest.mocked(PizzaRepository.create);
    // mPizzaRepoCreate.mockReturnValue(new Error(""))
    const testPizza = new PizzaView(MOCK_PIZZA);

    // Act
    const result = await PizzaService.updateExistingPizza(testPizza);

    // Assert
    expect(result).toBe(testPizza);
    expect(mPizzaRepoCreate).toBeCalledTimes(1);
    expect(mPizzaRepoCreate).toBeCalledWith(testPizza);
  });

  it("getAllPizzas should return all available Pizzas", async () => {
    // Arrange
    const mToppingRepoFind = jest.mocked(PizzaRepository.find);
    mToppingRepoFind.mockResolvedValue(MOCK_PIZZAS);

    // Act
    const result = await PizzaService.getAllPizzas();

    // Assert
    expect(result).toEqual(MOCK_PIZZAS.map(pizza => new PizzaView(pizza)));
    expect(mToppingRepoFind).toBeCalledTimes(1);
  });

  it("updateExistingPizza should update pizza with updated name and toppings", async () => {
    // Arrange
    const updateResult: UpdateResult = new UpdateResult();
    updateResult.affected = 1;
    const mPizzaRepoUpdate = jest.mocked(PizzaRepository.update);
    mPizzaRepoUpdate.mockResolvedValue(updateResult);
    const testPizza = new PizzaView(MOCK_PIZZA);

    // Act
    const result = await PizzaService.updateExistingPizza(testPizza);

    // Assert
    expect(result).toBe(testPizza);
    expect(mPizzaRepoUpdate).toBeCalledTimes(1);
    expect(mPizzaRepoUpdate).toBeCalledWith(testPizza);
  });

  it("deleteExistingPizza should return a status and id", async () => {
    // Arrange
    const deleteResult: DeleteResult = new DeleteResult();
    deleteResult.affected = 1;
    const mPizzaRepoDelete = jest.mocked(PizzaRepository.delete);
    mPizzaRepoDelete.mockRejectedValue(deleteResult);
    const testPizza = new PizzaView(MOCK_PIZZA);
    const expectedResult = {
      id: MOCK_PIZZA.id,
      status: "success",
    }

    // Act
    const result = await PizzaService.deleteExistingPizza(testPizza);

    // Assert
    expect(result).toBe(expectedResult);
    expect(mPizzaRepoDelete).toBeCalledTimes(1);
    
  });

});