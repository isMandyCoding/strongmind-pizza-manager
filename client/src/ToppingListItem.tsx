/** @jsxImportSource theme-ui */
import axios from "axios";
import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  SyntheticEvent,
  useContext,
  useState,
} from "react";
import Button from "./components/Button";
import CardListItem from "./components/CardListItem";
import Input from "./components/Input";
import InputErrorHelperText from "./components/InputErrorHelperText";
import { ToppingsContext } from "./context/ToppingsProvider";
import { formatAPIErrors } from "./utils/formatAPIErrors";

export interface ToppingListItemProps {
  name: string;
  id: number;
}

const ToppingListItem = ({ name, id }: ToppingListItemProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateToppingError, setUpdateToppingError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toppingName, setToppingName] = useState(name);
  const [deleteError, setDeleteError] = useState("");

  const handleToppingNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setToppingName(e.currentTarget.value);
  };

  const handleEditClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsEditMode(true);
  };

  const { setToppings, toppings } = useContext(ToppingsContext);

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setToppingName(name);
    setIsEditMode(false);
  };

  // To prevent blur event on input
  const handleSaveMouseDown = (e: SyntheticEvent) => e.preventDefault();

  const handleKeyEvent: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleSaveClick(e);
    }
  };

  const handleSaveClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    setUpdateToppingError("");
    if (toppingName === name) {
      setIsEditMode(false);
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
        setIsEditMode(false);
        setToppings(newToppings);
      }
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
      {isEditMode ? (
        <Input
          value={toppingName}
          autoFocus
          label="Topping"
          onChange={handleToppingNameChange}
          errorMessage={updateToppingError}
          onBlur={handleBlur}
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
      ) : (
        <div
          sx={{
            variant: "flex.column",
            alignItems: "start",
          }}
        >
          <p sx={{ my: 0 }} onClick={handleEditClick}>
            {toppingName}
          </p>
          <InputErrorHelperText sx={{ m: 0 }}>
            {deleteError}
          </InputErrorHelperText>
        </div>
      )}
      <div
        sx={{
          variant: "flex.row",
          position: "relative",
          gap: 2,
        }}
      >
        {isEditMode ? (
          <Button
            id={`saveTopping${id}`}
            onClick={handleSaveClick}
            onMouseDown={handleSaveMouseDown}
          >
            Save
          </Button>
        ) : (
          <Button id={`editTopping${id}`} onClick={handleEditClick}>
            Edit
          </Button>
        )}
        <Button onClick={handleDeleteClick} color="danger">
          Delete
        </Button>
      </div>
    </CardListItem>
  );
};

export default ToppingListItem;
