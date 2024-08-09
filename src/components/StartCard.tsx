import {
  Backdrop,
  Slide,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import success_img from "../assets/success_img.png";

interface StartCardProps {
  isStartCardOpen: boolean;
  setIsStartCardOpen: Function;
  setIsClockStart: Function;
}

export const StartCard: React.FC<StartCardProps> = ({
  setIsStartCardOpen,
  isStartCardOpen,
  setIsClockStart,
}) => {
  return (
    <Backdrop
      aria-hidden="false"
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isStartCardOpen}
      // onClick={handleClose}
    >
      <Slide
        timeout={{ appear: 500, enter: 300, exit: 500 }}
        direction="up"
        in={isStartCardOpen}
        mountOnEnter
        unmountOnExit
      >
        <Card sx={{ maxWidth: 345, borderRadius: "6px", position: "relative" }}>
          <CardMedia
            sx={{ height: 170, position: "relative" }}
            image={success_img}
            title="error_img"
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
                fontSize: { xs: "1.8rem", sm: "1.8rem", md: "2.3rem" },
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                letterSpacing: "0.15em",
              }}
            >
              Are you redy?
            </Typography>
          </CardMedia>
          <CardContent>
            <Typography variant="body1" align="center" paddingTop={2.5}>
              When you click START, the countdown will begin. You have 20
              minutes to break the code.
            </Typography>
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
                setIsStartCardOpen(false);
                setIsClockStart(true);
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
              START
            </Button>
          </CardActions>
        </Card>
      </Slide>
    </Backdrop>
  );
};
