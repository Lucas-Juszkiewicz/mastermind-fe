import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import errorImg from "../assets/error_img.jpg";

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
      onClick={handleClose}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 170 }} image={errorImg} title="error_img" />
        <CardContent>
          <Typography variant="body2" align="center" paddingTop={2.5}>
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
    </Backdrop>
  );
};
