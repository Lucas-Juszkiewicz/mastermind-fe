import Box from "@mui/material/Box";
import { RoundedElement } from "./RoundedElement";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import { count } from "console";

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

interface AnswerAndClockProps {
  isClockStart: boolean;
  setFinishZero: Function;
  gameData: GameData | undefined;
  setGameData: Function;
  setFinishZeroResponse: Function;
  setIsFinishCardOpen: Function;
  isClockFinish: boolean;
}

export const AnswerAndClock: React.FC<AnswerAndClockProps> = ({
  isClockStart,
  setFinishZero,
  gameData,
  setGameData,
  setFinishZeroResponse,
  setIsFinishCardOpen,
  isClockFinish,
}) => {
  const [countdown, setCountdown] = useState(50); // Set initial countdown value
  const [showAnswerColor, setShowAnswerColor] = useState<string[]>(
    new Array(8).fill("#e8eaf6")
  );
  const [showAnswerNumber, setShowAnswerNumber] = useState<
    undefined | number[]
  >(new Array(7).fill(undefined));

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

  useEffect(() => {
    if (countdown == 0) {
      const sendFinishZero = async () => {
        try {
          const finishZeroResponse = await axios.get(
            `http://localhost:8080/game/finishzero/${gameData?.id}`
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
      setIsFinishCardOpen(true);
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
        marginLeft={{ xs: 3, sm: 3, md: 4, lg: 5 }}
      >
        <Typography color={countdown < 60 ? "red" : "#1a237e"}>
          {formatTime(countdown)}
        </Typography>
      </Box>
    </Box>
  );
};
