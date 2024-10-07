import { Paper, Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const About = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    // localStorage.setItem("userData", JSON.stringify(userData));
    navigate(-1);
  };
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "20px auto", // Center the Paper with margin
        p: "56px",
        maxWidth: "800px", // Set a maximum width for better readability
        backgroundColor: "#f3f4f6", // Light background color
        borderRadius: "6px", // Rounded corners
        border: "1px solid #ddd",
      }}
    >
      {/* <Box
        component="video"
        controls
        sx={{
          width: "80%", // Default width
          maxWidth: "600px",
          height: "auto",
          [theme.breakpoints.down("md")]: {
            width: "90%", // Adjust for medium screens
          },
          [theme.breakpoints.down("sm")]: {
            width: "100%", // Adjust for small screens
          },
          [theme.breakpoints.up("lg")]: {
            width: "60%", // Adjust for large screens
          },
        }}
      >
        <source
          src={`${process.env.PUBLIC_URL}/Video/MastermindHomeVideo.mp4`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </Box> */}
      <Typography
        variant="h5"
        align="center"
        sx={{
          fontFamily: "Permanent Marker, sans-serif",
          color: "#3f51b5",
          // fontSize: fontSize,
          lineHeight: 1.2,
          letterSpacing: "0.05em",
          mb: 3, // Reduced margin-bottom for more compact spacing
        }}
      >
        Technical informations
      </Typography>
      <Typography
        variant="body2"
        paragraph
        sx={{
          mt: "50px",
          mx: {
            xs: "0px",
            md: "80px",
          },
        }}
      >
        <strong>Backend:</strong> Java, Spring Boot
      </Typography>
      <Typography
        variant="body2"
        paragraph
        sx={{
          mt: "-5px",
          mx: {
            xs: "0px",
            md: "80px",
            textAlign: "left",
          },
        }}
      >
        <strong>Frontend:</strong> TypeScript, React, Material-UI
      </Typography>
      <Typography
        variant="body2"
        paragraph
        sx={{
          mt: "-5px",
          mx: {
            xs: "0px",
            md: "80px",
            textAlign: "left",
          },
        }}
      >
        <strong>Database:</strong> MySQL
      </Typography>
      <Typography
        variant="body2"
        paragraph
        sx={{
          mt: "-5px",
          mx: {
            xs: "0px",
            md: "80px",
            textAlign: "left",
          },
        }}
      >
        <strong>Authentication:</strong> Keycloak, OAuth
      </Typography>
      <Typography
        variant="body2"
        paragraph
        sx={{
          mt: "-5px",
          mx: {
            xs: "0px",
            md: "80px",
            textAlign: "left",
          },
        }}
      >
        <strong>Database Management:</strong> Flyway
      </Typography>
      <Typography
        variant="body2"
        paragraph
        sx={{
          mt: "-5px",
          mx: {
            xs: "0px",
            md: "80px",
            textAlign: "left",
          },
        }}
      >
        <strong>Version Control:</strong> Git
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 10, // Push the button to the bottom
          alignSelf: { xs: "center" },
          backgroundColor: "#3f51b5",
          color: "#ffc107",
          "&:hover": {
            backgroundColor: "#3f52c6",
          },
        }}
        onClick={handleBack}
      >
        BACK
      </Button>
    </Paper>
  );
};
