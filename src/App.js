import Todos from "./components/Todos.js";
import { AppBar } from "@mui/material";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <div>
        <AppBar position="static">
          <h1> Task Management App </h1>
        </AppBar>
      </div>
      <Todos />
    </div>
  );
}
