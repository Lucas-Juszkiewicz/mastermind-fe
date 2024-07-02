import React from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

interface RoundedElementProps {
  color: string;
  size: number;
}

export const RoundedElement: React.FC<RoundedElementProps> = ({
  color,
  size,
}) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        display: "inline-block",
        margin: 1,
      }}
    />
  );
};
