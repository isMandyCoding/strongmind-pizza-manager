/** @jsxImportSource theme-ui */

import Card from "../../components/Card";
import CardHeader from "../../components/CardHeader";
import PizzasProvider from "../../context/PizzasProvider";
import AddNewPizza from "./AddNewPizza";
import PizzasCardList from "./PizzasCardList";

const PizzasCard = () => {
  return (
    <Card
      sx={{
        maxWidth: "45em",
        overflowX: "scroll",
      }}
    >
      <PizzasProvider>
        <AddNewPizza />
        <CardHeader text="Pizzas" />
        <PizzasCardList />
      </PizzasProvider>
    </Card>
  );
};

export default PizzasCard;
