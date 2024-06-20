import "./App.css";
import { AllRoutes } from "./routes/AllRoutes";
import { Header, Footer } from "./components";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { dark } from "@mui/material/styles/createPalette";

function App() {
  return (
    <Container maxWidth="xl" disableGutters>
      <Header />
      <AllRoutes />
    </Container>
  );
}

export default App;
