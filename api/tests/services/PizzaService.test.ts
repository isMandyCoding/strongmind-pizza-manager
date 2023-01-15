import { beforeEach, describe, expect, jest, it } from "@jest/globals";
import { Pizza } from "../../src/database/entities/Pizza";
import { Topping } from "../../src/database/entities/Topping";
import { PizzaService } from "../../src/services/PizzaService";
import { PizzaRepository } from "../../src/repositories/PizzaRepository";
import { PizzaView } from "../../src/views/PizzaView";
import { DeleteResult, Not, QueryRunner, SelectQueryBuilder, UpdateResult } from "typeorm";
import { BadUserInputError, EntityNotFoundError } from "../../src/errors/ClientSafeError";
import { DeleteResultView } from "../../src/views/DeleteResultView";

jest.mock("../../src/repositories/PizzaRepository");

describe("PizzaService", () => {

  let MOCK_PIZZAS: Pizza[];
  let MOCK_TOPPINGS: Topping[];
  let MOCK_PIZZA: Pizza;

  beforeEach(() => {

    MOCK_TOPPINGS = [
      {
        id: 1,
        name: "Pepperoni",
        pizzas: []
      },
      {
        id: 2,
        name: "Ham",
        pizzas: []
        
      },
      {
        id: 3,
        name: "Mushrooms",
        pizzas: []
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

  describe("createNewPizza", () => {
    let mPizzaRepoFindOne: any;

    beforeEach(() => {
      mPizzaRepoFindOne = jest.mocked(PizzaRepository.findOne);
    });
    
    it("should create new pizza", async () => {
      // Arrange
      const mPizzaSave = jest.mocked(PizzaRepository.save);
      mPizzaSave.mockResolvedValueOnce(MOCK_PIZZA);
      mPizzaRepoFindOne.mockResolvedValueOnce(null);
  
      const saveCalledWithPizza = new Pizza();
      saveCalledWithPizza.name = MOCK_PIZZA.name;
      saveCalledWithPizza.toppings = MOCK_PIZZA.toppings.map((topping) => {
        const newTop = new Topping();
        newTop.id = topping.id;
        newTop.name = topping.name;
        return newTop;
      })
      const expectedResult = new PizzaView(MOCK_PIZZA);
  
      // Act
      const result = await PizzaService.createNewPizza(new PizzaView(MOCK_PIZZA));
  
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mPizzaSave).toBeCalledTimes(1);
      expect(mPizzaSave).toBeCalledWith(saveCalledWithPizza);
    });
  
    it("should throw BaderUserInputError when duplicate pizza is found", async () => {
      // Arrange
      mPizzaRepoFindOne.mockResolvedValueOnce(MOCK_PIZZA); // mock match pizza found
      const mPizzaRepoSave = jest.mocked(PizzaRepository.save);
      const testPizza = new PizzaView(MOCK_PIZZA);
  
      // Act
      try {
        await PizzaService.createNewPizza(testPizza);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(BadUserInputError);
        expect(error).toEqual(new BadUserInputError({
          detail: "Duplicate Pizza name or toppings is not allowed",
        }));
      }
  
      expect(mPizzaRepoSave).toBeCalledTimes(0);
      expect(mPizzaRepoFindOne).toBeCalledTimes(1);
      expect(mPizzaRepoFindOne).toBeCalledWith({
        where: [
          {
            id: Not(Number(testPizza.id)),
            name: testPizza.name,
          },
          {
            id: Not(Number(testPizza.id)),
            toppingComposit: testPizza.toppingComposit,
          }
        ]
      });
    });
  })

  it("getAllPizzas should return all available Pizzas and their toppings", async () => {
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
    expect(result).toEqual  (testPizza);
    expect(mPizzaRepoUpdate).toBeCalledTimes(1);
    expect(mPizzaRepoUpdate).toBeCalledWith(testPizza);
  });

  describe("deleteExistingPizza", () => {

    let mPizzaRepoFindOne: any;
    let mPizzaRepoDelete: any;

    beforeEach(() => {
      mPizzaRepoFindOne = jest.mocked(PizzaRepository.findOne);
      mPizzaRepoDelete = jest.mocked(PizzaRepository.delete);
    })

    it("should return a status and id", async () => {
      // Arrange
      mPizzaRepoFindOne.mockResolvedValueOnce(MOCK_PIZZA);
      const deleteResult: DeleteResult = new DeleteResult();
      deleteResult.affected = 1;
      mPizzaRepoDelete.mockResolvedValueOnce(deleteResult);
      const testPizza = new PizzaView(MOCK_PIZZA);
      const expectedResult = new DeleteResultView(MOCK_PIZZA.id, "success");
  
      // Act
      const result = await PizzaService.deleteExistingPizza(testPizza);
  
      // Assert
      expect(result).toEqual  (expectedResult);
      expect(mPizzaRepoDelete).toBeCalledTimes(1);
      expect(mPizzaRepoDelete).toBeCalledWith(MOCK_PIZZA.id);
      
    });

    it("should throw a EntityNotFoundError if node matching Pizza is found", async () => {
      mPizzaRepoFindOne.mockResolvedValueOnce(null);
      const testPizza = new PizzaView(MOCK_PIZZA);

      try {
        await PizzaService.deleteExistingPizza(testPizza);
      } catch (error) {
        expect(error).toEqual(new EntityNotFoundError("Pizza"))
      }
      expect(mPizzaRepoFindOne).toBeCalledTimes(1);
      expect(mPizzaRepoDelete).toBeCalledTimes(0);

    })
  })

});