import { Typography, Box, TextField, Button, Paper } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import React, { useContext, useEffect, useState } from "react";
import { HowToRegOutlined, LoginOutlined } from "@mui/icons-material";
import axios, { AxiosError } from "axios";
import { ErrorMessageCard, ConfirmationCard } from "../components";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../UserAuthProvider";

export const EditDetails = () => {
  const [isConfirmationCardOpen, setIsConfirmationCardOpen] =
    useState<boolean>(false);
  const [postTrigger, setPostTrigger] = useState<boolean>(false);

  const [inputs, setInputs] = useState({
    country: "",
    email: "",
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
    setIsConfirmationCardOpen(true);
  };

  useEffect(() => {
    if (postTrigger) {
      handleSubmit({ preventDefault: () => {} } as any);
    }
  }, [postTrigger]);

  const resetState = () => {
    setInputs({ country: "", email: "" });
    navigate("/user");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          <ConfirmationCard
            isConfirmationCardOpen={isConfirmationCardOpen}
            setIsConfirmationCardOpen={setIsConfirmationCardOpen}
            setPostTrigger={setPostTrigger}
            inputs={inputs}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.7rem", sm: "2.7rem", md: "3rem" },
              lineHeight: 1.5,
            }}
          >
            Edit Details
          </Typography>
          <TextField
            inputProps={{
              style: {
                paddingTop: 7,
                paddingBottom: 7,
              },
            }}
            onChange={handleOnChange}
            name="country"
            value={inputs.country}
            margin="normal"
            type={"text"}
            variant="outlined"
            placeholder="Country"
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
            name="email"
            value={inputs.email}
            margin="normal"
            type={"email"}
            variant="outlined"
            placeholder="Email"
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
          <Button
            variant="contained"
            sx={{
              fontSize: { xs: "1.8rem", sm: "2rem", md: "2rem" },
              lineHeight: 1.5,
              width: "250px",
              height: "50px",
              color: "#ffc107",
              fontFamily: "teko, sans-serif",
              paddingTop: 1.5,
              mt: 18,
              borderRadius: "6px",
            }}
            onClick={() => navigate("/changeAvatar")}
          >
            change avatar
          </Button>
          <Button
            variant="contained"
            sx={{
              fontSize: { xs: "1.8rem", sm: "2rem", md: "2rem" },
              lineHeight: 1.5,
              width: "250px",
              height: "50px",
              color: "#ffc107",
              fontFamily: "teko, sans-serif",
              paddingTop: 1.5,
              mt: 2,
              borderRadius: "6px",
              whiteSpace: "nowrap",
            }}
            onClick={() => navigate("/changePassword")}
          >
            change password
          </Button>
        </Paper>
      </form>
    </div>
  );
};
