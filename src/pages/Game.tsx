import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { AnswerAndClock, SingleRound } from "../components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StartCard } from "../components/StartCard";
import { FinishCard } from "../components/FinishCard";
import { useKeycloak } from "@react-keycloak/web";
import { user } from "../Keycloak";

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
  id: string;
  name: string;
  email: string;
  token: string;
}

export const Game = () => {
  const { userId } = useParams();
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [round, setRound] = useState<number>(0);
  const [previousGuesses, setPreviousGuesses] = useState<number[][] | null>([]);
  const [previousResponses, setPreviousResponses] = useState<number[][] | null>(
    []
  );
  const [greenYellowProviderForAllRounds, setGreenYellowProviderForAllRounds] =
    useState<string[][]>([]);

  const [isClockStart, setIsClockStart] = useState<boolean>(false);
  const [isStartCardOpen, setIsStartCardOpen] = useState<boolean>(true);
  const [finishZero, setFinishZero] = useState<boolean>(false);
  const [finishVictory, setFinishVictory] = useState<Game>();
  const [finishZeroResponse, setFinishZeroResponse] = useState<Game>();
  const [isClockFinish, setIsClockFinish] = useState<boolean>(false);
  const [isFinishCardOpen, setIsFinishCardOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("UserID: " + user.id);
      console.log("Bearer " + user.token);

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          authorization: "Bearer " + user.token,
        },
      };

      try {
        const response = await axios.get(
          `http://localhost:8081/gameinprogress/start`,
          config
        );
        setGameData(response.data);
        setRound(response.data.round);
      } catch (error) {
        console.error("Failed to load user profile:", error);
      }
    };

    if (isClockStart) {
      fetchUserData();
    }
  }, [isClockStart]);

  useEffect(() => {
    if (gameData) {
      setRound(gameData.round);
      setPreviousGuesses(gameData.previousGuesses);
      setPreviousResponses(gameData.previousResponses);
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
    if (finishVictory != undefined || finishZeroResponse != null) {
      setIsClockFinish(true);
      setIsFinishCardOpen(true);
    }
    console.log("FinishVictory in game: " + finishVictory?.success);
    console.log("FinishZero in game: " + finishZeroResponse?.success);
  }, [finishVictory, finishZeroResponse]);

  const renderRounds = () => {
    const rounds = [];
    for (let i = 0; i < 12; i++) {
      rounds.push(
        <Grid key={i}>
          <SingleRound
            active={
              !finishVictory && !finishZero
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
          finishGame={finishZeroResponse ? finishZeroResponse : finishVictory}
        />
        <AnswerAndClock
          isClockStart={isClockStart}
          setFinishZero={setFinishZero}
          gameData={gameData ? gameData : undefined}
          setGameData={setGameData}
          setFinishZeroResponse={setFinishZeroResponse}
          setIsFinishCardOpen={setIsFinishCardOpen}
          isClockFinish={isClockFinish}
        />
        {renderRounds()}
      </Box>
    </Paper>
  );
};
