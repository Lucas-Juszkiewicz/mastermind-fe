import "./App.css";
import { AllRoutes } from "./routes/AllRoutes";
import { Header, Footer } from "./components";
import Box from "@mui/material/Box";

function App() {
  return (
    <div className="App">
      <Header />
      <Box
        height={200}
        width={200}
        my={4}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ border: "2px solid grey" }}
      >
        This Box uses MUI System props for quick customization.
        <AllRoutes />
      </Box>
      <Footer />
    </div>
  );
}

export default App;
