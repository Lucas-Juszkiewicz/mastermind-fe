import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";

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
import RankingImg from "../assets/success2_img.png";
import { Podium } from "../components/Podium";

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

export const Ranking = () => {
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
          userId: response.data.id, // Assuming `id` in `UserData` maps to `userId`
          nick: response.data.nick,
          email: response.data.email,
          country: response.data.country || "", // Optional field
          token: userAuth.token, // Keep the existing token
          refreshToken: userAuth.refreshToken, // Keep the existing refresh token
          tokenExp: userAuth.tokenExp, // Keep the existing token expiry
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
        p: { xs: "20px", sm: "20px", md: "40px" }, // Adjust padding to make space tighter
        maxWidth: "800px",
        backgroundColor: "#f3f4f6",
        borderRadius: "6px",
        border: "1px solid #ddd",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column" },
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
            // justifyContent: "center",
            alignItems: "center",
            marginBottom: { xs: "20px", md: "0px" }, // Space between avatar and user data on small screens
          }}
        >
          <Box
            component="img"
            src={RankingImg}
            alt="rankingImg"
            sx={{
              alignSelf: {
                xs: "center",
                sm: "center",
              },
              marginLeft: {
                xs: "0px",
                sm: "0px",
              },
              marginTop: {
                xs: "0px",
                sm: "0px",
              },
              objectFit: "cover",
              borderRadius: "10px",
              width: {
                xs: "330px",
                sm: "400px",
                lg: "700px",
              },
              height: {
                xs: "120px",
                sm: "150px",
                lg: "170px",
              },
            }}
          />
        </Box>
        <Podium />

        <Button
          variant="contained"
          startIcon={<EmojiEventsTwoToneIcon />}
          sx={{
            mt: 10, // Push the button to the bottom
            alignSelf: { xs: "center" },
            backgroundColor: "#3f51b5",
            color: "#ffc107",
            "&:hover": {
              backgroundColor: "#3f52c6",
            },
          }}
          onClick={handleEditDetails}
        >
          SEE THE FULL RANKING
        </Button>
      </Box>
    </Paper>
  );
};

export default Ranking;
