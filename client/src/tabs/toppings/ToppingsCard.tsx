/** @jsxImportSource theme-ui */

import AddNewTopping from "./AddNewTopping";
import Card from "../../components/Card";
import CardHeader from "../../components/CardHeader";
import ToppingsCardList from "./ToppingsCardList";

const ToppingsCard = () => {
  return (
    <Card
      sx={{
        maxWidth: "45em",
      }}
    >
      <AddNewTopping />
      <CardHeader text="Toppings" />
      <ToppingsCardList />
    </Card>
  );
};

export default ToppingsCard;
