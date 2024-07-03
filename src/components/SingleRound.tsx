import Box from "@mui/material/Box";
import React from "react";
import { RoundedElement } from "../components";
import Grid from "@mui/material/Grid";
import { useMediaQuery } from "@mui/material";

interface SingleRoundProps {
  active?: boolean;
  response?: number[];
}

export const SingleRound: React.FC<SingleRoundProps> = ({
  active,
  response,
}) => {
  // Define breakpoints for different sizes
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );
  const isMediumScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.between("sm", "md")
  );

  // Set sizes based on screen size
  const blueSize = isSmallScreen ? 27 : isMediumScreen ? 25 : 30;
  const greenSize = isSmallScreen ? 13 : isMediumScreen ? 18 : 20;
  const activeSize = isSmallScreen ? 32 : isMediumScreen ? 30 : 35;

  return (
    <Box
      display="flex"
      flexDirection={"row"}
      alignItems="center"
      justifyContent="center"
      gap={0}
      sx={{
        margin: "0 auto",
        py: 0.7,
      }}
    >
      {/* First Group of 8 Elements */}
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={0}
        marginRight={1.2}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <RoundedElement
            key={index}
            color="#e8eaf6"
            size={blueSize}
            activeSize={activeSize}
            active={active}
            index={index}
          />
        ))}
      </Box>

      {/* Second Group of 8 Elements in Two Rows of 4 Elements Each */}
      <Box display="flex" flexDirection="column" alignItems="center" gap={0}>
        <Box display="flex" justifyContent="center" gap={0}>
          {Array.from({ length: 4 }).map((_, index) => (
            <RoundedElement key={index} color="#c5cae9" size={greenSize} />
          ))}
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          gap={0}
          margin={0}
          padding={0}
          paddingTop={0.1}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <RoundedElement key={index} color="#c5cae9" size={greenSize} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
