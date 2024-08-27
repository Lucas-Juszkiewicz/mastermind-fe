import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthMethods } from "../AuthMethodsProvider";
import { UserAuthContext } from "../UserAuthProvider";
import { useContext } from "react";

export const ContinueButton = () => {
  const navigate = useNavigate();
  const {
    redirectToKeycloak,
    getToken,
    refreshAccessToken,
    isTokenValid,
    checkTokenValidity,
    startCheckingIsTokenValid,
    logOut,
  } = useAuthMethods();

  const userAuthContext = useContext(UserAuthContext);
  if (!userAuthContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }
  const {
    userAuth,
    setUserAuth,
    fetchGameInProgressAfterRecall,
    checkIfGameInProgresExists,
  } = userAuthContext;

  const handleOnClick = () => {
    navigate("/preStarter");
    checkTokenValidity(userAuth.tokenExp);
    if (!isTokenValid(userAuth.tokenExp)) {
      logOut();
      navigate("/preStarter");
      navigate("/home");
    } else {
      console.log("Valid w chuj");
      navigate("/preStarter");
    }
  };

  return (
    <div>
      <Button
        onClick={handleOnClick}
        variant="contained"
        sx={{
          left: 5,
          padding: {
            xs: "1px",
            sm: "1px",
            md: "1px",
            lg: "1px",
            xl: "1px",
          },
          height: {
            xs: 33,
            sm: 45,
            md: 50,
            lg: 45,
            xl: 50,
          },
          width: {
            xs: 70,
            sm: 93,
            md: 102,
            lg: 100,
            xl: 90,
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: 18,
              sm: 24,
              md: 24,
              lg: 26,
              xl: 24,
            },
            height: {
              xs: 40,
              sm: 45,
              md: 50,
              lg: 45,
              xl: 50,
            },
            width: {
              xs: 70,
              sm: 93,
              md: 102,
              lg: 100,
              xl: 90,
            },
            color: "#ffc107",
            pt: {
              xs: 2.5,
              sm: 2.5,
              md: 2.5,
              lg: 1.7,
              xl: 1.7,
            },
            margin: 0,
            textAlign: "center",
          }}
        >
          NEW GAME
        </Typography>
      </Button>
    </div>
  );
};
