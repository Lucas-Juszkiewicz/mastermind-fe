import { Paper, Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Rules = () => {
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
        Rules of the game
      </Typography>
      <Typography
        variant="body2"
        paragraph
        sx={{
          fontSize: "22px",
          mt: "50px",
          mx: {
            xs: "0px",
            md: "80px",
          },
        }}
      >
        <strong>Objective:</strong>
        <br />
        Your goal is to break an 8-digit code.
        <br />
        The code is made up of numbers from 1 to 10, and digits can repeat.
      </Typography>
      <Typography
        variant="body2"
        paragraph
        sx={{
          fontSize: "22px",
          mt: "-5px",
          mx: {
            xs: "0px",
            md: "80px",
            textAlign: "left",
          },
        }}
      >
        <strong>Gameplay:</strong>
        <br />
        You have 12 attempts to guess the correct code.
        <br />
        After each attempt, you'll receive feedback to help you refine your
        guesses.
      </Typography>
      <Typography
        variant="body2"
        paragraph
        sx={{
          fontSize: "22px",
          mt: "-5px",
          mx: {
            xs: "0px",
            md: "80px",
            textAlign: "left",
          },
        }}
      >
        <strong>Feedback Clues:</strong>
        <br />
        Green Dot: <br /> A green dot indicates that one of the numbers you
        guessed is both correct and in the correct position.
        <br />
        Yellow Dot: <br /> A yellow dot means one of the numbers you guessed is
        correct, but it’s in the wrong position.
      </Typography>
      <Typography
        variant="body2"
        paragraph
        sx={{
          fontSize: "22px",
          mt: "-5px",
          mx: {
            xs: "0px",
            md: "80px",
          },
          textAlign: "left",
          width: {
            xs: "100%",
            md: "80%",
          },
        }}
      >
        <strong>Time Limit:</strong>
        <br />
        {"You have 20 minutes to solve the code."}
      </Typography>
      <Typography
        variant="body2"
        paragraph
        sx={{
          fontSize: "22px",
          mt: "-5px",
          mx: {
            xs: "0px",
            md: "80px",
          },
          textAlign: "left",
        }}
      >
        <strong>Game Attempts and Average:</strong>
        <br />
        Every game you start, whether you finish it or not, will count toward
        calculating your average performance. Even if you decide to restart a
        game mid-way, the previous game still counts in your statistics.
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
