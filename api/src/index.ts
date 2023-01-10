import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";
import createDBConnection from "./database/createDBConnection";
import { ToppingController } from "./controllers/ToppingController";

const connectToDatabase = async () => {
  try {
    createDBConnection();
  } catch(error) {
    console.log(error);
  }
}

const initializeExpress = (): void => {
  
  const app: Application = express();
  
  
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.get("/", (req, resp) => {
    resp.send({
      status: "The API is working! At least mostly...",
    })
  });

  app.get("/toppings", ToppingController.getToppings);
  const port: number = Number(process.env.PORT) || 5000;
  app.listen(port);
  console.log(`Listening on port: ${port}`)
}


const startServer = async (): Promise<void> => {
  console.log("Connecting to database...");
  await connectToDatabase();
  console.log("Connected to DB.");
  console.log("Starting server...");
  initializeExpress();
}

startServer();