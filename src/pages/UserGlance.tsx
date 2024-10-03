import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { AvatarImg, LinearDeterminate } from "../components";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { UserAuthContext } from "../UserAuthProvider";
import Button from "@mui/material/Button";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useNavigate } from "react-router-dom";
import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";

interface UserData {
  id: number;
  nick: string;
  email: string;
  country?: string;
  games?: number;
  total?: number;
  imgAsString?: String | null;
  avatar: number | null;
  registrationDate: string;
  numberOfGames: number;
}

interface UserAuth {
  userId: string;
  nick: string;
  email: string;
  country: string;
  token: string;
  refreshToken: string;
  tokenExp: number;
}

export const UserDetail = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const userAuthContext = useContext(UserAuthContext);
  if (!userAuthContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }
  const { userAuth, setUserAuth } = userAuthContext;

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Update screen width on window resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      authorization: "Bearer " + userAuth.token,
    },
  };

  const [avatar, setAvatar] = useState<String | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/users/get/${userAuth.userId}`,
          config
        );
        setUserData(response.data);
        setUserAuth({
          userId: response.data.id,
          nick: response.data.nick,
          email: response.data.email,
          country: response.data.country || "",
          token: userAuth.token,
          refreshToken: userAuth.refreshToken,
          tokenExp: userAuth.tokenExp,
        });

        if (response.data.imgAsString) {
          // Get the Base64 image string from the response
          const imageUrl = `data:image/jpeg;base64,${response.data.imgAsString}`;

          setAvatar(imageUrl);
        }
        console.log(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // handle error
        }
      }
    };
    fetchUserData();
  }, []);

  if (!userData) {
    return <LinearDeterminate />;
  }

  const isLongText = userData.nick.split(" ")[0].length > 8;
  const fontSize = isLongText
    ? { xs: "1.5rem", sm: "2.8rem", md: "2.8rem" }
    : { xs: "2.5rem", sm: "3.5rem", md: "3.5rem" };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd.MM.yyy");
  };

  let average;
  if (userData.numberOfGames != null && userData.total != undefined) {
    average = userData.total / userData.numberOfGames;
    average.toFixed();
  } else {
    average = 0;
  }

  const handleEditDetails = () => {
    localStorage.setItem("userData", JSON.stringify(userData));
    navigate("/editDetails");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        margin: "auto",
        marginTop: { xs: "20px", sm: "30px" },
        marginBottom: { xs: "20px", sm: "20px" },
        p: { xs: "20px", sm: "20px", md: "40px" },
        maxWidth: "800px",
        backgroundColor: "#f3f4f6",
        borderRadius: "6px",
        border: "1px solid #ddd",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          minHeight: {
            xs: "750px", // Minimum height for extra-small screens
            sm: "450px", // Minimum height for small screens
          },
          height: {
            xs: "auto", // Allow height to adjust automatically on small screens
            sm: "auto",
            md: "auto",
            lg: "auto",
            xl: "auto",
          },
        }}
      >
        {/* Avatar Column */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: { xs: "20px", md: "0px" }, // Space between avatar and user data on small screens
          }}
        >
          {avatar ? (
            <AvatarImg avatar={avatar} />
          ) : (
            <AccountBoxTwoToneIcon
              sx={{ fontSize: 200, mb: screenWidth > 899 ? 50 : 2 }}
            />
          )}
        </Box>

        {/* User Data Column */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Distribute content evenly with button at bottom
            ml: { xs: 0, md: 4 }, // Add margin-left only on medium screens and above
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
              mb: 3, // Reduced margin-bottom for more compact spacing
            }}
          >
            {userData.nick}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              <strong>Total points:</strong>
            </Typography>
            <Typography variant="body2">{userData.total}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              <strong>Number of games played:</strong>
            </Typography>
            <Typography variant="body2">
              {userData.numberOfGames ? userData.numberOfGames : 0}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              <strong>Average:</strong>
            </Typography>
            <Typography variant="body2">{average}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              <strong>Country:</strong>
            </Typography>
            <Typography variant="body2">{userData.country}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: userData.email.length > 21 ? "column" : "row",
              alignItems: userData.email.length > 21 ? "flex-start" : "center",
              // alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="body2" sx={{ mr: 1 }}>
              <strong>Email:</strong>
            </Typography>
            <Typography variant="body2">{userData.email}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              <strong>Registration:</strong>
            </Typography>
            <Typography variant="body2">
              {formatDate(userData.registrationDate)}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<ManageAccountsIcon />}
            sx={{
              mt: 20, // Push the button to the bottom
              alignSelf: { xs: "center" },
              backgroundColor: "#3f51b5",
              color: "#ffc107",
              "&:hover": {
                backgroundColor: "#3f52c6",
              },
            }}
            onClick={handleEditDetails}
          >
            Edit details
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserDetail;
