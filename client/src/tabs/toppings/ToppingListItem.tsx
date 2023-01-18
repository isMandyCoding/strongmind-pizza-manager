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
import { ToppingsContext } from "../../context/ToppingsProvider";
import { formatAPIErrors } from "../../utils/formatAPIErrors";

export interface ToppingListItemProps {
  name: string;
  id: number;
}

const ToppingListItem = ({ name, id }: ToppingListItemProps) => {
  const [toppingChanged, setToppingChanged] = useState(false);
  const [updateToppingError, setUpdateToppingError] = useState("");
  const [toppingName, setToppingName] = useState(name);
  const [deleteError, setDeleteError] = useState("");

  const handleToppingNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setToppingChanged(true);
    setToppingName(e.currentTarget.value);
  };

  const { setToppings, toppings } = useContext(ToppingsContext);

  const handleKeyEvent: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && toppingChanged) {
      handleSaveClick(e);
    }
  };

  const handleSaveClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    setUpdateToppingError("");
    if (toppingName === name) {
      return;
    }
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/toppings`, {
        id: id,
        name: toppingName.trim(),
      });
      if (setToppings) {
        const newToppings = toppings.map((topping) => {
          if (topping.id === id) {
            topping.name = toppingName;
          }
          return topping;
        });
        setToppings(newToppings);
      }
      setToppingChanged(false);
    } catch (error) {
      const errorMessage = formatAPIErrors(error, "updating the topping");
      setUpdateToppingError(errorMessage);
    }
  };

  const handleDeleteClick = async () => {
    setDeleteError("");
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/toppings`,
        {
          data: {
            id: id,
            name: name,
          },
        }
      );
      if (result.data.status === "success") {
        const newToppings = toppings.filter((topping) => topping.id !== id);
        if (setToppings) {
          setToppings(newToppings);
        }
      }
    } catch (error) {
      const errorMessage = formatAPIErrors(error, "deleting the topping");
      setDeleteError(errorMessage);
    }
  };

  return (
    <CardListItem
      sx={{
        justifyContent: "space-between",
        minHeight: "60px",
        m: 2,
        p: 2,
        gap: 2,
      }}
    >
      <div
        sx={{
          variant: "flex.column",
          alignItems: "start",
        }}
      >
        <div
          sx={{
            variant: "flex.row",
          }}
        >
          <Input
            value={toppingName}
            autoFocus
            label="Topping"
            onChange={handleToppingNameChange}
            errorMessage={updateToppingError}
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
        <InputErrorHelperText sx={{ m: 0 }}>{deleteError}</InputErrorHelperText>
      </div>
      <div
        sx={{
          variant: "flex.row",
          position: "relative",
          gap: 2,
        }}
      >
        <Button
          disabled={!toppingChanged}
          id={`saveTopping${id}`}
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

export default ToppingListItem;
