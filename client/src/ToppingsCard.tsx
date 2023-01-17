/** @jsxImportSource theme-ui */

import AddNewTopping from "./AddNewTopping";
import Card from "./components/Card";
import CardHeader from "./components/CardHeader";
import ToppingsProvider from "./context/ToppingsProvider";
import ToppingsCardList from "./ToppingsCardList";

const ToppingsCard = ({}) => {
  return (
    <Card
      sx={{
        maxWidth: "45em",
      }}
    >
      <ToppingsProvider>
        <AddNewTopping />
        <CardHeader text="Toppings" />
        <ToppingsCardList />
      </ToppingsProvider>
    </Card>
  );
};

export default ToppingsCard;
