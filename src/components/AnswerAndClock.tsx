import Box from "@mui/material/Box";
import { RoundedElement } from "./RoundedElement";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect, useContext } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import { useAuthMethods } from "../AuthMethodsProvider";
import { ContinueButton } from "./ContinueButton";
import { UserAuthContext } from "../UserAuthProvider";
import { useGameData } from "../GameDataProvider";

const numbers = [
  { number: 1, color: "#ffeb3b", hoverColor: "#ffe082" }, // yellow
  { number: 2, color: "#ff5722", hoverColor: "#ff7043" }, // deep orange
  { number: 3, color: "#4caf50", hoverColor: "#66bb6a" }, // green
  { number: 4, color: "#00bcd4", hoverColor: "#4dd0e1" }, // cyan
  { number: 5, color: "#ff9800", hoverColor: "#ffb74d" }, // orange
  { number: 6, color: "#e91e63", hoverColor: "#ec407a" }, // pink
  { number: 7, color: "#84ffff", hoverColor: "#a7d7f1" }, // deep purple
  { number: 8, color: "#ffff8d", hoverColor: "#fff176" }, // indigo
  { number: 9, color: "#2196f3", hoverColor: "#64b5f6" }, // blue
  { number: 10, color: "#b388ff", hoverColor: "#d1c4e9" }, // purple
];

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

interface AnswerAndClockProps {
  isClockStart: boolean;
  setFinishZero: Function;
  setIsClockStart: Function;
  setFinishZeroResponse: Function;
  setIsFinishCardOpen: Function;
  isClockFinish: boolean;
  finishVictory: Game | undefined;
  finishRounds: Game | undefined;
  renderRounds: Function;
  setPreviousGuesses: Function;
}

export const AnswerAndClock: React.FC<AnswerAndClockProps> = ({
  isClockStart,
  setFinishZero,
  setFinishZeroResponse,
  setIsFinishCardOpen,
  isClockFinish,
  finishVictory,
  finishRounds,
  setIsClockStart,
  renderRounds,
  setPreviousGuesses,
}) => {
  const userAuthContext = useContext(UserAuthContext);
  const {
    redirectToKeycloak,
    getToken,
    refreshAccessToken,
    isTokenValid,
    checkTokenValidity,
    startCheckingIsTokenValid,
  } = useAuthMethods();
  if (!userAuthContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }

  const { gameData, setGameData } = useGameData();
  const { userAuth } = userAuthContext;
  const [countdown, setCountdown] = useState(1200); // Set initial countdown value
  const [showAnswerColor, setShowAnswerColor] = useState<string[]>(
    new Array(8).fill("#e8eaf6")
  );
  const [showAnswerNumber, setShowAnswerNumber] = useState<
    undefined | number[]
  >(new Array(7).fill(undefined));

  useEffect(() => {
    if (gameData?.startTime) {
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      const startTime = new Date(gameData.startTime.replace(" ", "T"));
      const startTimeInSeconds = Math.floor(startTime.getTime() / 1000);
      const countdownValue = 1200 - (currentTimeInSeconds - startTimeInSeconds);
      setCountdown(countdownValue);
      setIsClockStart(true);
      // renderRounds();
      console.log("Was thread here?");
    }
    console.log("Or there?" + gameData?.startTime);
  }, [gameData]);

  useEffect(() => {
    if (!isClockStart) return; // Do nothing if clockStart is false

    if (!isClockFinish) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval on component unmount or clockStart change
    }
  }, [isClockStart, isClockFinish]);

  // Helper function to format time as mm:ss
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );
  const isMediumScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.between("sm", "md")
  );
  // Set sizes based on screen size
  const blueSize = isSmallScreen ? 27 : isMediumScreen ? 25 : 30;

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      authorization: "Bearer " + userAuth.token,
    },
  };

  useEffect(() => {
    if (countdown == 0) {
      if (!isTokenValid(userAuth.tokenExp)) {
        refreshAccessToken(userAuth.refreshToken);
        console.log("Refreshed " + userAuth.token);
      }
      const sendFinishZero = async () => {
        try {
          const finishZeroResponse = await axios.get(
            `http://localhost:8081/game/finishzero/${gameData?.id}`,
            config
          );
          setFinishZeroResponse(finishZeroResponse.data);
          setShowAnswerNumber(finishZeroResponse.data.sequence);
          setShowAnswerColor(setColor(finishZeroResponse.data.sequence));
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // setErrorMessage(error);
          }
          // handleOpen();
        }
      };
      sendFinishZero();
      setFinishZero(true);
    }
  }, [countdown]);

  const setColor = (sequence: number[]) => {
    const answer: string[] = [];

    sequence.map((num) => {
      numbers.map((color) => {
        if (num == color.number) {
          answer.push(color.color);
        }
      });
    });
    return answer;
  };

  useEffect(() => {
    if (finishRounds != undefined || finishVictory != undefined) {
      const game: Game =
        finishVictory !== undefined ? finishVictory : finishRounds!;
      setShowAnswerNumber(game.sequence);
      setShowAnswerColor(setColor(game.sequence));
    }
  }, [finishVictory, finishRounds]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexWrap="nowrap"
      gap={0}
      marginRight={{ xs: 2.7, sm: 3, md: 4, lg: 4 }}
      marginLeft={0.3}
      paddingBottom={1}
      flexDirection={"row"}
      alignItems="center"
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <RoundedElement
          isThisResponse={false}
          key={index}
          color=""
          answerColor={showAnswerColor[index]}
          answerNumber={showAnswerNumber ? showAnswerNumber[index] : undefined}
          size={blueSize}
          active={false}
          answer={false}
          fatherIndex={index}
          colorGreenYellow=""
        />
      ))}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="37px"
        gap={0}
        marginTop={1}
        marginLeft={{ xs: 3, sm: 3, md: 4, lg: 5 }}
      >
        {isClockFinish ? (
          <ContinueButton />
        ) : (
          <Typography color={countdown < 60 ? "red" : "#1a237e"}>
            {formatTime(countdown)}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
