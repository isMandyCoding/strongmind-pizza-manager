import { expect, jest, describe, it, beforeEach } from "@jest/globals";
import { DeleteResult, UpdateResult } from "typeorm";
import { Topping } from "../../src/database/entities/Topping";
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

    MOCK_TOPPING = {
      id: 4,
      name: "Olives"
    }

    mToppingRepoSave = jest.mocked(ToppingRepository.save);

  });

  it("createNewTopping should create new topping", async () => {
    // Arrange
    const mToppingRepoCreate = jest.mocked(ToppingRepository.create);
    mToppingRepoCreate.mockReturnValue(MOCK_TOPPING);

    const testTopping = new ToppingView(MOCK_TOPPING);

    // Act
    const result = await ToppingService.createNewTopping(testTopping);

    // Assert
    expect(result).toBe(testTopping);
    expect(mToppingRepoCreate).toBeCalledTimes(1);
    expect(mToppingRepoCreate).toBeCalledWith(MOCK_TOPPING);
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
    const updateResult: UpdateResult = new UpdateResult();
    updateResult.affected = 1;
    const mToppingRepoUpdate = jest.mocked(ToppingRepository.update);
    mToppingRepoUpdate.mockResolvedValue(updateResult);
    const testTopping = new ToppingView(MOCK_TOPPING);

    // Act
    const result = await ToppingService.updateExistingTopping(testTopping);

    // Assert
    expect(result).toBe(testTopping);
    expect(mToppingRepoUpdate).toBeCalledTimes(1);
    expect(mToppingRepoUpdate).toBeCalledWith(testTopping);
  });

  it("deleteExistingTopping should return a status and id", async () => {
    // Arrange
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
    expect(result).toBe(expectedResult);
    expect(mToppingRepoDelete).toBeCalledTimes(1);
    
  });

})