/** @jsxImportSource theme-ui */

import axios from "axios";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useContext,
  useState,
} from "react";
import { Spinner } from "theme-ui";
import Input from "../../components/Input";
import { PizzasContext } from "../../context/PizzasProvider";
import { formatAPIErrors } from "../../utils/formatAPIErrors";

export interface AddNewPizzaProps {}

const AddNewPizza = (props: AddNewPizzaProps) => {
  const [newPizza, setNewPizza] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNewPizzaChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (errorMessage) {
      setErrorMessage("");
    }
    setNewPizza(e.currentTarget.value);
  };

  const { pizzas, setPizzas } = useContext(PizzasContext);
  const handleAddClick = async () => {
    try {
      setIsLoading(true);
      const result = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/pizzas`,
        {
          name: newPizza.trim(),
          toppings: [],
        }
      );
      const resultPizza = result.data;
      resultPizza.toppings = resultPizza.toppings?.length
        ? resultPizza.toppings
        : [];
      const newPizzas = [resultPizza, ...pizzas];
      setIsLoading(false);
      setNewPizza("");
      if (setPizzas) {
        setPizzas(newPizzas);
      }
    } catch (error) {
      const errorMessage = formatAPIErrors(error, "adding the pizza");
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
        value={newPizza}
        label={"Enter Pizza"}
        onChange={handleNewPizzaChange}
        onKeyUp={handleKeyEvent}
        errorMessage={errorMessage}
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
      />
    </div>
  );
};

export default AddNewPizza;
