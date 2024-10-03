import Button from "@mui/material/Button";
import axios, { AxiosError } from "axios";
import { UserAuthContext } from "../UserAuthProvider";
import { useContext, useState } from "react";
import { useGameData } from "../GameDataProvider";
import { useAuthMethods } from "../AuthMethodsProvider";
import { useNavigate } from "react-router-dom";
import { ErrorMessageCard } from "./ErrorMessageCard";
import { AutomaticLogoutCard } from "./AutomaticLogoutCard";

interface SendGuessButtonProps {
  id: number;
  guess: (number | undefined)[];
  round: Number;
  setFinishVictory: Function;
  setFinishRounds: Function;
}

interface GameData {
  id: number;
  userId: number;
  startTime: string;
  finishTime: string;
  round: number;
  response: number[];
  sequenceJson: string;
  sequence: number[];
  guesses: number[][];
  guessesJson: string;
  previousResponses: number[][];
  previousGuesses: number[][];
  finalMessage: string;
}

export const SendGuessButton: React.FC<SendGuessButtonProps> = ({
  id,
  guess,
  round,
  setFinishVictory,
  setFinishRounds,
}) => {
  const {
    redirectToKeycloak,
    getToken,
    refreshAccessToken,
    isTokenValid,
    checkTokenValidity,
    logOut,
    startCheckingIsTokenValid,
  } = useAuthMethods();
  const { gameData, setGameData } = useGameData();
  const userAuthContext = useContext(UserAuthContext);
  const navigate = useNavigate();
  if (!userAuthContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }
  const { userAuth } = userAuthContext;

  const [error, setErrorMessage] = useState<AxiosError | null>(null);
  const [openErrorCard, setOpenErrorCard] = useState(false);
  const handleClose = () => {
    setOpenErrorCard(false);
  };
  const handleOpen = () => {
    setOpenErrorCard(true);
  };

  const [isAutomaticLogoutCardOpen, setIsAutomaticLogoutCardOpen] =
    useState(false);
  // const handleCloseALC = () => {
  //   setIsAutomaticLogoutCardOpen(false);
  // };
  const handleOpenALC = () => {
    setIsAutomaticLogoutCardOpen(true);
  };

  const GameInProgressDTO = {
    id: id,
    guess: guess,
  };

  const configFetchFinishVictory = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      authorization: "Bearer " + userAuth.token,
    },
  };

  const configFetchFinishRounds = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      authorization: "Bearer " + userAuth.token,
    },
  };

  const configSendGuess = {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + userAuth.token,
    },
  };

  const fetchFinishVictory = async (gameId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/game/finishvictory/${gameId}`,
        configFetchFinishVictory
      );
      setFinishVictory(response.data);
      console.log("FINISH VICTORY: " + response.data.sequence);
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

  const fetchFinishRounds = async (gameId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/game/finishrounds/${gameId}`,
        configFetchFinishRounds
      );
      setFinishRounds(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error);
        if (error.response && error.response.status === 401) {
          handleOpenALC();
          logOut(true);
          setTimeout(() => {
            redirectToKeycloak();
          }, 6000);
        } else {
          handleOpen();
        }
      }
    }
  };

  const sendGuess = async () => {
    checkTokenValidity(userAuth.tokenExp);
    if (!isTokenValid(userAuth.tokenExp)) {
      logOut(true);
      navigate("/home");
    }

    try {
      const response = await axios.post(
        `http://localhost:8081/gameinprogress/check`,
        GameInProgressDTO,
        configSendGuess
      );
      setGameData(response.data);
      if (response.data.finalMessage === "win") {
        fetchFinishVictory(id);
      } else if (response.data.finalMessage === "defeat") {
        fetchFinishRounds(id);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error);
        if (error.response && error.response.status === 401) {
          handleOpenALC();
          logOut(true);
          setTimeout(() => {
            redirectToKeycloak();
          }, 6000);
        } else {
          handleOpen();
        }
      }
    }
  };

  return (
    <div>
      <Button
        disabled={!guess.every((item) => item !== undefined || null)}
        onClick={sendGuess}
        variant="contained"
        sx={{
          height: {
            xs: 40,
            sm: 45,
            md: 50,
            lg: 50,
            xl: 50,
          },
          width: {
            xs: 70,
            sm: 93,
            md: 102,
            lg: 100,
            xl: 100,
          },
        }}
      >
        Check
      </Button>
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
    </div>
  );
};
