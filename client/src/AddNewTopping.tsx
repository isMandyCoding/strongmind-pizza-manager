/** @jsxImportSource theme-ui */

import axios from "axios";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useContext,
  useState,
} from "react";
import { Spinner } from "theme-ui";
import Input from "./components/Input";
import { ToppingsContext } from "./context/ToppingsProvider";
import { formatAPIErrors } from "./utils/formatAPIErrors";

export interface AddNewToppingProps {}

const AddNewTopping = ({}: AddNewToppingProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newTopping, setNewTopping] = useState("");
  const handleNewToppingChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (errorMessage) {
      setErrorMessage("");
    }
    setNewTopping(e.currentTarget.value);
  };

  const { toppings, setToppings } = useContext(ToppingsContext);
  const handleAddClick = async () => {
    try {
      setIsLoading(true);
      const result = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/toppings`,
        {
          name: newTopping.trim(),
        }
      );
      const resultTopping = result.data;
      const newToppings = [resultTopping, ...toppings];
      setIsLoading(false);
      setNewTopping("");
      if (setToppings) {
        setToppings(newToppings);
      }
    } catch (error) {
      const errorMessage = formatAPIErrors(error, "adding the topping");
      setErrorMessage(errorMessage);
      setIsLoading(false);
    }
  };

  const handleKeyEvent: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleAddClick();
    }
  };

  return (
    <div
      sx={{
        variant: "flex.row",
        justifyContent: "center",
      }}
    >
      <Input
        value={newTopping}
        label={"Enter Topping"}
        onChange={handleNewToppingChange}
        onKeyUp={handleKeyEvent}
        buttonProps={{
          color: "secondary",
          children: isLoading ? (
            <Spinner variant="styles.spinner" size={20} strokeWidth={2} />
          ) : (
            "Add"
          ),
          disabled: isLoading || !!errorMessage,
          onClick: handleAddClick,
        }}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default AddNewTopping;
