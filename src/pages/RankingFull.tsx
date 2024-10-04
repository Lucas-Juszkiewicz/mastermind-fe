import { Paper, Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const RankingFull = () => {
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
        gutterBottom
        sx={{
          textAlign: "center",
          mt: "30px",
          mb: "20px",
          mx: {
            xs: "0px",
            md: "40px",
          },
        }}
      >
        Welcome to Mastermind!
      </Typography>
      {/* <Typography
        variant="body2"
        paragraph
        sx={{
          my: "-10px",
          mx: {
            xs: "0px",
            md: "80px",
          },
        }}
      >
        To get started, simply register with a username - no need to provide a
        real email address.
      </Typography>
      <Typography
        variant="body2"
        paragraph
        sx={{
          my: "10px",
          mx: {
            xs: "0px",
            md: "80px",
          },
        }}
      >
        If you're new to Mastermind or need a quick refresher, don't worry! You
        can check out the rules.
      </Typography> */}
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
