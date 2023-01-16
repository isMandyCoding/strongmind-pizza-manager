import { expect, jest, describe, it, beforeEach } from "@jest/globals";
import { DeleteResult } from "typeorm";
import { Pizza } from "../../src/database/entities/Pizza";
import { Topping } from "../../src/database/entities/Topping";
import { BadUserInputError, EntityNotFoundError } from "../../src/errors/ClientSafeError";
import { ToppingRepository } from "../../src/repositories/ToppingRepository";
import { ToppingService } from "../../src/services/ToppingService";
import { ToppingView } from "../../src/views/ToppingView";
jest.mock("../../src/repositories/ToppingRepository");

describe("ToppingService", () => {

  let MOCK_TOPPINGS: Topping[];
  let MOCK_TOPPING: Topping;
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

    MOCK_TOPPING = {
      id: 4,
      name: "Olives",
      pizzas: []
    }


  });

  it("createNewTopping should create new topping", async () => {
    // Arrange
    const mToppingRepoSave = jest.mocked(ToppingRepository.save);
    let mockTopping = new Topping();
    mockTopping.id = MOCK_TOPPING.id;
    mockTopping.name = MOCK_TOPPING.name;
    mToppingRepoSave.mockResolvedValue(mockTopping);

    // Ensure no duplicate
    const mToppinfRepoFindOne = jest.mocked(ToppingRepository.findOne);
    mToppinfRepoFindOne.mockResolvedValue(null);

    const testTopping = new ToppingView({
      name: MOCK_TOPPING.name
    });

    // Act
    const result = await ToppingService.createNewTopping(testTopping);
    const expectedTopping = new Topping();
    expectedTopping.name = MOCK_TOPPING.name;
    // Assert
    expect(result).toEqual(new ToppingView({
      id: MOCK_TOPPING.id,
      name: MOCK_TOPPING.name
    }));
    expect(mToppingRepoSave).toBeCalledTimes(1);
    expect(mToppingRepoSave).toBeCalledWith(expectedTopping);
  });

  it("createNewTopping with duplicate name should throw BadUserInputError", async () => {
    // Arrange
    const mToppingSave = jest.mocked(ToppingRepository.save);
    let mockTopping = new Topping();
    mockTopping.id = MOCK_TOPPING.id + 2;
    mockTopping.name = MOCK_TOPPING.name;

    // Duplicate exists condition
    const mToppingRepoFindOne = jest.mocked(ToppingRepository.findOne);
    mToppingRepoFindOne.mockResolvedValue(mockTopping);

    const testTopping = new ToppingView({
      name: MOCK_TOPPING.name,
      id: MOCK_TOPPING.id + 1,
    });

    // Act
    try {
      await ToppingService.createNewTopping(testTopping);
      expect(false).toBeTruthy();
    } catch (error) {
      expect(error).toBeInstanceOf(BadUserInputError);
    }

    // Assert
    expect(mToppingSave).toBeCalledTimes(0);
    expect(mToppingRepoFindOne).toBeCalledTimes(1);
  });

  it("getAllToppings should return all available Toppings", async () => {
    // Arrange
    const mToppingRepoFind = jest.mocked(ToppingRepository.find);
    mToppingRepoFind.mockResolvedValue(MOCK_TOPPINGS);
    
    // Act
    const result = await ToppingService.getAllToppings();
    
    // Assert
    const expected = MOCK_TOPPINGS.map(topping => new ToppingView(topping));
    expect(result).toEqual(expected);
    expect(mToppingRepoFind).toBeCalledTimes(1);
  });

  it("updateExistingTopping should update topping with updated name", async () => {
    // Arrange
    const toppingToResolve = new Topping();
    toppingToResolve.id = MOCK_TOPPING.id
    toppingToResolve.name = MOCK_TOPPING.name;
    toppingToResolve.pizzas = MOCK_TOPPING.pizzas;
    const mToppingRepoFindOne = jest.mocked(ToppingRepository.findOne);

    // First call for rejectIfDuplicate should return null to prevent error
    mToppingRepoFindOne.mockResolvedValueOnce(null);
    // Second Call for findOrReject's call of findOne should resolve to MOCK_TOPPING
    mToppingRepoFindOne.mockResolvedValueOnce(toppingToResolve);

    const mToppingRepoSave = jest.mocked(ToppingRepository.save);
    mToppingRepoSave.mockResolvedValue(toppingToResolve);
    const testTopping = new ToppingView(MOCK_TOPPING);

    // Act
    const result = await ToppingService.updateExistingTopping(testTopping);

    // Assert
    expect(result).toEqual(testTopping);
    expect(mToppingRepoSave).toBeCalledTimes(1);
    expect(mToppingRepoSave).toBeCalledWith(toppingToResolve);
    expect(mToppingRepoFindOne).toBeCalledTimes(2);
  });

  describe("deleteExistingTopping", () => {
    let mToppingRepoFindOne: any;

    beforeEach(() => {
      mToppingRepoFindOne = jest.mocked(ToppingRepository.findOne);

    });

    it("should return a status and id", async () => {
      // Arrange
  
      // Mock topping exists state
      const mToppingRepoFindOne = jest.mocked(ToppingRepository.findOne);
      mToppingRepoFindOne.mockResolvedValue(MOCK_TOPPING);
  
      const deleteResult: DeleteResult = new DeleteResult();
      deleteResult.affected = 1;
      const mToppingRepoDelete = jest.mocked(ToppingRepository.delete);
      mToppingRepoDelete.mockResolvedValue(deleteResult);
      const testTopping = new ToppingView(MOCK_TOPPING);
      const expectedResult = {
        id: MOCK_TOPPING.id,
        status: "success",
      }
  
      // Act
      const result = await ToppingService.deleteExistingTopping(testTopping);
  
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mToppingRepoDelete).toBeCalledTimes(1);
      expect(mToppingRepoFindOne).toBeCalledTimes(1);
      
    });
  
    it("for nonexistent id should throw EntityNotFoundError", async () => {
      // Arrange
  
      // Mock topping exists state
      mToppingRepoFindOne.mockResolvedValue(null);
  
      const deleteResult: DeleteResult = new DeleteResult();
      deleteResult.affected = 1;
      const mToppingRepoDelete = jest.mocked(ToppingRepository.delete);
      const testTopping = new ToppingView(MOCK_TOPPING);
  
      // Act & Assert
      try {
        await ToppingService.deleteExistingTopping(testTopping);
        expect(false).toBeTruthy();
      } catch (error) {
        expect(error).toBeInstanceOf(EntityNotFoundError)
      }
      expect(mToppingRepoFindOne).toBeCalledTimes(1);
      expect(mToppingRepoDelete).toBeCalledTimes(0);
      
    });

    it("should cause BadUserInputError if pizzas are using topping", async () => {
      const mResolvedTopping = MOCK_TOPPING;
      const mResolvedPizza = new Pizza();
      mResolvedPizza.name = "Delicious Pizza";
      const mResolvedPizza2 = new Pizza();
      mResolvedPizza2.name = "Delicious Pizza 2";
      mResolvedTopping.pizzas = [mResolvedPizza, mResolvedPizza2];
      mToppingRepoFindOne.mockResolvedValue(mResolvedTopping);
      const mToppingRepoDelete = jest.mocked(ToppingRepository.delete);

      const testTopping = new ToppingView(MOCK_TOPPING);


      try {
        await ToppingService.deleteExistingTopping(testTopping);
        expect(false).toBeTruthy();
      } catch (error) {
        expect(error).toEqual(new BadUserInputError({
          detail: `Unable to delete. Topping is being used on pizzas named: Delicious Pizza, Delicious Pizza 2`
        }));
      }

      expect(mToppingRepoFindOne).toBeCalledTimes(1);
      expect(mToppingRepoDelete).toBeCalledTimes(0);
    });

  })

})