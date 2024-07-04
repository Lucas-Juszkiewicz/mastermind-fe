import Button from "@mui/material/Button";
import axios from "axios";
import React from "react";
interface SendGuessButtonProps {
  id: Number;
  guess: (number | undefined)[];
  round: Number;
  setRound: Function;
  setResp: Function;
  setPreviousGuesses: Function;
}
export const SendGuessButton: React.FC<SendGuessButtonProps> = ({
  id,
  guess,
  round,
  setRound,
  setResp,
  setPreviousGuesses,
}) => {
  const GameInProgressDTO = {
    id: id,
    guess: guess,
  };

  const sendGuess = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/gameinprogress/check`,
        GameInProgressDTO
      );
      setRound(response.data.round);
      setResp(response.data.response);
      setPreviousGuesses(response.data.previousGuesses);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // setErrorMessage(error);
      }
      // handleOpen();
    }
  };

  return (
    <div>
      <Button
        disabled={!guess.every((item) => item !== undefined || null)}
        onClick={sendGuess}
        variant="contained"
      >
        Check
      </Button>
    </div>
  );
};
