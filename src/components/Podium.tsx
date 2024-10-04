import * as React from "react";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import { Avatar, Box, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { UserAuthContext } from "../UserAuthProvider";
import { AvatarImg } from "./AvatarImg";
import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import { AvatarImgRanking } from "./AvatarImgRanking";
import { useNavigate } from "react-router-dom";
import { useAuthMethods } from "../AuthMethodsProvider";
import { AutomaticLogoutCard } from "./AutomaticLogoutCard";
import { ErrorMessageCard } from "./ErrorMessageCard";

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

export const Podium = () => {
  const {
    redirectToKeycloak,
    getToken,
    refreshAccessToken,
    isTokenValid,
    checkTokenValidity,
    logOut,
    startCheckingIsTokenValid,
  } = useAuthMethods();

  const navigate = useNavigate();
  const userAuthContext = useContext(UserAuthContext);
  if (!userAuthContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }
  const { userAuth, setUserAuth } = userAuthContext;
  const [error, setErrorMessage] = React.useState<AxiosError | null>(null);
  const [openErrorCard, setOpenErrorCard] = React.useState(false);
  const handleClose = () => {
    setOpenErrorCard(false);
  };
  const handleOpen = () => {
    setOpenErrorCard(true);
  };
  const [isAutomaticLogoutCardOpen, setIsAutomaticLogoutCardOpen] =
    React.useState(false);
  const handleOpenALC = () => {
    setIsAutomaticLogoutCardOpen(true);
  };

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      authorization: "Bearer " + userAuth.token,
    },
  };

  const [avatarFirst, setAvatarFirst] = React.useState<string | null>(null);
  const [avatarSecond, setAvatarSecond] = React.useState<string | null>(null);
  const [avatarThird, setAvatarThird] = React.useState<string | null>(null);

  const [first, setFirst] = React.useState<UserData | null>(null);
  const [second, setSecond] = React.useState<UserData | null>(null);
  const [third, setThird] = React.useState<UserData | null>(null);

  React.useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/ranking/thebestthree`,
          config
        );
        setFirst({
          id: response.data.first.id,
          nick: response.data.first.nick,
          total: response.data.first.total,
          country: response.data.first.country || "",
        });
        setSecond({
          id: response.data.second.id,
          nick: response.data.second.nick,
          total: response.data.second.total,
          country: response.data.second.country || "",
        });
        setThird({
          id: response.data.third.id,
          nick: response.data.third.nick,
          total: response.data.third.total,
          country: response.data.third.country || "",
        });

        if (response.data.first.imgAsString) {
          // Get the Base64 image string from the response
          const imageUrl = `data:image/jpeg;base64,${response.data.first.imgAsString}`;
          setAvatarFirst(imageUrl);
        }
        if (response.data.second.imgAsString) {
          // Get the Base64 image string from the response
          const imageUrl = `data:image/jpeg;base64,${response.data.second.imgAsString}`;
          setAvatarSecond(imageUrl);
        }
        if (response.data.third.imgAsString) {
          // Get the Base64 image string from the response
          const imageUrl = `data:image/jpeg;base64,${response.data.third.imgAsString}`;
          setAvatarThird(imageUrl);
        }
        console.log(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error);
          if (error.response && error.response.status === 401) {
            handleOpenALC();
            logOut(true);
            setTimeout(() => {
              redirectToKeycloak();
            }, 7000);
          } else {
            handleOpen();
          }
        }
      }
    };
    fetchUsersData();
  }, []);

  const clickHandler = (id: number) => {
    navigate("/userglance", { state: { id } });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 10,
        mb: 5, // Margin bottom for spacing from the button
      }}
    >
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {/* First Row */}
        <Grid item xs={2} sm={2} mr={{ xs: 6, md: 2 }}>
          <Paper
            onClick={() => {
              if (second) {
                clickHandler(second.id);
              }
            }}
            sx={{
              borderRadius: "60px",
              border: "3px solid",
              borderColor: "#3f51b5",
              height: { xs: 80, md: 110 },
              width: { xs: 80, md: 110 },
              backgroundColor: "#e5eafa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition
              "&:hover": {
                transform: "scale(1.1)", // Slightly enlarge on hover
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Add shadow on hover
                cursor: "pointer",
              },
            }}
          >
            {avatarSecond ? (
              <Avatar
                alt="avatarSecond"
                src={avatarSecond ?? undefined}
                sx={{
                  width: { xs: 75, md: 104 },
                  height: { xs: 75, md: 104 },
                  ml: { xs: -3.2, md: -3.5 },
                }}
              />
            ) : (
              <AccountBoxTwoToneIcon
                sx={{
                  // fontSize: 60,
                  borderRadius: 40,
                  width: { xs: 75, md: 104 },
                  height: { xs: 75, md: 104 },
                  ml: { xs: -3.2, md: -3.5 },
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "Permanent Marker, sans-serif",
                fontSize: { xs: 16, sm: 20 },
                textAlign: "center",
                mb: { xs: -13, md: -17 },
                ml: { xs: -8, md: -9.5 },
              }}
            >
              {second?.nick}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={2} sm={2} mr={{ xs: 6, md: 2 }} mt={-7}>
          <Paper
            onClick={() => {
              if (first) {
                clickHandler(first.id);
              }
            }}
            sx={{
              borderRadius: "60px",
              border: "3px solid",
              borderColor: "#ffc107",
              height: { xs: 80, md: 110 },
              width: { xs: 80, md: 110 },
              backgroundColor: "#e5eafa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
              },
            }}
          >
            {avatarFirst ? (
              <Avatar
                alt="avatarFirst"
                src={avatarFirst ?? undefined}
                sx={{
                  width: { xs: 75, md: 104 },
                  height: { xs: 75, md: 104 },
                  ml: { xs: 0.3, md: -1.3 },
                }}
              />
            ) : (
              <AccountBoxTwoToneIcon
                sx={{
                  // fontSize: 60,
                  borderRadius: 40,
                  width: { xs: 75, md: 104 },
                  height: { xs: 75, md: 104 },
                  ml: { xs: -3.2, md: -3.5 },
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "Permanent Marker, sans-serif",
                fontSize: { xs: 16, sm: 20 },
                textAlign: "center",
                mb: { xs: -13, md: -16.5 },
                ml: { xs: -8, md: -11.5 },
              }}
            >
              {first?.nick}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={2} sm={2} mr={{ xs: 6, md: 2 }}>
          <Paper
            onClick={() => {
              if (third) {
                clickHandler(third.id);
              }
            }}
            sx={{
              borderRadius: "60px",
              border: "3px solid",
              borderColor: "#3f51b5",
              height: { xs: 80, md: 110 },
              width: { xs: 80, md: 110 },
              backgroundColor: "#e5eafa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
              },
            }}
          >
            {avatarThird ? (
              <Avatar
                alt="avatarThird"
                src={avatarThird ?? undefined}
                sx={{
                  width: { xs: 75, md: 104 },
                  height: { xs: 75, md: 104 },
                  ml: { xs: -3.4, md: -2.7 },
                }}
              />
            ) : (
              <AccountBoxTwoToneIcon
                sx={{
                  // fontSize: 60,
                  borderRadius: 40,
                  width: { xs: 75, md: 104 },
                  height: { xs: 75, md: 104 },
                  ml: { xs: -3.2, md: -3.5 },
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "Permanent Marker, sans-serif",
                fontSize: { xs: 16, sm: 20 },
                textAlign: "center",
                mb: { xs: -13, md: -16 },
                ml: { xs: -8, md: -10 },
              }}
            >
              {third?.nick}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Second Row */}
      <Grid container spacing={2} sx={{ mt: 0.5, justifyContent: "center" }}>
        <Grid item xs={2} sm={2} mr={{ xs: 6, md: 2 }}>
          <Paper
            sx={{
              height: { xs: 80, md: 90 },
              width: { xs: 80, md: 110 },
              backgroundColor: "#e5eafa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                pt: 1,
                fontSize: { xs: 60, md: 70 },
                textAlign: "center",
              }}
            >
              2
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={2} sm={2} mr={{ xs: 6, md: 2 }} mt={-7}>
          <Paper
            sx={{
              height: { xs: 80, md: 90 },
              width: { xs: 80, md: 110 },
              backgroundColor: "#e5eafa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                pt: 1,
                fontSize: { xs: 60, md: 70 },
                textAlign: "center",
              }}
            >
              1
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={2} sm={2} mr={{ xs: 6, md: 2 }}>
          <Paper
            sx={{
              height: { xs: 80, md: 90 },
              width: { xs: 80, md: 110 },
              backgroundColor: "#e5eafa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                pt: 1,
                fontSize: { xs: 60, md: 70 },
                textAlign: "center",
              }}
            >
              3
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {openErrorCard && (
        <ErrorMessageCard
          error={error}
          openErrorCard={openErrorCard}
          handleClose={handleClose}
        />
      )}
      {isAutomaticLogoutCardOpen && (
        <AutomaticLogoutCard
          isAutomaticLogoutCardOpen={isAutomaticLogoutCardOpen}
          setIsAutomaticLogoutCardOpen={setIsAutomaticLogoutCardOpen}
          nick={userAuth.nick}
        />
      )}
    </Box>
  );
};
