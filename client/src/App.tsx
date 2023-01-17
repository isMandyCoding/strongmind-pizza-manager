/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import CardHeader from "./components/CardHeader";
import { entitiesToManage } from "./utils/enums";
import TabButton from "./components/TabButton";
import AddNewTopping from "./AddNewTopping";
import CardList from "./components/CardList";
import ToppingListItem from "./ToppingListItem";
import ToppingsCard from "./ToppingsCard";

function App() {
  const [entityToManage, setEntityToManage] = useState(
    entitiesToManage.TOPPINGS
  );

  return (
    <div>
      <header
        sx={{
          variant: "flex.column",
        }}
      >
        <h1
          sx={{
            variant: "text.heading",
            textAlign: "center",
          }}
        >
          Pizza Manager
        </h1>
      </header>
      <main
        sx={{
          variant: "flex.column",
          minHeight: "100%",
          p: 2,
        }}
      >
        <div sx={{ variant: "flex.row" }}>
          <TabButton
            selected={entityToManage === entitiesToManage.TOPPINGS}
            onClick={() => setEntityToManage(entitiesToManage.TOPPINGS)}
          >
            Toppings
          </TabButton>
          <TabButton
            selected={entityToManage === entitiesToManage.PIZZAS}
            onClick={() => setEntityToManage(entitiesToManage.PIZZAS)}
          >
            Pizzas
          </TabButton>
        </div>
        {entityToManage === entitiesToManage.TOPPINGS ? (
          <ToppingsCard />
        ) : (
          <Card
            sx={{
              maxWidth: "45em",
            }}
          >
            <CardHeader text="Pizzas" />
          </Card>
        )}
      </main>
    </div>
  );
}

export default App;
