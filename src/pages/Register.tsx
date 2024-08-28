import { Typography, Box, TextField, Button, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { HowToRegOutlined, LoginOutlined } from "@mui/icons-material";
import axios, { AxiosError } from "axios";
import { ErrorMessageCard } from "../components";
import { useNavigate } from "react-router-dom";
import { useAuthMethods } from "../AuthMethodsProvider";

export const Register = () => {
  const [error, setErrorMessage] = useState<AxiosError | null>(null);
  const {
    redirectToKeycloak,
    getToken,
    refreshAccessToken,
    isTokenValid,
    checkTokenValidity,
    startCheckingIsTokenValid,
  } = useAuthMethods();
  const [openErrorCard, setOpenErrorCard] = React.useState(false);
  const handleClose = () => {
    setOpenErrorCard(false);
  };
  const handleOpen = () => {
    setOpenErrorCard(true);
  };

  const [inputs, setInputs] = useState({
    nick: "",
    email: "",
    password: "",
    userId: null,
  });
  const navigate = useNavigate();

  const handleOnChange = (e: any) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/users/save",
        inputs,
        config
      );
      console.log(response.data);
      const userId = response.data.userId;
      redirectToKeycloak();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error);
      }
      handleOpen();
    }
  };

  useEffect(() => {
    setInputs({ nick: "", email: "", password: "", userId: null });
  }, []);

  const goToLogin = () => {
    redirectToKeycloak();
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
            Registration
          </Typography>

          <TextField
            inputProps={{
              style: {
                paddingTop: 7,
                paddingBottom: 7,
              },
            }}
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
          <TextField
            inputProps={{
              style: {
                paddingTop: 7,
                paddingBottom: 7,
              },
            }}
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
            inputProps={{
              style: {
                paddingTop: 7,
                paddingBottom: 7,
              },
            }}
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
            value={inputs.userId}
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
            endIcon={<LoginOutlined style={{ fontSize: 28 }} />}
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
            onClick={goToLogin}
          >
            Click to Login
          </Button>
        </Paper>
      </form>
      {openErrorCard && (
        <ErrorMessageCard
          error={error}
          openErrorCard={openErrorCard}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};
