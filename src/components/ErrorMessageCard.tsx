import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import errorImg from "../assets/error_img.png";
import Fade from "@mui/material/Fade";
import { Slide } from "@mui/material";

interface ErrorMessageCardProps {
  error: any;
  openErrorCard: boolean;
  handleClose: any;
}

export const ErrorMessageCard: React.FC<ErrorMessageCardProps> = ({
  error,
  openErrorCard,
  handleClose,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (openErrorCard && error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 409) {
            const errorData = error.response.data as string;
            if (errorData.startsWith("NICK_DUPLICATION")) {
              setErrorMessage(
                "Nick is already taken. Please choose a different nick."
              );
            } else if (errorData.startsWith("EMAIL_DUPLICATION")) {
              setErrorMessage(
                "Email is already registered. Please use a different email."
              );
            }
          } else {
            setErrorMessage(`An unexpected error occurred: ${error.message}`);
          }
        }
      }
    }
  }, [openErrorCard, error]);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openErrorCard}
      // onClick={handleClose}
    >
      <Slide
        timeout={{ appear: 500, enter: 300, exit: 500 }}
        direction="up"
        in={openErrorCard}
        mountOnEnter
        unmountOnExit
      >
        <Card sx={{ maxWidth: 345, borderRadius: "6px", position: "relative" }}>
          <CardMedia
            sx={{ height: 170, position: "relative" }}
            image={errorImg}
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
                whiteSpace: "nowrap",
                letterSpacing: "0.15em",
              }}
            >
              ERROR
            </Typography>
          </CardMedia>
          <CardContent>
            <Typography variant="body1" align="center" paddingTop={2.5}>
              {errorMessage}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="medium"
              onClick={handleClose}
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
              OK
            </Button>
          </CardActions>
        </Card>
      </Slide>
    </Backdrop>
  );
};
