import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { RoundedElement, SendGuessButton } from "../components";
import { useMediaQuery } from "@mui/material";
import { green } from "@mui/material/colors";

interface SingleRoundProps {
  active?: boolean;
  id: number;
  round: number;
  setGameData: Function;
  previousGuesses: number[];
  greenYellowProviderForSingleRound: (string | undefined)[];
  finishZero: boolean;
}

export const SingleRound: React.FC<SingleRoundProps> = ({
  active,
  id,
  round,
  previousGuesses,
  greenYellowProviderForSingleRound,
  setGameData,
  finishZero,
}) => {
  useEffect(() => {
    setGuess(new Array(8).fill(undefined));
  }, [round]);
  // Define breakpoints for different sizes
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );
  const isMediumScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.between("sm", "md")
  );

  // Set sizes based on screen size
  const blueSize = isSmallScreen ? 27 : isMediumScreen ? 25 : 30;
  const greenSize = isSmallScreen ? 13 : isMediumScreen ? 18 : 20;
  const activeSize = isSmallScreen ? 32 : isMediumScreen ? 30 : 35;

  const [guess, setGuess] = useState<(number | undefined)[]>(
    new Array(8).fill(undefined)
  );
  const sendGuess = (guessToAdd: []) => {
    const updatedGuess = [...guess]; // Create a copy of the current guess array

    const toAddIndex = guessToAdd.findIndex(
      (value) => value !== undefined || null
    );
    if (toAddIndex !== -1) {
      const guessedSingleNumber = guessToAdd[toAddIndex];
      updatedGuess[toAddIndex] = guessedSingleNumber;
    }

    setGuess(updatedGuess);
  };

  return (
    <Box
      display="flex"
      flexDirection={"row"}
      alignItems="center"
      justifyContent="center"
      gap={0}
      sx={{
        margin: "0 auto",
        py: 0.7,
      }}
    >
      {/* First Group of 8 Elements */}
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={0}
        marginRight={1.2}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <RoundedElement
            isThisResponse={false}
            key={index}
            color="#e8eaf6"
            size={blueSize}
            activeSize={activeSize}
            active={!finishZero && active}
            fatherIndex={index}
            sendGuess={sendGuess}
            previousGuess={previousGuesses ? previousGuesses[index] : undefined}
            colorGreenYellow=""
          />
        ))}
      </Box>

      {active ? (
        <SendGuessButton
          id={id}
          guess={guess}
          round={round}
          setGameData={setGameData}
        ></SendGuessButton>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" gap={0}>
          <Box display="flex" justifyContent="center" gap={0}>
            {Array.from({ length: 4 }).map((_, index) => (
              <RoundedElement
                isThisResponse={true}
                key={index}
                color=""
                colorGreenYellow={
                  greenYellowProviderForSingleRound[index] || "#c5cae9"
                }
                size={greenSize}
              />
            ))}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap={0}
            margin={0}
            padding={0}
            paddingTop={0.1}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <RoundedElement
                isThisResponse={true}
                key={index}
                color=""
                colorGreenYellow={
                  greenYellowProviderForSingleRound[index + 4] || "#c5cae9"
                }
                size={greenSize}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
