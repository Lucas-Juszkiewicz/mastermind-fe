import React from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

interface RoundedElementProps {
  color: string;
  size: number;
  hover?: boolean;
}

export const RoundedElement: React.FC<RoundedElementProps> = ({
  color,
  size,
  hover,
}) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        display: "inline-block",
        margin: 0.1,
        marginRight: 0.5,
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.35)", // Add subtle shadow
        ...(hover && {
          transition: "transform 0.3s ease-in-out", // Smooth transition on hover
          cursor: "pointer", // Change cursor on hover
          "&:hover": {
            transform: "scale(1.1)", // Scale up on hover
          },
        }),
      }}
    />
  );
};
