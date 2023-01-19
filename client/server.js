const express = require("express");
const path = require("path");

const initializeExpress = () => {
  const app = express();

  app.use(express.static(path.join(__dirname, "build")));

  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
  const port = Number(process.env.PORT) || 8080;
  app.listen(port);
  console.log(`Listening on port: ${port}`);
};

const startServer = async () => {
  console.log("Starting server...");
  initializeExpress();
};

startServer();
