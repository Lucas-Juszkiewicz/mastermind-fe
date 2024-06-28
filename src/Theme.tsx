import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: {
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
      color: "#ffc107",
      fontFamily: "Permanent Marker, sans-serif", // Custom font family
    },
    body1: {
      fontSize: "1.9rem",
      lineHeight: 1.2,
    },
    body2: {
      fontSize: "1.8rem",
      lineHeight: 1.2,
      fontFamily: "Ubuntu Sans Mono",
      "@media (max-width:600px)": {
        fontSize: "1.5rem",
      },
      "@media (max-width:400px)": {
        fontSize: "1.3rem",
      },
    },
  },
});

export default Theme;
