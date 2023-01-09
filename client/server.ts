import express from "express";
import path from "path";

const initializeExpress = (): void => {
  
  const app: express.Application = express();
  
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  const port: number = Number(process.env.PORT) || 3000;
  app.listen(port);
  console.log(`Listening on port: ${port}`)
}


const startServer = async (): Promise<void> => {
  console.log("Starting server...");
  initializeExpress();
}

startServer();