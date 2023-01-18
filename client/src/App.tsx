/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import { entitiesToManage } from "./utils/enums";
import TabButton from "./components/TabButton";
import ToppingsCard from "./tabs/toppings/ToppingsCard";
import PizzasCard from "./tabs/pizzas/PizzasCard";
import ToppingsProvider from "./context/ToppingsProvider";

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
        <ToppingsProvider>
          {entityToManage === entitiesToManage.TOPPINGS ? (
            <ToppingsCard />
          ) : (
            <PizzasCard />
          )}
        </ToppingsProvider>
      </main>
    </div>
  );
}

export default App;
