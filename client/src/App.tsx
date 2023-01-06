import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [greeting, setGreeting] = useState("Loading...");

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>App Status: {greeting}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
