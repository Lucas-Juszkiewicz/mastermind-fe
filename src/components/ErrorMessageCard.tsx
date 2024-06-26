import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

interface ErrorMessageCardProps {
  error: AxiosError;
  openErrorCard: boolean;
}

export const ErrorMessageCard: React.FC<ErrorMessageCardProps> = ({
  error,
  openErrorCard,
}) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (openErrorCard && error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 409) {
            setErrorMessage(
              "Nick is already taken. Please choose a different nick."
            );
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
      open={openErrorCard && open}
      onClick={handleClose}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          //   image="../assets/error_img.png"
          image="../assets/logo.png"
          title="error_img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Error
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {errorMessage}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium" onClick={handleClose}>
            OK
          </Button>
        </CardActions>
      </Card>
    </Backdrop>
  );
};
