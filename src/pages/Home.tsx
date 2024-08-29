import { Box, Button, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useAuthMethods } from "../AuthMethodsProvider";
import { UserAuthContext } from "../UserAuthProvider";
import axios from "axios";
import { GoodbyeCard } from "../components/GoodbyeCard";
import { useTheme } from "@mui/material/styles";
import { HowToRegOutlined, LoginOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AutomaticLogoutCard } from "../components/AutomaticLogoutCard";

export const Home = () => {
  const {
    redirectToKeycloak,
    getToken,
    refreshAccessToken,
    isTokenValid,
    checkTokenValidity,
    startCheckingIsTokenValid,
    isGoodbyCardOpen,
    setIsGoodbyCardOpen,
    isAutomaticLogoutCardOpen,
    setIsAutomaticLogoutCardOpen,
    // getUserIdIfNotIncludedIInToken,
    nick,
  } = useAuthMethods();
  const theme = useTheme();
  const [authCode, setAuthCode] = useState<string>("");
  const userAuthContext = useContext(UserAuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  if (!userAuthContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }
  const {
    userAuth,
    setUserAuth,
    fetchGameInProgressAfterRecall,
    checkIfGameInProgresExists,
    checkUser,
  } = userAuthContext;

  const [tokenHere, setTokenHere] = useState("");

  useEffect(() => {
    const fetchTokenAndCheckUser = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get("code");
      const error = urlParams.get("error");
      const errorDescription = urlParams.get("error_description");

      if (error) {
        console.log("Error: " + error + ", Description: " + errorDescription);
        return;
      }

      if (authCode) {
        setAuthCode(authCode);

        try {
          const token = await getToken(authCode);

          setTokenHere(token);
          // Now that you have the token, proceed to check the user
        } catch (tokenError) {
          console.error("Error retrieving token:", tokenError);
        }
      }
    };
    fetchTokenAndCheckUser();
    // getUserIdIfNotIncludedIInToken(userAuth.nick);
  }, []);

  useEffect(() => {
    if (tokenHere != "") {
      checkUser(tokenHere);
    }
  }, [tokenHere]);

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
      <GoodbyeCard
        isGoodbyeCardOpen={isGoodbyCardOpen}
        setIsGoodbyeCardOpen={setIsGoodbyCardOpen}
        nick={nick}
      />
      <AutomaticLogoutCard
        isAutomaticLogoutCardOpen={isAutomaticLogoutCardOpen}
        setIsAutomaticLogoutCardOpen={setIsAutomaticLogoutCardOpen}
        nick={nick}
      />

      <Box
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
      </Box>
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
      <Typography
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
      </Typography>
      <Button
        endIcon={<HowToRegOutlined style={{ fontSize: 28 }} />}
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
          mb: -1,
          mt: 2,
          borderRadius: "6px",
          ":hover": { backgroundColor: "#f9a825" },
        }}
        onClick={handleClick}
      >
        Click to Register
      </Button>
    </Paper>
  );
};
