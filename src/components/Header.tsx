import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Menu } from "./Menu";
import { useState } from "react";
import "../App.css";

export const Header = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/register");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 0,
        mb: 2,
      }}
    >
      <AppBar
        position="static"
        sx={{
          borderRadius: "6px",
          height: {
            xs: "50px",
            sm: "70px",
            md: "80px",
            lg: "56px",
            xl: "60px",
          },
        }}
      >
        <Toolbar>
          <Menu />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "Permanent Marker, sans-serif",
              fontSize: {
                xs: "1.6rem",
                sm: "2rem",
                md: "3rem",
                lg: "2.5rem",
                xl: "3rem",
              },
              textAlign: "center",
              letterSpacing: "0.015em",
              paddingTop: "0px",
              paddingBottom: "10px",
            }}
          >
            MasterMind
          </Typography>
          <Button
            onClick={handleLogin}
            sx={{
              fontFamily: "teko, sans-serif",
              color: "#ffca28",
              fontSize: {
                xs: "1.55rem",
                sm: "1.5rem",
                md: "2.8rem",
                lg: "2rem",
                xl: "2.5rem",
              },
              paddingTop: "0px",
              paddingBottom: {
                xs: "0px",
                sm: "0px",
                md: "0px",
                lg: "3px",
                xl: "0px",
              },
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
