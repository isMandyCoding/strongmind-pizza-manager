import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";
import createDBConnection from "./database/createDBConnection";
import { ToppingController } from "./controllers/ToppingController";
import { RouteNotFoundError } from "./errors/ClientSafeError";
import { errorHandler } from "./middleware/errorHandler";
import { AddToppingRoutes } from "./routes/AddToppingRoutes";
import { AddPizzaRoutes } from "./routes/AddPizzaRoutes";

const connectToDatabase = async () => {
  try {
    createDBConnection();
  } catch(error) {
    console.log(error);
  }
}

const initializeExpress = (): Application => {
  
  const app: Application = express();
  
  
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  // Add routes
  app.get("/", (req, resp) => {
    resp.send({
      status: "The API is working!",
    })
  });
  AddToppingRoutes(app);
  AddPizzaRoutes(app);
  app.use((req, resp, next) => next(new RouteNotFoundError(req.originalUrl)));
  app.use(errorHandler)

  const port: number = Number(process.env.PORT) || 5000;
  app.listen(port);
  console.log(`Listening on port: ${port}`);
  return app;
}


const startServer = async (): Promise<Application> => {
  console.log("Connecting to database...");
  await connectToDatabase();
  console.log("Connected to DB.");
  console.log("Starting server...");
  return initializeExpress();
}

startServer();

export default startServer;