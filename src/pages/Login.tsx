import { Typography, Box, TextField, Button, Paper } from "@mui/material";
import React from "react";

export const Login = () => {
  return (
    <div>
      <form>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "auto", // Center the Paper with margin
            marginTop: "60px",
            px: "50px",
            pt: "25px",
            pb: "50px",
            maxWidth: "500px", // Set a maximum width for better readability
            backgroundColor: "#f3f4f6", // Light background color
            borderRadius: "6px", // Rounded corners
            border: "1px solid #ddd",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "2.5rem", md: "3rem" },
              lineHeight: 1.5,
            }}
          >
            Login
          </Typography>
          <TextField
            margin="normal"
            type={"text"}
            variant="outlined"
            placeholder="Nick"
            sx={{
              bgcolor: "#ffffff",
              width: "300px",
              "& .MuiOutlinedInput-root": {
                height: "50px",
              },
            }}
          />
          <TextField
            margin="normal"
            type={"email"}
            variant="outlined"
            placeholder="Email"
            sx={{
              bgcolor: "#ffffff",
              width: "300px",
              "& .MuiOutlinedInput-root": {
                height: "50px",
              },
            }}
          />
          <TextField
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder="Password"
            sx={{
              bgcolor: "#ffffff",
              width: "300px",
              "& .MuiOutlinedInput-root": {
                height: "50px",
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              fontSize: { xs: "1.8rem", sm: "2rem", md: "2.2rem" },
              lineHeight: 1.5,
              width: "125px",
              height: "50px",
              color: "#ffc107",
              fontFamily: "teko, sans-serif",
              paddingTop: 1.5,
              margin: 1,
              borderRadius: "6px",
            }}
          >
            OK
          </Button>
          <Button
            variant="contained"
            sx={{
              fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.8rem" },
              lineHeight: 1,
              width: "220px",
              height: "50px",
              color: "#3f51b5",
              backgroundColor: "#ffc107",
              fontFamily: "teko, sans-serif",
              paddingTop: 1.5,
              margin: 1,
              mb: 0,
              borderRadius: "6px",
              ":hover": { backgroundColor: "#f9a825" },
            }}
          >
            Click to Register
          </Button>
        </Paper>
      </form>
    </div>
  );
};
