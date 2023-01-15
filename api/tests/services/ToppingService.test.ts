import { expect, jest, describe, it, beforeEach } from "@jest/globals";
import { DeleteResult } from "typeorm";
import { Topping } from "../../src/database/entities/Topping";
import { BadUserInputError, EntityNotFoundError } from "../../src/errors/ClientSafeError";
import { ToppingRepository } from "../../src/repositories/ToppingRepository";
import { ToppingService } from "../../src/services/ToppingService";
import { ToppingView } from "../../src/views/ToppingView";
jest.mock("../../src/repositories/ToppingRepository");

describe("ToppingService", () => {

  let MOCK_TOPPINGS: Topping[];
  let MOCK_TOPPING: Topping;
  let mToppingRepoSave;
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

    mToppingRepoSave = jest.mocked(ToppingRepository.save);

  });

  it("createNewTopping should create new topping", async () => {
    // Arrange
    const mToppingRepoSave = jest.mocked(ToppingRepository.save);
    let mockTopping = new Topping();
    mockTopping.id = MOCK_TOPPING.id;
    mockTopping.name = MOCK_TOPPING.name;
    mToppingRepoSave.mockResolvedValueOnce(mockTopping);

    // Ensure no duplicate
    const mToppinfRepoFindOneBy = jest.mocked(ToppingRepository.findOneBy);
    mToppinfRepoFindOneBy.mockResolvedValue(null);

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
    const mToppingRepoFindOneBy = jest.mocked(ToppingRepository.findOneBy);
    mToppingRepoFindOneBy.mockResolvedValue(mockTopping);

    const testTopping = new ToppingView({
      name: MOCK_TOPPING.name,
      id: MOCK_TOPPING.id + 1,
    });

    // Act
    try {
      await ToppingService.createNewTopping(testTopping);
    } catch (error) {
      expect(error).toBeInstanceOf(BadUserInputError);
    }

    // Assert
    expect(mToppingSave).toBeCalledTimes(0);
  });

  it("getAllToppings should return all available Toppings", async () => {
    // Arrange
    const mToppingRepoFind = jest.mocked(ToppingRepository.find);
    mToppingRepoFind.mockResolvedValue(MOCK_TOPPINGS);

    // Act
    const result = await ToppingService.getAllToppings();

    // Assert
    expect(result).toEqual(MOCK_TOPPINGS);
    expect(mToppingRepoFind).toBeCalledTimes(1);
  });

  it("updateExistingTopping should update topping with updated name", async () => {
    // Arrange
    // Mock topping exists state
    const mToppingRepoFindOneBy = jest.mocked(ToppingRepository.findOneBy);
    mToppingRepoFindOneBy.mockResolvedValue(MOCK_TOPPING);

    const mToppingRepoSave = jest.mocked(ToppingRepository.save);
    mToppingRepoSave.mockResolvedValueOnce(MOCK_TOPPING);
    const testTopping = new ToppingView(MOCK_TOPPING);

    // Act
    const result = await ToppingService.updateExistingTopping(testTopping);

    // Assert
    expect(result).toEqual(testTopping);
    expect(mToppingRepoSave).toBeCalledTimes(1);
    expect(mToppingRepoSave).toBeCalledWith(testTopping);
  });

  it("deleteExistingTopping should return a status and id", async () => {
    // Arrange

    // Mock topping exists state
    const mToppingRepoFindOneBy = jest.mocked(ToppingRepository.findOneBy);
    mToppingRepoFindOneBy.mockResolvedValue(MOCK_TOPPING);

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
    
  });

  it("deleteExistingTopping for nonexistent id should throw EntityNotFoundError", async () => {
    // Arrange

    // Mock topping exists state
    const mToppingRepoFindOneBy = jest.mocked(ToppingRepository.findOneBy);
    mToppingRepoFindOneBy.mockResolvedValue(null);

    const deleteResult: DeleteResult = new DeleteResult();
    deleteResult.affected = 1;
    const mToppingRepoDelete = jest.mocked(ToppingRepository.delete);
    mToppingRepoDelete.mockResolvedValue(deleteResult);
    const testTopping = new ToppingView(MOCK_TOPPING);

    // Act & Assert
    try {
      await ToppingService.deleteExistingTopping(testTopping)
    } catch (error) {
      expect(error).toBeInstanceOf(EntityNotFoundError)
    }
    expect(mToppingRepoDelete).toBeCalledTimes(0);
    
  });

})