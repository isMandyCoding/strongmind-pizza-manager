/** @jsxImportSource theme-ui */

import { Fragment, useContext, useEffect } from "react";
import { ToppingsContext } from "../../context/ToppingsProvider";
import { Divider, Spinner } from "theme-ui";
import CardList from "../../components/CardList";
import InputErrorHelperText from "../../components/InputErrorHelperText";
import ToppingListItem from "./ToppingListItem";

export interface ToppingsCardListProps {}

const ToppingsCardList = (props: ToppingsCardListProps) => {
  const { toppings, getToppings, isToppingsLoading, isToppingsError } =
    useContext(ToppingsContext);

  useEffect(() => {
    getToppings();
  }, [getToppings]);

  const toppingItems = toppings.map((topping: any, i) => {
    return (
      <Fragment key={topping.id}>
        <ToppingListItem name={topping?.name} id={topping.id} />
        <Divider variant="styles.hr" color="secondary" />
      </Fragment>
    );
  });

  return (
    <CardList>
      {isToppingsLoading && !isToppingsError ? <Spinner /> : toppingItems}
      {isToppingsError && !isToppingsLoading && (
        <InputErrorHelperText>
          There was an error loading the toppings
        </InputErrorHelperText>
      )}
    </CardList>
  );
};

export default ToppingsCardList;
