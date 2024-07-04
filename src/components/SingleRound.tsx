import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { RoundedElement, SendGuessButton } from "../components";
import { useMediaQuery } from "@mui/material";
import { green } from "@mui/material/colors";

interface SingleRoundProps {
  active?: boolean;
  response?: number[];
  id: number;
  round: number;
  setRound: Function;
  setPreviousGuesses: Function;
  previousGuesses: number[];
}

export const SingleRound: React.FC<SingleRoundProps> = ({
  active,
  response,
  id,
  round,
  setRound,
  setPreviousGuesses,
  previousGuesses,
}) => {
  const [resp, setResp] = useState<number[]>([0, 0]);
  let colorProvider = new Array(8).fill(undefined);
  useEffect(() => {
    setGuess(new Array(8).fill(undefined));
    if (resp) {
      console.log("Resp: " + resp);
      colorProvider.map((item) => (item = undefined));
      for (let i = 0; i < resp[0]; i++) {
        colorProvider[i] = "#64dd17";
      }
      for (let i = 0; i < resp[1]; i++) {
        if (colorProvider[i] != "#64dd17") {
          colorProvider = [...colorProvider];
          colorProvider[i] = "#1a237e";
        }
      }
      for (let i = 0; i < colorProvider.length; i++) {
        if (colorProvider[i] === undefined || null) {
          colorProvider = [...colorProvider];
          colorProvider[i] = "#c5cae9";
        }
      }
    }
    console.log(colorProvider);
  }, [round, resp]);

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
    console.log("updatedGuess: ", updatedGuess);
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
            key={index}
            color="#e8eaf6"
            size={blueSize}
            activeSize={activeSize}
            active={active}
            fatherIndex={index}
            sendGuess={sendGuess}
            previousGuess={previousGuesses ? previousGuesses[index] : undefined}
          />
        ))}
      </Box>

      {active ? (
        <SendGuessButton
          id={id}
          guess={guess}
          round={round}
          setRound={setRound}
          setResp={setResp}
          setPreviousGuesses={setPreviousGuesses}
        ></SendGuessButton>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" gap={0}>
          <Box display="flex" justifyContent="center" gap={0}>
            {Array.from({ length: 4 }).map((_, index) => (
              <RoundedElement
                key={index}
                color={colorProvider[index]}
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
                key={index}
                color={colorProvider[index + 4]}
                size={greenSize}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
