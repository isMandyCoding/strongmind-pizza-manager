/** @jsxImportSource theme-ui */
import React, { ChangeEventHandler, useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import CardHeader from "./components/CardHeader";
import { entitiesToManage } from "./utils/enums";
import TabButton from "./components/TabButton";
import Input from "./components/Input";

function App() {
  const [greeting, setGreeting] = useState("Loading...");
  const [newTopping, setNewTopping] = useState("");
  const handleNewToppingChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewTopping(e.currentTarget.value);
  };

  const [entityToManage, setEntityToManage] = useState(
    entitiesToManage.TOPPINGS
  );

  // An example of how to reach the express server in the same docker-compose network
  useEffect(() => {
    const pingBackend = async () => {
      try {
        const basicHttpResponse = await axios.get("http://localhost:5000/");
        setGreeting(basicHttpResponse?.data?.status);
        console.log("Testing hot reload");
      } catch (error) {
        console.error(error);
      }
    };
    pingBackend();
    return () => {};
  }, []);

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
          <Card
            sx={{
              maxWidth: "45em",
            }}
          >
            <Input
              value={newTopping}
              label={"Topping"}
              onChange={handleNewToppingChange}
            />
            <CardHeader text="Toppings" />
          </Card>
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
