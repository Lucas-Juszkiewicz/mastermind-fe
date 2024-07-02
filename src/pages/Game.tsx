import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { SingleRound } from "../components";

export const Game = () => {
  const renderRounds = () => {
    const rounds = [];
    for (let i = 0; i < 12; i++) {
      rounds.push(
        <Grid key={i}>
          <SingleRound />
        </Grid>
      );
    }
    return rounds;
  };

  return (
    <Paper
      elevation={3}
      sx={{
        margin: "20px auto", // Center the Paper with margin
        p: "20px",
        maxWidth: "800px", // Set a maximum width for better readability
        backgroundColor: "#f3f4f6", // Light background color
        borderRadius: "6px", // Rounded corners
        border: "1px solid #ddd",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 1 }}
        ></Grid>
        {renderRounds()}
      </Box>
    </Paper>
  );
};
