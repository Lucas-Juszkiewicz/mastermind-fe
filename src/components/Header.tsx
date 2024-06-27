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
    navigate("/login");
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
              fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" },
              textAlign: "center",
              letterSpacing: "0.015em",
            }}
          >
            MasterMind
          </Typography>
          <Button
            onClick={handleLogin}
            sx={{
              fontFamily: "teko, sans-serif",
              color: "#ffca28",
              fontSize: { xs: "1.3rem", sm: "1.5rem", md: "2rem" },
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
