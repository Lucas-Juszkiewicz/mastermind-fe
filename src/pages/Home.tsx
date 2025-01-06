import { Button, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useAuthMethods } from "../AuthMethodsProvider";
import { UserAuthContext } from "../UserAuthProvider";
import { GoodbyeCard } from "../components/GoodbyeCard";
import { HowToRegOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { AutomaticLogoutCard } from "../components/AutomaticLogoutCard";

export const Home = () => {
  const {
    getToken,
    isGoodbyCardOpen,
    setIsGoodbyCardOpen,
    isAutomaticLogoutCardOpen,
    setIsAutomaticLogoutCardOpen,
    nick,
  } = useAuthMethods();
  const [authCode, setAuthCode] = useState<string>("");
  const userAuthContext = useContext(UserAuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  if (!userAuthContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }

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
        } catch (tokenError) {
          console.error("Error retrieving token:", tokenError);
        }
      }
    };
    fetchTokenAndCheckUser();
  }, []);

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
          mt: "-5px",
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
          mt: "-5px",
          mx: {
            xs: "0px",
            md: "80px",
          },
        }}
      >
        If you're new to Mastermind or need a quick refresher, don't worry! You
        can check out the{" "}
        <Link onClick={handleClick} to={"/rules"} className="hover-link">
          rules
        </Link>
        .
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
          mt: 4,
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
