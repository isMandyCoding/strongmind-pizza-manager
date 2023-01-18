import { Fragment, useContext, useEffect } from "react";
import { Divider, Spinner } from "theme-ui";
import CardList from "../../components/CardList";
import InputErrorHelperText from "../../components/InputErrorHelperText";
import { Pizza, PizzasContext } from "../../context/PizzasProvider";
import PizzaListItem from "./PizzaListItem";

export interface PizzasCardListProps {}

const PizzasCardList = (props: PizzasCardListProps) => {
  const { pizzas, getPizzas, isPizzasLoading, isPizzasError } =
    useContext(PizzasContext);

  useEffect(() => {
    getPizzas();
  }, [getPizzas]);

  const pizzaItems = pizzas.map((pizza: Pizza) => {
    return (
      <Fragment key={pizza.id}>
        <PizzaListItem
          name={pizza.name}
          id={pizza.id}
          toppings={pizza.toppings}
        />
        <Divider variant="styles.hr" color="secondary" />
      </Fragment>
    );
  });

  return (
    <CardList>
      {isPizzasLoading && !isPizzasError ? <Spinner /> : pizzaItems}
      {isPizzasError && !isPizzasLoading && (
        <InputErrorHelperText>
          There was an error loading the pizzas
        </InputErrorHelperText>
      )}
    </CardList>
  );
};

export default PizzasCardList;
