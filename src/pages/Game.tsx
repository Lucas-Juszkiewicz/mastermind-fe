import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { AnswerAndClock, SingleRound } from "../components";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { StartCard } from "../components/StartCard";
import { FinishCard } from "../components/FinishCard";
import { UserAuthContext } from "../UserAuthProvider";
import { useAuthMethods } from "../AuthMethodsProvider";
import { useGameData } from "../GameDataProvider";

interface Game {
  id: number;
  user: {
    id: number;
  };
  duration: number;
  round: number;
  attempts: number;
  date: string;
  points: number;
  success: boolean;
  sequence: number[];
  guesses: number[][];
  responses: number[][];
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

interface User {
  userId: string;
  name: string;
  email: string;
  token: string;
}

export const Game = () => {
  const {
    redirectToKeycloak,
    getToken,
    refreshAccessToken,
    isTokenValid,
    checkTokenValidity,
    startCheckingIsTokenValid,
  } = useAuthMethods();
  const { gameData, setGameData } = useGameData();
  const [round, setRound] = useState<number>(0);
  const [previousGuesses, setPreviousGuesses] = useState<number[][] | null>([]);
  const [previousResponses, setPreviousResponses] = useState<number[][] | null>(
    []
  );
  const [greenYellowProviderForAllRounds, setGreenYellowProviderForAllRounds] =
    useState<string[][]>([]);

  const [isClockStart, setIsClockStart] = useState<boolean>(false);
  // const [isStartCardOpen, setIsStartCardOpen] = useState<boolean>(true && localStorage.getItem('isGameInProgress')==null);
  const [isStartCardOpen, setIsStartCardOpen] = useState<boolean>(false);
  const [finishZero, setFinishZero] = useState<boolean>(false);
  const [finishVictory, setFinishVictory] = useState<Game | undefined>(
    undefined
  );
  const [finishRounds, setFinishRounds] = useState<Game | undefined>(undefined);
  const [finishZeroResponse, setFinishZeroResponse] = useState<Game>();
  const [isClockFinish, setIsClockFinish] = useState<boolean>(false);
  const [isFinishCardOpen, setIsFinishCardOpen] = useState<boolean>(false);

  const userAuthContext = useContext(UserAuthContext);
  if (!userAuthContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }
  const {
    userAuth,
    setUserAuth,
    fetchGameInProgressAfterRecall,
    checkIfGameInProgresExists,
  } = userAuthContext;

  useEffect(() => {
    const isGameInProgress = localStorage.getItem("isGameInProgress");
    if (isGameInProgress) {
      fetchGameInProgressAfterRecall(userAuth.token);
    } else {
      console.log("isStartCardOpen: " + isStartCardOpen);

      const checkGameExists = async () => {
        const isGameInProgressExists = await checkIfGameInProgresExists(
          userAuth.token
        );
        console.log("isGameInProgressExists: " + isGameInProgressExists);
        setIsStartCardOpen(!isGameInProgressExists);
        console.log("isStartCardOpen: " + isStartCardOpen);
        if (isGameInProgressExists) {
          const fetchGameDataHere = async () => {
            await fetchGameInProgressAfterRecall(userAuth.token);
            localStorage.setItem("isGameInProgress", "true");
          };
          fetchGameDataHere();
        }
      };
      checkGameExists();
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("UserID: " + userAuth.userId);
      console.log("Bearer " + userAuth.token);

      if (!isTokenValid(userAuth.tokenExp)) {
        refreshAccessToken(userAuth.refreshToken);
        console.log("Refreshed " + userAuth.token);
      }
      const config = {
        headers: {
          // "Content-Type": "application/x-www-form-urlencoded",
          "Content-Type": "application/json",
          authorization: "Bearer " + userAuth.token,
        },
      };
      if (userAuth.token) {
        try {
          const response = await axios.get(
            `http://localhost:8081/gameinprogress/start`,
            config
          );
          setGameData(response.data);
          setRound(response.data.round);
          localStorage.setItem("isGameInProgress", "true");
        } catch (error) {
          console.error("Failed to load user profile:", error);
        }
      }
    };

    if (isClockStart && localStorage.getItem("isGameInProgress") == null) {
      fetchUserData();
    }
  }, [isClockStart]);

  useEffect(() => {
    if (gameData) {
      setRound(gameData.round);
      // console.log(gameData.round);
      setPreviousGuesses(gameData.previousGuesses);
      // console.log(gameData.previousGuesses);
      setPreviousResponses(gameData.previousResponses);
      // console.log(gameData.previousResponses);
    }
  }, [gameData]);

  useEffect(() => {
    const updatedGreenYellowProviderForAllRounds: string[][] = [];

    for (let i = 0; i < 12; i++) {
      let greenYellowProvider = Array(8).fill("");

      let previousResponse = previousResponses && previousResponses[i];
      if (previousResponse) {
        for (let j = 0; j < previousResponse[0]; j++) {
          greenYellowProvider[j] = "#64dd17";
        }
        for (let j = 0; j < previousResponse[1]; j++) {
          greenYellowProvider[previousResponse[0] + j] = "#ffc107";
        }
        for (let j = 0; j < greenYellowProvider.length; j++) {
          if (greenYellowProvider[j] === "") {
            greenYellowProvider[j] = "#c5cae9";
          }
        }
      }
      updatedGreenYellowProviderForAllRounds.push(greenYellowProvider);
    }

    setGreenYellowProviderForAllRounds(updatedGreenYellowProviderForAllRounds);
  }, [round, previousResponses]);

  useEffect(() => {
    if (
      finishRounds != undefined ||
      finishVictory != undefined ||
      finishZeroResponse != null
    ) {
      setIsClockFinish(true);
      setIsFinishCardOpen(true);
      localStorage.removeItem("isGameInProgress");
    }
    console.log("FinishVictory in game: " + finishVictory?.success);
    console.log("FinishZero in game: " + finishZeroResponse?.success);
  }, [finishVictory, finishZeroResponse, finishRounds]);

  const renderRounds = () => {
    const rounds = [];
    for (let i = 0; i < 12; i++) {
      rounds.push(
        <Grid key={i}>
          <SingleRound
            active={
              !finishVictory && !finishZero && !finishRounds
                ? gameData && i == (round - 11) * -1
                  ? true
                  : false
                : false
            }
            id={gameData?.id ?? 0}
            round={gameData?.round ?? 0}
            setGameData={setGameData}
            previousGuesses={
              previousGuesses
                ? previousGuesses[(i - 11) * -1] ?? [0, 0]
                : [0, 0]
            }
            greenYellowProviderForSingleRound={
              greenYellowProviderForAllRounds[(i - 11) * -1] ?? []
            }
            finishZero={finishZero}
            setFinishVictory={setFinishVictory}
            setFinishRounds={setFinishRounds}
          />
        </Grid>
      );
    }
    return rounds;
  };

  return (
    <Paper
      elevation={3}
      sx={{
        margin: "10px auto", // Center the Paper with margin
        py: "15px",
        maxWidth: "800px", // Set a maximum width for better readability
        backgroundColor: "#f3f4f6", // Light background color
        borderRadius: "6px", // Rounded corners
        border: "1px solid #ddd",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 1, md: 1 }}
        ></Grid>
        <StartCard
          isStartCardOpen={isStartCardOpen}
          setIsStartCardOpen={setIsStartCardOpen}
          setIsClockStart={setIsClockStart}
        />
        <FinishCard
          isFinishCardOpen={isFinishCardOpen}
          setIsFinishCardOpen={setIsFinishCardOpen}
          finishGame={
            finishZeroResponse
              ? finishZeroResponse
              : finishVictory
              ? finishVictory
              : finishRounds
          }
        />
        <AnswerAndClock
          isClockStart={isClockStart}
          setFinishZero={setFinishZero}
          setFinishZeroResponse={setFinishZeroResponse}
          setIsFinishCardOpen={setIsFinishCardOpen}
          isClockFinish={isClockFinish}
          finishVictory={finishVictory}
          finishRounds={finishRounds}
          setIsClockStart={setIsClockStart}
          renderRounds={renderRounds}
          setPreviousGuesses={setPreviousGuesses}
        />
        {renderRounds()}
      </Box>
    </Paper>
  );
};
