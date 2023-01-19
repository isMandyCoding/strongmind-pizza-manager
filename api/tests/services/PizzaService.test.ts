import { beforeEach, describe, expect, jest, it } from "@jest/globals";
import { Pizza } from "../../src/database/entities/Pizza";
import { Topping } from "../../src/database/entities/Topping";
import { PizzaService } from "../../src/services/PizzaService";
import { PizzaRepository } from "../../src/repositories/PizzaRepository";
import { PizzaView } from "../../src/views/PizzaView";
import { DeleteResult, Not } from "typeorm";
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
        pizzas: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Ham",
        pizzas: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        
      },
      {
        id: 3,
        name: "Mushrooms",
        pizzas: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    MOCK_PIZZAS = [
      {
        id: 1,
        name: "Ultimate Porker",
        toppings: MOCK_TOPPINGS.slice(0, 1),
        toppingComposit: MOCK_TOPPINGS.slice(0, 1).join(","),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Hamroom",
        toppings: MOCK_TOPPINGS.slice(1, 2),
        toppingComposit: MOCK_TOPPINGS.slice(1, 2).join(","),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    MOCK_PIZZA = {
      id: 4,
      name: "Manager's Special",
      toppings: MOCK_TOPPINGS,
      toppingComposit: MOCK_TOPPINGS.join(","),
      createdAt: new Date(),
      updatedAt: new Date(),
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
      mPizzaSave.mockResolvedValue(MOCK_PIZZA);
      mPizzaRepoFindOne.mockResolvedValue(null);
  
      const saveCalledWithPizza = new Pizza();
      saveCalledWithPizza.name = MOCK_PIZZA.name;
      saveCalledWithPizza.toppings = MOCK_PIZZA.toppings.map((topping) => {
        const newTop = new Topping();
        newTop.id = topping.id;
        newTop.name = topping.name;
        return newTop;
      })
      const expectedResult = new PizzaView(MOCK_PIZZA);
      const testPizza = new PizzaView(MOCK_PIZZA);
      testPizza.id = undefined;
      // Act
      const result = await PizzaService.createNewPizza(testPizza);
  
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mPizzaSave).toBeCalledTimes(1);
      expect(mPizzaSave).toBeCalledWith(saveCalledWithPizza);
    });
  
    it("should throw BaderUserInputError when duplicate pizza is found", async () => {
      // Arrange
      mPizzaRepoFindOne.mockResolvedValue(MOCK_PIZZA); // mock match pizza found
      const mPizzaRepoSave = jest.mocked(PizzaRepository.save);
      const testPizza = new PizzaView(MOCK_PIZZA);
      testPizza.id = undefined;
      
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

  describe("updateExistingPizza", () => {

    let mPizzaRepoSave: any;
    let mPizzaRepoFindOneBy: any;
    let mPizzaRepoFindOne: any;
    let pizzaRepoIsCalledWith: Pizza;

    beforeEach(() => {
      mPizzaRepoSave = jest.mocked(PizzaRepository.save);
      mPizzaRepoFindOneBy = jest.mocked(PizzaRepository.findOneBy);
      mPizzaRepoFindOne = jest.mocked(PizzaRepository.findOne);
      pizzaRepoIsCalledWith = new Pizza();
      pizzaRepoIsCalledWith.id = MOCK_PIZZA.id;
      pizzaRepoIsCalledWith.name = MOCK_PIZZA.name;
      pizzaRepoIsCalledWith.toppings = MOCK_PIZZA.toppings.map(topping => {
        const newTop = new Topping();
        newTop.id = topping.id;
        newTop.name = topping.name;
        return newTop;
      })
      });

    it("should update pizza with updated name and toppings", async () => {
      // Arrange
      mPizzaRepoFindOneBy.mockResolvedValue(pizzaRepoIsCalledWith);
      mPizzaRepoFindOne.mockResolvedValue(null);
      mPizzaRepoSave.mockResolvedValue(pizzaRepoIsCalledWith);

      const testPizza = new PizzaView(MOCK_PIZZA);
  
      // Act
      const result = await PizzaService.updateExistingPizza(testPizza);
  
      // Assert
      expect(result).toEqual(testPizza);
      expect(mPizzaRepoSave).toBeCalledTimes(1);
      expect(mPizzaRepoSave).toBeCalledWith(pizzaRepoIsCalledWith);
    });

    it("should throw EntityNotFoundError when no matching Pizza is found", async () => {
      // Arrange
      mPizzaRepoFindOne.mockResolvedValue(null)
      mPizzaRepoFindOneBy.mockResolvedValue(null);
      const testPizza = new PizzaView(MOCK_PIZZA);

      // Act
      try {
        await PizzaService.updateExistingPizza(testPizza);
      } catch (error) {
        //Assert
        expect(error).toEqual(new EntityNotFoundError("Pizza"))
      }
      expect(mPizzaRepoFindOne).toBeCalledTimes(1);
      expect(mPizzaRepoFindOneBy).toBeCalledTimes(1);
      expect(mPizzaRepoSave).toBeCalledTimes(0);
    });

    it("should throw BadUserInputError if duplicate Pizza is found", async () => {
      // Arrage
      mPizzaRepoFindOne.mockResolvedValue(pizzaRepoIsCalledWith);
      const testPizza = new PizzaView(MOCK_PIZZA);

      // Act
      try {
        await PizzaService.updateExistingPizza(testPizza);
      } catch (error) {
        expect(error).toEqual(new BadUserInputError({
          detail: "Duplicate Pizza name or toppings is not allowed",
        })); 
      }
      expect(mPizzaRepoFindOne).toBeCalledTimes(1);
      expect(mPizzaRepoFindOneBy).toBeCalledTimes(0);
      expect(mPizzaRepoSave).toBeCalledTimes(0);

    })
  })


  describe("deleteExistingPizza", () => {

    let mPizzaRepoFindOneBy: any;
    let mPizzaRepoDelete: any;

    beforeEach(() => {
      mPizzaRepoFindOneBy = jest.mocked(PizzaRepository.findOneBy);
      mPizzaRepoDelete = jest.mocked(PizzaRepository.delete);
    })

    it("should return a status and id", async () => {
      // Arrange
      mPizzaRepoFindOneBy.mockResolvedValue(MOCK_PIZZA);
      const deleteResult: DeleteResult = new DeleteResult();
      deleteResult.affected = 1;
      mPizzaRepoDelete.mockResolvedValue(deleteResult);
      const testPizza = new PizzaView(MOCK_PIZZA);
      const expectedResult = new DeleteResultView(MOCK_PIZZA.id, "success");
  
      // Act
      const result = await PizzaService.deleteExistingPizza(testPizza);
  
      // Assert
      expect(result).toEqual  (expectedResult);
      expect(mPizzaRepoDelete).toBeCalledTimes(1);
      expect(mPizzaRepoDelete).toBeCalledWith(MOCK_PIZZA.id);
      
    });

    it("should throw a EntityNotFoundError if no matching Pizza is found", async () => {
      mPizzaRepoFindOneBy.mockResolvedValue(null);
      const testPizza = new PizzaView(MOCK_PIZZA);
      testPizza.id = testPizza.id ?? 0 + 1;
      try {
        await PizzaService.deleteExistingPizza(testPizza);
      } catch (error) {
        expect(error).toBeInstanceOf(EntityNotFoundError);
        expect(error).toEqual(new EntityNotFoundError("Pizza"))
      }
      expect(mPizzaRepoFindOneBy).toBeCalledTimes(1);
      expect(mPizzaRepoFindOneBy).toBeCalledWith({
        id: testPizza.id
      });
      expect(mPizzaRepoDelete).toBeCalledTimes(0);

    })
  })

  it("saveOrUpdatePizza should throw BadUserInputError if any toppings a missing an id", async () => {
    // Arrange
    const mPizzaRepoSave = jest.mocked(PizzaRepository.save);
    const testPizza = new PizzaView(MOCK_PIZZA)
    testPizza.toppings = testPizza.toppings.map((topping) => {
      topping.id = undefined;
      return topping;
    });

    // Act
    try {
      await PizzaService.saveOrUpdatePizza(testPizza);
      expect(false).toBeTruthy();
    } catch (error) {
      // Assert
      expect(error).toEqual(new BadUserInputError({
        detail: "Toppings must have an id"
      }));
    }
    expect(mPizzaRepoSave).toBeCalledTimes(0);

  });

});