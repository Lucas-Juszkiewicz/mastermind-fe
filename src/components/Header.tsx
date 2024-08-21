import { Link, NavLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Menu } from "./Menu";
import "../App.css";
import { useContext, useEffect, useState } from "react";
import { UserAuthContext } from "../UserAuthProvider";
import { useKeycloak } from "@react-keycloak/web";

export const Header = () => {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();

  const handleLogin = () => {
    if (signInButtonText == " Sign in") {
      navigate("/register");
    } else {
      navigate("/home");
      setUserAuth({
        id: "",
        nick: "",
        email: "",
        token: "",
        refreshToken: "",
        tokenExp: -1,
      });
      localStorage.clear();
      keycloak.logout({
        redirectUri: "http://localhost:3000/home",
      });
    }
  };

  const userAuthContext = useContext(UserAuthContext);
  if (!userAuthContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }
  const { userAuth, setUserAuth } = userAuthContext;

  const [signInButtonText, setSignInButtonText] = useState("Sign in");

  useEffect(() => {
    if (userAuth.token !== "") {
      setSignInButtonText("Sign out");
    } else {
      setSignInButtonText(" Sign in");
    }
  }, [userAuth]);

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
                xs: "1.45rem",
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
            {signInButtonText}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
