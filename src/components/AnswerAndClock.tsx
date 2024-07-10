import Box from "@mui/material/Box";
import { RoundedElement } from "./RoundedElement";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import axios from "axios";

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
}

interface AnswerAndClockProps {
  clockStart: boolean;
  setFinishZero: Function;
  gameData: GameData | undefined;
  setGameData: Function;
}

export const AnswerAndClock: React.FC<AnswerAndClockProps> = ({
  clockStart,
  setFinishZero,
  gameData,
  setGameData,
}) => {
  const [countdown, setCountdown] = useState(15); // Set initial countdown value
  const [showAnswer, setShowAnswerColor] = useState<string[]>(
    new Array(8).fill("#e8eaf6")
  );
  const [showAnswerNumber, setShowAnswerNumber] = useState<
    undefined | number[]
  >(new Array(7).fill(undefined));

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (clockStart) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    setColor();
    return () => clearInterval(interval);
  }, [clockStart]);

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

  const setColor = () => {
    const answer: string[] = [];
    gameData?.sequence.map((num) => {
      numbers.map((color) => {
        if (num == color.number) {
          answer.push(color.color);
        }
      });
    });
    return answer;
  };

  useEffect(() => {
    if (countdown == 0) {
      const sendFinishZero = async () => {
        try {
          const response = await axios.post(
            `http://localhost:8080/gameinprogress/finishzero/${gameData?.id}`
          );
          setGameData(response.data);
          setShowAnswerNumber(response.data.sequence);
          console.log(response.data);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // setErrorMessage(error);
          }
          // handleOpen();
        }
      };
      sendFinishZero();
      setFinishZero(true);
      setShowAnswerColor(setColor());
    }
  }, [countdown]);

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
          answerColor={showAnswer[index]}
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
