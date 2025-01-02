import { Paper, Typography, TextField, Box, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmationCard, ErrorMessageCard } from "../components";
import axios, { AxiosError } from "axios";
import { useAuthMethods } from "../AuthMethodsProvider";
import { UserAuthContext } from "../UserAuthProvider";
import { AutomaticLogoutCard } from "../components/AutomaticLogoutCard";
import { OkMessageCard } from "../components/OkMessageCard";

export const ChangePassword = () => {
  const [inputs, setInputs] = useState({
    passOld: "",
    passOne: "",
    passTwo: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e: any) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const resetState = () => {
    setInputs({ passOne: "", passTwo: "", passOld: "" });
    navigate("/user");
  };

  const userAuthContext = useContext(UserAuthContext);
  if (!userAuthContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }
  const { userAuth, setUserAuth } = userAuthContext;
  const { redirectToKeycloak, logOut } = useAuthMethods();

  const [error, setErrorMessage] = useState<AxiosError | null>(null);

  const [openErrorCard, setOpenErrorCard] = useState(false);
  const handleClose = () => {
    setOpenErrorCard(false);
  };
  const handleOpen = () => {
    setOpenErrorCard(true);
  };

  const [openOkCard, setOpenOkCard] = useState(false);
  const [okMessage, setOkMessage] = useState<string | null>(null);
  const handleCloseOKCard = () => {
    setOpenOkCard(false);
    navigate("/user");
  };

  const [isAutomaticLogoutCardOpen, setIsAutomaticLogoutCardOpen] =
    useState(false);
  // const handleCloseALC = () => {
  //   setIsAutomaticLogoutCardOpen(false);
  // };
  const handleOpenALC = () => {
    setIsAutomaticLogoutCardOpen(true);
  };

  const [checkOldPass, setCheckOldPass] = useState<boolean>(false);

  useEffect(() => {
    const checkTypeOfLogin = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + userAuth.token,
        },
      };

      try {
        const response = await axios.post(
          `http://localhost:8081/users/typeOfLoginCheck`,
          inputs,
          config
        );
        console.log(response.data);
        const typeOfLogin = response.data;
        if (typeOfLogin === "privateLogin") {
          setCheckOldPass(true);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error);
          if (error.response && error.response.status === 401) {
            handleOpenALC();
            logOut(true);
            setTimeout(() => {
              redirectToKeycloak();
            }, 7000);
          } else {
            handleOpen();
          }
        }
      }
    };

    checkTypeOfLogin();
  }, []);

  const sendSubmit = async (e: any) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + userAuth.token,
      },
    };

    try {
      const response = await axios.post(
        `http://localhost:8081/users/passUpdate`,
        inputs,
        config
      );
      if (response.status === 200) {
        setOkMessage(response.data);
        setOpenOkCard(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error);
        if (error.response && error.response.status === 401) {
          handleOpenALC();
          logOut(true);
          setTimeout(() => {
            redirectToKeycloak();
          }, 7000);
        } else {
          handleOpen();
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={sendSubmit}>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "auto", // Center the Paper with margin
            marginTop: "20px",
            px: "50px",
            pt: "25px",
            pb: "25px",
            maxWidth: "500px", // Set a maximum width for better readability
            backgroundColor: "#f3f4f6", // Light background color
            borderRadius: "6px", // Rounded corners
            border: "1px solid #ddd",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.7rem", sm: "2.7rem", md: "3rem" },
              lineHeight: 1.5,
            }}
          >
            CHANGE PASSWORD
          </Typography>
          {checkOldPass ? (
            <TextField
              inputProps={{
                style: {
                  paddingTop: 7,
                  paddingBottom: 7,
                },
              }}
              onChange={handleOnChange}
              name="passOld"
              value={inputs.passOld}
              margin="normal"
              type={"password"}
              variant="outlined"
              placeholder="Recent password"
              sx={{
                bgcolor: "#ffffff",
                width: "300px",
                "& .MuiOutlinedInput-root": {
                  height: "50px",
                },
              }}
            />
          ) : null}
          <TextField
            inputProps={{
              style: {
                paddingTop: 7,
                paddingBottom: 7,
              },
            }}
            onChange={handleOnChange}
            name="passOne"
            value={inputs.passOne}
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder="New password"
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
            name="passTwo"
            value={inputs.passTwo}
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder="Confirm new password"
            sx={{
              bgcolor: "#ffffff",
              width: "300px",
              "& .MuiOutlinedInput-root": {
                height: "50px",
              },
            }}
          />
          <Box
            sx={{
              display: "flex", // Ensure buttons are aligned horizontally
              justifyContent: "center", // Center buttons within the container
              gap: 1, // Add some space between the buttons
              mt: 2, // Add some margin on top of the buttons for spacing
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                fontSize: { xs: "1.8rem", sm: "2rem", md: "2.2rem" },
                lineHeight: 1.5,
                width: "125px",
                height: "45px",
                color: "#ffc107",
                fontFamily: "teko, sans-serif",
                paddingTop: 1.5,
                borderRadius: "6px",
              }}
            >
              OK
            </Button>
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: "1.8rem", sm: "1.6rem", md: "1.8rem" },
                lineHeight: 1.5,
                width: "125px",
                height: "45px",
                color: "#3f51b5",
                backgroundColor: "#ffc107",
                fontFamily: "teko, sans-serif",
                paddingTop: 1.5,
                borderRadius: "6px",
                ":hover": { backgroundColor: "#f9a825" },
              }}
              onClick={resetState}
            >
              back
            </Button>
          </Box>
          {openOkCard && (
            <OkMessageCard
              openOkCard={openOkCard}
              handleClose={handleCloseOKCard}
              okMessage={okMessage}
            />
          )}
          {openErrorCard && (
            <ErrorMessageCard
              error={error}
              openErrorCard={openErrorCard}
              handleClose={handleClose}
            />
          )}
          {isAutomaticLogoutCardOpen && (
            <AutomaticLogoutCard
              isAutomaticLogoutCardOpen={isAutomaticLogoutCardOpen}
              setIsAutomaticLogoutCardOpen={setIsAutomaticLogoutCardOpen}
              nick={userAuth.nick}
            />
          )}
        </Paper>
      </form>
    </div>
  );
};
