import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export const ContinueButton = () => {
  return (
    <div>
      <Button
        // onClick={setIsFinishCardOpen(true)}
        component={Link}
        to="/game"
        variant="contained"
        sx={{
          padding: {
            xs: "1px",
            sm: "1px",
            md: "1px",
            lg: "1px",
            xl: "1px",
          },
          height: {
            xs: 33,
            sm: 45,
            md: 50,
            lg: 45,
            xl: 50,
          },
          width: {
            xs: 70,
            sm: 93,
            md: 102,
            lg: 100,
            xl: 90,
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: 18,
              sm: 18,
              md: 20,
              lg: 26,
              xl: 24,
            },
            height: {
              xs: 40,
              sm: 45,
              md: 50,
              lg: 45,
              xl: 50,
            },
            width: {
              xs: 70,
              sm: 93,
              md: 102,
              lg: 100,
              xl: 90,
            },
            color: "#ffc107",
            pt: {
              xs: 2.5,
              sm: 93,
              md: 102,
              lg: 1.7,
              xl: 1.7,
            },
            pb: "auto",
            margin: 0,
            textAlign: "center",
          }}
        >
          NEW GAME
        </Typography>
      </Button>
    </div>
  );
};
