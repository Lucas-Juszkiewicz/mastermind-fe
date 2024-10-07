import {
  Backdrop,
  Slide,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import success_img from "../assets/success_img.png";
import error2_img from "../assets/error2_img.png";
import { PointOfSale } from "@mui/icons-material";
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

interface FinishCardProps {
  isFinishCardOpen: boolean;
  setIsFinishCardOpen: Function;
  finishGame: Game | undefined;
  setFinishZeroResponse: Function;
}

export const FinishCard: React.FC<FinishCardProps> = ({
  setIsFinishCardOpen,
  isFinishCardOpen,
  finishGame,
  setFinishZeroResponse,
}) => {
  const cardMessageVictory = "Good work. You have won! Check your staistics";
  const cardMessageFail = "You have faild. Keep trainig.";

  // Helper function to format time as mm:ss
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const duration = finishGame?.duration ?? 0;
  const success = finishGame?.success ?? false;
  const points = finishGame?.points ?? 0;
  const attempts = finishGame?.attempts ?? 0;

  // console.log("Finish card items: " + duration + success + points + attempts);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isFinishCardOpen}
      // onClick={handleClose}
    >
      <Slide
        timeout={{ appear: 500, enter: 300, exit: 500 }}
        direction="up"
        in={isFinishCardOpen}
        mountOnEnter
        unmountOnExit
      >
        <Card sx={{ maxWidth: 350, borderRadius: "6px", position: "relative" }}>
          <CardMedia
            sx={{ height: 170, position: "relative" }}
            image={finishGame?.success ? success_img : error2_img}
            title="finish_img"
          >
            <Typography
              variant="h5"
              align="center"
              sx={{
                fontFamily: "Permanent Marker, sans-serif",
                color: "#ffcc80",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(circle, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1))",
                // padding: "30px",
                px: "60px",
                py: "20px",
                borderRadius: "6px",
                fontSize: { xs: "1.8rem", sm: "1.8rem", md: "1.9rem" },
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                letterSpacing: "0.15em",
              }}
            >
              {success ? "Congratulations!" : "You faild"}
            </Typography>
          </CardMedia>
          <CardContent>
            <Typography
              variant="body1"
              align="center"
              paddingTop={0.5}
              paddingBottom={2}
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "1.8rem",
                  md: "2.3rem",
                  lg: "2.4rem",
                },
              }}
            >
              {success ? cardMessageVictory : cardMessageFail}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                ml: 4,
                mt: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    mr: 1,
                    fontSize: {
                      xs: "1.6rem",
                      sm: "1.6rem",
                      md: "1.8rem",
                      lg: "1.8rem",
                    },
                  }}
                >
                  <strong>Points:</strong>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mr: 1,
                    fontSize: {
                      xs: "1.6rem",
                      sm: "1.6rem",
                      md: "1.8rem",
                      lg: "1.8rem",
                    },
                  }}
                >
                  {Math.round(points) || 0}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                  fontSize: {
                    xs: "1.6rem",
                    sm: "1.6rem",
                    md: "1.8rem",
                    lg: "1.8rem",
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    mr: 1,
                    fontSize: {
                      xs: "1.6rem",
                      sm: "1.6rem",
                      md: "1.8rem",
                      lg: "1.8rem",
                    },
                  }}
                >
                  <strong>Attempts:</strong>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mr: 1,
                    fontSize: {
                      xs: "1.6rem",
                      sm: "1.6rem",
                      md: "1.8rem",
                      lg: "1.8rem",
                    },
                  }}
                >
                  {attempts}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    mr: 1,
                    fontSize: {
                      xs: "1.6rem",
                      sm: "1.6rem",
                      md: "1.8rem",
                      lg: "1.8rem",
                    },
                  }}
                >
                  <strong>Duration:</strong>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mr: 1,
                    fontSize: {
                      xs: "1.6rem",
                      sm: "1.6rem",
                      md: "1.8rem",
                      lg: "1.8rem",
                    },
                  }}
                >
                  {duration ? formatTime(duration) : "0"}
                </Typography>
              </Box>
            </Box>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                setIsFinishCardOpen(false);
                setFinishZeroResponse(undefined);
              }}
              sx={{
                fontSize: { xs: "1.8rem", sm: "2rem", md: "2.2rem" },
                lineHeight: 1.5,
                width: "110px",
                height: "40px",
                color: "#ffc107",
                fontFamily: "teko, sans-serif",
                paddingTop: 1.5,
                margin: 1,
                borderRadius: "6px",
              }}
            >
              FINISH
            </Button>
          </CardActions>
        </Card>
      </Slide>
    </Backdrop>
  );
};
