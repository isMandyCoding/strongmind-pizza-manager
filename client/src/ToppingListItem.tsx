/** @jsxImportSource theme-ui */
import axios from "axios";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
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

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const { setToppings, toppings } = useContext(ToppingsContext);

  const handleBlur = () => {
    setToppingName(name);
    setIsEditMode(false);
  };

  const handleSaveClick = async () => {
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
      setIsEditMode(false);
      if (setToppings) {
        const newToppings = toppings.map((topping) => {
          if (topping.id === id) {
            topping.name = toppingName;
          }
          return topping;
        });
        setToppings(newToppings);
      }
    } catch (error) {
      const errorMessage = formatAPIErrors(error, "updating the topping");
      setUpdateToppingError(errorMessage);
    }
  };

  const handleKeyEvent: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleSaveClick();
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
          onKeyDown={handleKeyEvent}
          onBlur={handleBlur}
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
          <Button onClick={handleSaveClick}>Save</Button>
        ) : (
          <Button onClick={handleEditClick}>Edit</Button>
        )}
        <Button onClick={handleDeleteClick} color="danger">
          Delete
        </Button>
      </div>
    </CardListItem>
  );
};

export default ToppingListItem;
