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
  country?: string;
  total?: number;
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
  // const [userData, setUserData] = useState<UserData | null>(null);

  // const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Update screen width on window resize
  // useEffect(() => {
  //   const handleResize = () => {
  //     setScreenWidth(window.innerWidth);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  // const isLongText = userData.nick.split(" ")[0].length > 8;
  // const fontSize = isLongText
  //   ? { xs: "1.5rem", sm: "2.8rem", md: "2.8rem" }
  //   : { xs: "2.5rem", sm: "3.5rem", md: "3.5rem" };

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return format(date, "dd.MM.yyy");
  // };

  // let average;
  // if (userData.numberOfGames != null && userData.total != undefined) {
  //   average = userData.total / userData.numberOfGames;
  //   average.toFixed();
  // } else {
  //   average = 0;
  // }

  const handleEditDetails = () => {
    // localStorage.setItem("userData", JSON.stringify(userData));
    navigate("/rankingfull");
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
            xs: "400px", // Minimum height for extra-small screens
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
            marginBottom: { xs: "5px", md: "5px" }, // Space between avatar and user data on small screens
          }}
        >
          {false ? (
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
          ) : (
            <Typography
              variant="h5"
              align="center"
              sx={{
                fontFamily: "Permanent Marker, sans-serif",
                color: "#3f51b5",
                // fontSize: fontSize,
                lineHeight: 1.2,
                letterSpacing: "0.05em",
                mb: 3, // Reduced margin-bottom for more compact spacing
              }}
            >
              Ranking
            </Typography>
          )}
        </Box>
        <Podium />

        <Button
          variant="contained"
          startIcon={<EmojiEventsTwoToneIcon />}
          sx={{
            mt: 2, // Push the button to the bottom
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
