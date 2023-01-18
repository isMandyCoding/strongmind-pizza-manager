/** @jsxImportSource theme-ui */
import axios from "axios";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  SyntheticEvent,
  useContext,
  useState,
} from "react";
import Button from "../../components/Button";
import CardListItem from "../../components/CardListItem";
import Input from "../../components/Input";
import InputErrorHelperText from "../../components/InputErrorHelperText";
import { Pizza, PizzasContext } from "../../context/PizzasProvider";
import { Topping } from "../../context/ToppingsProvider";
import { formatAPIErrors } from "../../utils/formatAPIErrors";
import UpdatePizzaToppings from "./UpdatePizzaToppings";

export interface PizzaListItemProps {
  name: string;
  id: number;
  toppings: Topping[];
}

const PizzaListItem = ({ name, id, toppings }: PizzaListItemProps) => {
  const [pizzaChanged, setPizzaChanged] = useState(false);
  const [updatePizzaError, setUpdatePizzaError] = useState("");
  const [pizzaName, setPizzaName] = useState(name);
  const [pizzaToppings, setPizzaToppings] = useState(toppings);
  const [deleteError, setDeleteError] = useState("");

  const handlePizzaNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPizzaChanged(true);
    setPizzaName(e.currentTarget.value);
  };

  const { setPizzas, pizzas } = useContext(PizzasContext);

  const handleKeyEvent: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && pizzaChanged) {
      handleSaveClick(e);
    }
  };

  const handleSaveClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    setUpdatePizzaError("");
    setDeleteError("");
    try {
      console.log("handleSaveClicked");
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/pizzas`, {
        id: id,
        name: pizzaName.trim(),
        toppings: pizzaToppings,
      });
      if (setPizzas) {
        const newPizzas = pizzas.map((pizza: Pizza) => {
          if (pizza.id === id) {
            pizza.name = pizzaName;
          }
          return pizza;
        });
        setPizzas(newPizzas);
      }
      setPizzaChanged(false);
    } catch (error) {
      const errorMessage = formatAPIErrors(error, "updating the pizza");
      setUpdatePizzaError(errorMessage);
    }
  };

  const handleDeleteClick = async () => {
    setDeleteError("");
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/pizzas`,
        {
          data: {
            id: id,
            name: name,
            toppings: pizzaToppings,
          },
        }
      );
      if (result.data.status === "success") {
        const newPizzas = pizzas.filter((pizza: Pizza) => pizza.id !== id);
        if (setPizzas) {
          setPizzas(newPizzas);
        }
      }
    } catch (error) {
      const errorMessage = formatAPIErrors(error, "deleting the pizza");
      setDeleteError(errorMessage);
    }
  };

  const handleSelectedToppingsChange = (newToppings: Topping[]) => {
    setPizzaChanged(true);
    setPizzaToppings(newToppings);
  };

  return (
    <CardListItem
      sx={{
        minHeight: "60px",
        m: 2,
        p: 2,
        gap: 2,
        justifyContent: "space-between",
      }}
    >
      <div
        sx={{
          variant: "flex.row",
          flexDirection: ["column", null, "row"],
          gap: 4,
          flexGrow: 3,
        }}
      >
        <div>
          <div
            sx={{
              variant: "flex.row",
            }}
          >
            <Input
              value={pizzaName}
              label="Pizza"
              onChange={handlePizzaNameChange}
              errorMessage={updatePizzaError}
              onKeyUp={handleKeyEvent}
              wrapperSx={{
                my: 0,
              }}
              sx={{
                variant: "inputs.minimal",
                maxWidth: "120px",
              }}
              labelProps={{
                sx: {
                  variant: "labels.visuallyHidden",
                },
              }}
            />
            <i
              className="fa-solid fa-pen-to-square"
              sx={{ color: "lightgray" }}
            ></i>
          </div>
          <InputErrorHelperText sx={{ m: 0 }}>
            {deleteError}
          </InputErrorHelperText>
        </div>
        <UpdatePizzaToppings
          sx={{
            my: [3, 0],
          }}
          pizzaToppings={pizzaToppings}
          pizzaId={id}
          onSelectedToppingsChange={handleSelectedToppingsChange}
        />
      </div>
      <div
        sx={{
          variant: "flex.row",
          justifyContent: "flex-end",
          position: "relative",
          gap: 2,
          flexGrow: 2,
        }}
      >
        <Button
          disabled={!pizzaChanged}
          id={`savePizza${id}`}
          onClick={handleSaveClick}
        >
          Save
        </Button>
        <Button onClick={handleDeleteClick} color="danger">
          Delete
        </Button>
      </div>
    </CardListItem>
  );
};

export default PizzaListItem;
