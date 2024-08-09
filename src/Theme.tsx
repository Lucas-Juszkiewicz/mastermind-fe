import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    verySmall: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

const Theme = createTheme({
  breakpoints: {
    values: {
      verySmall: 0,
      xs: 370,
      sm: 420,
      md: 900,
      lg: 1280,
      xl: 1920,
    },
  },

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
      fontFamily: ".lato-regular",
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
