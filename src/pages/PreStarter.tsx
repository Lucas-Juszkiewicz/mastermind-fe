import { Paper } from "@mui/material";
import { getToken, refreshAccessToken } from "../Keycloak";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PreStarter = () => {
  const navigate = useNavigate();
  useEffect(() => {
    refreshAccessToken();
    navigate("/game");
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        margin: "20px auto", // Center the Paper with margin
        p: "56px",
        maxWidth: "800px", // Set a maximum width for better readability
        backgroundColor: "#f3f4f6", // Light background color
        borderRadius: "6px", // Rounded corners
        border: "1px solid #ddd",
      }}
    ></Paper>
  );
};
