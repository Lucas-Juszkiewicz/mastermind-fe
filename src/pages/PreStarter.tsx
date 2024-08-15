import { Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthMethods } from "../AuthMethodsProvider";
import { UserAuthContext } from '../UserAuthProvider';

export const PreStarter = () => {
  const { redirectToKeycloak, getToken, refreshAccessToken, isTokenValid, checkTokenValidity, startCheckingIsTokenValid } = useAuthMethods();
  
  const userAuthContext = useContext(UserAuthContext);
  if (!userAuthContext) {
    throw new Error('useContext must be used within an AuthProvider');
  }
  
  const { userAuth } = userAuthContext;
  const navigate = useNavigate();
  useEffect(() => {
    if(!isTokenValid(userAuth.tokenExp)){
      refreshAccessToken();
    }
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
