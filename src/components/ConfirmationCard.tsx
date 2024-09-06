import {
  Backdrop,
  Slide,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import success_img from "../assets/success_img.png";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../UserAuthProvider";
import { useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import { ErrorMessageCard } from "./ErrorMessageCard";

interface ConfirmationCardProps {
  isConfirmationCardOpen: boolean;
  setIsConfirmationCardOpen: Function;
  setPostTrigger: Function;
  inputs: Inputs;
}

interface Inputs {
  country: string;
  email: string;
}

// interface UserAuth {
//   userId: string;
//   nick: string;
//   email: string;
//   country: string;
//   token: string;
//   refreshToken: string;
//   tokenExp: number;
// }

export const ConfirmationCard: React.FC<ConfirmationCardProps> = ({
  setIsConfirmationCardOpen,
  isConfirmationCardOpen,
  inputs,
}) => {
  const userAuthContext = useContext(UserAuthContext);
  if (!userAuthContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }
  const { userAuth, setUserAuth } = userAuthContext;

  const [error, setErrorMessage] = useState<AxiosError | null>(null);

  const [openErrorCard, setOpenErrorCard] = useState(false);
  const handleClose = () => {
    setOpenErrorCard(false);
  };
  const handleOpen = () => {
    setOpenErrorCard(true);
  };

  const sendSubmit = async () => {
    console.log("Confirmation CARD: " + JSON.stringify(userAuth));

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + userAuth.token,
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:8081/users/update/${userAuth.userId}`,
        inputs,
        config
      );
      console.log(response.data);
      const userId = response.data.id;
      navigate(`/user`);
      //   navigate("/editDetails");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error);
      }
      handleOpen();
    }
  };

  const navigate = useNavigate();
  return (
    <Backdrop
      aria-hidden="false"
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isConfirmationCardOpen}
      // onClick={handleClose}
    >
      <Slide
        timeout={{ appear: 500, enter: 300, exit: 500 }}
        direction="up"
        in={isConfirmationCardOpen}
        mountOnEnter
        unmountOnExit
      >
        <Card sx={{ maxWidth: 500, borderRadius: "6px", position: "relative" }}>
          <CardMedia
            sx={{ height: 170, position: "relative" }}
            image={success_img}
            title="error_img"
          >
            <Typography
              variant="h5"
              align="center"
              sx={{
                fontFamily: "Permanent Marker, sans-serif",
                color: "#ffcc80",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(circle, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1))",
                // padding: "30px",
                px: "60px",
                py: "20px",
                borderRadius: "6px",
                fontSize: { xs: "1.8rem", sm: "1.8rem", md: "2.3rem" },
                lineHeight: 1.2,
                // whiteSpace: "nowrap",
                letterSpacing: "0.15em",
              }}
            >
              Pleace Confirm
            </Typography>
          </CardMedia>
          <CardContent>
            <Typography variant="body2" align="center" paddingTop={1} mb={2}>
              You will change the following fields...
            </Typography>

            {inputs.country ? (
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  <strong>Country:</strong>
                </Typography>
                <Typography variant="body2">
                  {userAuth.country} to {inputs.country}
                </Typography>
              </Box>
            ) : null}
            {inputs.email ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection:
                    userAuth.email.length || inputs.email.length > 21
                      ? "column"
                      : "row",
                  // alignItems:
                  //   userAuth.email.length || inputs.email.length > 21
                  //     ? "flex-start"
                  //     : "center",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ mr: 1, alignSelf: "flex-start" }}
                >
                  <strong>Email:</strong>
                </Typography>
                <Typography variant="body2">
                  {userAuth.email}
                  {userAuth.email.length || inputs.email.length > 21 ? (
                    <Box component="span" sx={{ my: 0.5 }}>
                      <br />
                      to
                      <br />
                    </Box>
                  ) : (
                    " to "
                  )}
                  {inputs.email}
                </Typography>
              </Box>
            ) : null}
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              size="medium"
              onClick={() => {
                sendSubmit();
                setIsConfirmationCardOpen(false);
                localStorage.removeItem("userData");
                // navigate("/user");
                // navigate("/editDetails");
              }}
              sx={{
                fontSize: { xs: "1.8rem", sm: "2rem", md: "2.2rem" },
                lineHeight: 1.5,
                width: "110px",
                height: "40px",
                color: "#ffc107",
                fontFamily: "teko, sans-serif",
                paddingTop: 1.5,
                margin: 1,
                borderRadius: "6px",
              }}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                setIsConfirmationCardOpen(false);
                localStorage.removeItem("userData");
                navigate("/editDetails");
              }}
              sx={{
                fontSize: { xs: "1.8rem", sm: "2rem", md: "2.2rem" },
                lineHeight: 1.5,
                width: "110px",
                height: "40px",
                color: "#3f51b5",
                backgroundColor: "#ffc107",
                fontFamily: "teko, sans-serif",
                paddingTop: 1.5,
                margin: 1,
                borderRadius: "6px",
              }}
            >
              BACK
            </Button>
          </CardActions>
          {openErrorCard && (
            <ErrorMessageCard
              error={error}
              openErrorCard={openErrorCard}
              handleClose={handleClose}
            />
          )}
        </Card>
      </Slide>
    </Backdrop>
  );
};
