import "./App.css";
import { AllRoutes } from "./routes/AllRoutes";
import { Header, Footer } from "./components";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { dark } from "@mui/material/styles/createPalette";
import { useState } from "react";

interface Game {
  id: number;
  user: {
    id: number;
  };
  duration: number;
  round: number;
  attempts: number;
  date: string;
  points: number;
  success: boolean;
  sequence: number[];
  guesses: number[][];
  responses: number[][];
}

function App() {
  const [finishZeroResponse, setFinishZeroResponse] = useState<Game>();
  return (
    <Container maxWidth="xl" disableGutters>
      <Header
        finishZeroResponse={finishZeroResponse}
        setFinishZeroResponse={setFinishZeroResponse}
      />
      <AllRoutes
        finishZeroResponse={finishZeroResponse}
        setFinishZeroResponse={setFinishZeroResponse}
      />
    </Container>
  );
}

export default App;
