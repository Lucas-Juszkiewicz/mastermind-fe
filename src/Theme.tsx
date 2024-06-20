import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: {
      // main: "#ffc107",
      // main: "#283593",
      main: "#3f51b5",
    },
    secondary: {
      main: "#673ab7", // Custom secondary color
    },
  },
  typography: {
    allVariants: {
      color: "#1a237e",
      fontFamily: "teko, sans-serif",
      fontSize: "1.5rem",
    },
    h6: {
      // color: "#283593",
      // color: "#ffc107",
      color: "#ffc107",
      // fontSize: "2.5rem",
      fontFamily: "Permanent Marker, sans-serif", // Custom font family
    },
  },
});

export default Theme;
