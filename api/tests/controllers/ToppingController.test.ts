import { describe, expect, jest, it, beforeEach } from "@jest/globals";
import { ToppingService } from "../../src/services/ToppingService";
import { ToppingView } from "../../src/views/ToppingView";
import { ToppingController } from "../../src/controllers/ToppingController";
import { DeleteResultView } from "../../src/views/DeleteResultView";
import { BadUserInputError } from "../../src/errors/ClientSafeError";
jest.mock("../../src/services/ToppingService");

describe("ToppingController", () => {

  
  let MOCK_TOPPINGS: ToppingView[];
  let MOCK_TOPPING: ToppingView;
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

    MOCK_TOPPING = new ToppingView({
      id: 4,
      name: "Olives"
    });

    req = {
      body: {}
    }
    resp = {
      send: jest.fn()
    }
    next = jest.fn();
  });

  it("getToppings should get all toppings", async () => {
    // Arrange
    const mToppingServiceGet = jest.mocked(ToppingService.getAllToppings);
    mToppingServiceGet.mockResolvedValue(MOCK_TOPPINGS); 
    

    // Act
    await ToppingController.getToppings(req, resp, next);

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
      };

      // Act
      await ToppingController.createTopping(req, resp, next);

      // Assert
      expect(mToppingServiceCreate).toBeCalledTimes(1);
      expect(mToppingServiceCreate).toBeCalledWith(new ToppingView(req.body));
      expect(resp.send).toBeCalledTimes(1);
      expect(resp.send).toBeCalledWith(new ToppingView(MOCK_TOPPING));
  });

  describe("updateTopping", () => {
    let mToppingServiceUpdate: any;

    beforeEach(() => {
      mToppingServiceUpdate = jest.mocked(ToppingService.updateExistingTopping);
    })

    it("should update topping", async () => {
      // Arrange
      mToppingServiceUpdate.mockImplementationOnce(async (topping: ToppingView) => {
        return new ToppingView(topping);
      })
      req.body = {
        id: MOCK_TOPPING.id,
        name: "Anchovies",
      }
      const sendToBeCalledWith = new ToppingView(MOCK_TOPPING);
      sendToBeCalledWith.name = "Anchovies";
  
      // Act
      await ToppingController.updateTopping(req, resp, next);
  
      // Assert
      expect(mToppingServiceUpdate).toBeCalledWith(new ToppingView(req.body));
      expect(resp.send).toBeCalledTimes(1);
      expect(resp.send).toBeCalledWith(sendToBeCalledWith);
    });

    it("should throw BadUserInputError if name field is empty", async () => {
      // Arrange
      const testTopping = MOCK_TOPPING;
      testTopping.name = "";
      req.body = testTopping;

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

      await ToppingController.updateTopping(req, resp, next);

      // Assert
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(expectedError);
      expect(resp.send).toBeCalledTimes(0);
      expect(mToppingServiceUpdate).toBeCalledTimes(0);

    })
  })


  it("deleteTopping should delete topping", async () => {
    // Arrange
    const deleteResult = new DeleteResultView(MOCK_TOPPING.id ?? 0, "success");
    const mToppingServiceDelete = jest.mocked(ToppingService.deleteExistingTopping);
    mToppingServiceDelete.mockImplementation(async () => {
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
    expect(resp.send).toBeCalledTimes(1);
    expect(resp.send).toBeCalledWith(deleteResult);
  });

});