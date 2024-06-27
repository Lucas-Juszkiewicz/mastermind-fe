import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { AvatarImg, LinearDeterminate } from "../components";
import Box from "@mui/material/Box";
import avatar from "../assets/0_9.png";
import Typography from "@mui/material/Typography";

interface UserData {
  id: number;
  nick: string;
  email: string;
  country?: string; // Optional field
  password: string;
  games?: number; // Optional field
  total?: number; // Optional field
  img?: ArrayBuffer | null; // Optional field for byte array (blob), can be null or ArrayBuffer
  avatar: number;
  registrationDate: string; // Assuming registrationDate is formatted as string in ISO format
}

export const UserDetail = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/get/${userId}`
        );
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // setErrorMessage(error);
        }
        // handleOpen();
      }
    };
    fetchUserData();
  }, [userId]);

  if (!userData) {
    return <LinearDeterminate />; // Render loading state until userData is fetched
  }

  return (
    <Paper
      elevation={3}
      sx={{
        margin: "auto", // Center the Paper with margin
        marginTop: {
          xs: "20px", // marginTop for extra-small screens
          sm: "50px", // marginTop for small screens and above
        },
        marginBottom: {
          xs: "20px", // marginTop for extra-small screens
          sm: "20px", // marginTop for small screens and above
        },
        p: "56px",
        maxWidth: "700px", // Set a maximum width for better readability
        backgroundColor: "#f3f4f6", // Light background color
        borderRadius: "6px", // Rounded corners
        border: "1px solid #ddd",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
          height: {
            xs: "67vh", // height for extra-small screens
            sm: "75vh", // height for small screens
            md: "70vh", // height for medium screens
            lg: "65vh", // height for large screens
            xl: "75vh", // height for extra-large screens
          },
        }}
      >
        <AvatarImg avatar={avatar} />
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontFamily: "Permanent Marker, sans-serif",
            color: "#3f51b5",
            ml: {
              xs: "100px",
              sm: "60px",
              md: "25px",
              lg: "50px",
              xl: "50px",
            },
            mt: {
              xs: "-120px",
              sm: "-170px",
              md: "-200px",
              lg: "-170px",
              xl: "-170px",
            },
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "3.5rem" },
            lineHeight: 1.2,
            letterSpacing: "0.05em",
          }}
        >
          {userData.nick}
          {/* Lucky Luke */}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: "15px",
            ml: {
              xs: "100px",
              sm: "230px",
              md: "240px",
              lg: "250px",
              xl: "260px",
            },
          }}
        >
          Total points: 750{userData.total}
        </Typography>
      </Box>
    </Paper>
  );
};
