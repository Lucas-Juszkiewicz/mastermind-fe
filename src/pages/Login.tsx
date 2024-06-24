import { Typography, Box, TextField, Button, Paper } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import React, { useState } from "react";
import { HowToRegOutlined, LoginOutlined } from "@mui/icons-material";
import axios from "axios";

export const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    nick: "",
    email: "",
    password: "",
    id: null,
  });

  const handleOnChange = (e: any) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        isSignup
          ? "http://localhost:8080/users/save"
          : "http://localhost:8080/users/login",
        inputs
      );
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const resetState = () => {
    setIsSignup(!isSignup);
    setInputs({ nick: "", email: "", password: "", id: null });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
            {isSignup ? "Registration" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              onChange={handleOnChange}
              name="nick"
              value={inputs.nick}
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
          )}
          <TextField
            onChange={handleOnChange}
            name="email"
            value={inputs.email}
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
            onChange={handleOnChange}
            name="password"
            value={inputs.password}
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
          <TextField
            style={{ display: "none" }}
            onChange={handleOnChange}
            name="id"
            value={inputs.id}
          ></TextField>
          <Button
            type="submit"
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
            endIcon={
              isSignup ? (
                <LoginOutlined style={{ fontSize: 28 }} />
              ) : (
                <HowToRegOutlined style={{ fontSize: 28 }} />
              )
            }
            variant="contained"
            sx={{
              fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.8rem" },
              lineHeight: 1,
              width: "250px",
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
            onClick={resetState}
          >
            {isSignup ? "Click to Login " : "Click to Register"}
          </Button>
        </Paper>
      </form>
    </div>
  );
};
