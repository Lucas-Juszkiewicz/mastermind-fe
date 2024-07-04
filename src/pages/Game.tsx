import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { GameWinPopup, SingleRound } from "../components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface GameData {
  id: number;
  userId: number;
  startTime: string;
  finishTime: string;
  round: number;
  response: number[];
  sequenceJson: string;
  guesses: number[][];
  guessesJson: string;
}

export const Game = () => {
  const { userId } = useParams();
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [round, setRound] = useState<number>(0);
  const [previousGuesses, setPreviousGuesses] = useState<number[][]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/gameinprogress/start/${userId}`
        );
        setGameData(response.data);
        setRound(response.data.round);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // setErrorMessage(error);
        }
        // handleOpen();
      }
    };
    fetchUserData();
  }, [userId]);

  const renderRounds = () => {
    const rounds = [];
    for (let i = 0; i < 12; i++) {
      rounds.push(
        <Grid key={i}>
          <SingleRound
            response={gameData ? gameData.response : []}
            active={gameData && i == (round - 11) * -1 ? true : false}
            id={gameData?.id ?? 0}
            round={gameData?.round ?? 0}
            setRound={setRound}
            setPreviousGuesses={setPreviousGuesses}
            previousGuesses={previousGuesses[(i - 11) * -1]}
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
        margin: "20px auto", // Center the Paper with margin
        py: "20px",
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
        {renderRounds()}
      </Box>
    </Paper>
  );
};
