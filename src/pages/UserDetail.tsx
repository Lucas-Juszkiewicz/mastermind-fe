import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { AvatarImg, LinearDeterminate } from "../components";
import Box from "@mui/material/Box";
import avatar from "../assets/0_4.png";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { UserAuthContext } from "../UserAuthProvider";

interface UserData {
  id: number;
  nick: string;
  email: string;
  country?: string; // Optional field
  games?: number; // Optional field
  total?: number; // Optional field
  img?: ArrayBuffer | null; // Optional field for byte array (blob), can be null or ArrayBuffer
  avatar: number;
  registrationDate: string; // Assuming registrationDate is formatted as string in ISO format
}

export const UserDetail = () => {
  // const { userId } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const userAuthContext = useContext(UserAuthContext);
  if (!userAuthContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }
  const { userAuth } = userAuthContext;

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      authorization: "Bearer " + userAuth.token,
    },
  };

  useEffect(() => {
    const fetchUserData = async () => {
      console.log(userAuth);
      try {
        const response = await axios.get(
          `http://localhost:8081/users/get/${userAuth.userId}`,
          config
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
  }, []);

  if (!userData) {
    return <LinearDeterminate />; // Render loading state until userData is fetched
  }

  const isLongText = userData.nick.split(" ")[0].length > 8;
  const fontSize = isLongText
    ? { xs: "1.5rem", sm: "2.8rem", md: "2.8rem" }
    : { xs: "2.5rem", sm: "3.5rem", md: "3.5rem" };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd.MM.yyy HH:mm"); // Adjust the format as needed
  };

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
          xs: "20px", // marginBottom for extra-small screens
          sm: "20px", // marginBottom for small screens and above
        },
        p: { xs: "20px", sm: "20px", md: "56px" },
        maxWidth: "800px", // Set a maximum width for better readability
        backgroundColor: "#f3f4f6", // Light background color
        borderRadius: "6px", // Rounded corners
        border: "1px solid #ddd",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          height: {
            xs: "67vh", // height for extra-small screens
            sm: "75vh", // height for small screens
            md: "70vh", // height for medium screens
            lg: "65vh", // height for large screens
            xl: "75vh", // height for extra-large screens
          },
        }}
      >
        {/* Avatar column */}
        <AvatarImg avatar={avatar} />

        {/* User data column */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            ml: 4, // Margin left to create space between avatar and user data
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{
              fontFamily: "Permanent Marker, sans-serif",
              color: "#3f51b5",
              fontSize: fontSize,
              lineHeight: 1.2,
              letterSpacing: "0.05em",
              mb: 5, // Margin bottom to create space between nickname and next text
              marginTop: {
                xs: "20px",
                sm: "20px",
                md: "-150px",
                lg: "-330px",
                xl: "-580px",
              },
            }}
          >
            {userData.nick}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              <strong>Total points:</strong>
            </Typography>
            <Typography variant="body2">{userData.total || 750}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              <strong>Country:</strong>
            </Typography>
            <Typography variant="body2">{userData.country}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              <strong>Email:</strong>
            </Typography>
            <Typography variant="body2">{userData.email}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              <strong>Registration:</strong>
            </Typography>
            <Typography variant="body2">
              {formatDate(userData.registrationDate)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserDetail;
