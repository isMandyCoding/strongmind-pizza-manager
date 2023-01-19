/** @jsxImportSource theme-ui */

import { HTMLAttributes, useContext } from "react";
import Select, { MultiValue } from "react-select";
import { SxProp } from "theme-ui";
import { Topping, ToppingsContext } from "../../context/ToppingsProvider";

export type UpdatePizzaToppingsProps = HTMLAttributes<HTMLDivElement> &
  SxProp & {
    pizzaToppings: Topping[];
    pizzaId: number;
    onSelectedToppingsChange: (toppings: Topping[]) => void;
  };

const UpdatePizzaToppings = (props: UpdatePizzaToppingsProps) => {
  const { pizzaId, pizzaToppings, onSelectedToppingsChange, className } = props;
  const { toppings, isToppingsLoading, isToppingsError } =
    useContext(ToppingsContext);
  const toppingOptions = toppings.map((topping) => {
    return {
      value: topping.id,
      label: topping.name,
    };
  });
  const defaultValue = pizzaToppings.map((topping) => {
    return {
      value: topping.id,
      label: topping.name,
    };
  });

  const handleChange = (
    newValue: MultiValue<{ value: number; label: string }>
  ) => {
    const newToppings = newValue.map((option): Topping => {
      return {
        id: option.value,
        name: option.label,
      };
    });
    onSelectedToppingsChange(newToppings);
  };
  return (
    <div
      className={className}
      id={"test"}
      sx={{
        width: "100%",
      }}
    >
      <Select
        isMulti
        onChange={handleChange}
        options={toppingOptions}
        defaultValue={defaultValue}
        isLoading={isToppingsLoading}
        isDisabled={isToppingsError}
        name={`pizza_toppings_${pizzaId}`}
      />
    </div>
  );
};

export default UpdatePizzaToppings;
