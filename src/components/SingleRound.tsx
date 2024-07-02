import Box from "@mui/material/Box";
import React from "react";
import { RoundedElement } from "../components";
import Grid from "@mui/material/Grid";
import { useMediaQuery } from "@mui/material";

export const SingleRound = () => {
  // Define breakpoints for different sizes
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );
  const isMediumScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.between("sm", "md")
  );

  // Set sizes based on screen size
  const blueSize = isSmallScreen ? 20 : isMediumScreen ? 25 : 30;
  const greenSize = isSmallScreen ? 15 : isMediumScreen ? 18 : 20;

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      alignItems="center"
      justifyContent="center"
      gap={3}
    >
      {/* First Group of 8 Elements */}
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={0}>
        {Array.from({ length: 8 }).map((_, index) => (
          <RoundedElement key={index} color="blue" size={blueSize} />
        ))}
      </Box>

      {/* Second Group of 8 Elements in Two Rows of 4 Elements Each */}
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <Box display="flex" justifyContent="center" gap={1}>
          {Array.from({ length: 4 }).map((_, index) => (
            <RoundedElement key={index} color="green" size={greenSize} />
          ))}
        </Box>
        <Box display="flex" justifyContent="center" gap={1}>
          {Array.from({ length: 4 }).map((_, index) => (
            <RoundedElement key={index} color="green" size={greenSize} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
