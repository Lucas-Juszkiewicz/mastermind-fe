import Button from "@mui/material/Button";
import axios from "axios";
import { user } from "../Keycloak";
interface SendGuessButtonProps {
  id: number;
  guess: (number | undefined)[];
  round: Number;
  setGameData: Function;
  setFinishVictory: Function;
}

export const SendGuessButton: React.FC<SendGuessButtonProps> = ({
  id,
  guess,
  round,
  setGameData,
  setFinishVictory,
}) => {
  const GameInProgressDTO = {
    id: id,
    guess: guess,
  };

  const configFetchFinishVictory = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      authorization: "Bearer " + user.token,
    },
  };

  const configSendGuess = {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + user.token,
    },
  };

  const fetchFinishVictory = async (gameId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/game/finishvictory/${gameId}`,
        configFetchFinishVictory
      );
      setFinishVictory(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // setErrorMessage(error);
      }
      // handleOpen();
    }
  };

  const sendGuess = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8081/gameinprogress/check`,
        GameInProgressDTO,
        configSendGuess
      );
      setGameData(response.data);
      if (response.data.finalMessage === "win") {
        fetchFinishVictory(id);
      }
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
    </div>
  );
};
