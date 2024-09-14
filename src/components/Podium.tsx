import * as React from "react";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";

export const Podium = () => {
  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 10,
        mb: 5, // Margin bottom for spacing from the button
      }}
    >
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {/* First Row */}
        <Grid item xs={2} sm={2} mr={{ xs: 6, md: 2 }}>
          <Paper
            sx={{
              borderRadius: "60px",
              border: "3px solid",
              borderColor: "#3f51b5",
              height: { xs: 80, md: 110 },
              width: { xs: 80, md: 110 },
              backgroundColor: "#e5eafa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition
              "&:hover": {
                transform: "scale(1.1)", // Slightly enlarge on hover
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Add shadow on hover
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Permanent Marker, sans-serif",
                fontSize: { xs: 16, sm: 20 },
                textAlign: "center",
                mb: { xs: -13, md: -16 },
              }}
            >
              Lukas
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={2} sm={2} mr={{ xs: 6, md: 2 }} mt={-7}>
          <Paper
            sx={{
              borderRadius: "60px",
              border: "3px solid",
              borderColor: "#ffc107",
              height: { xs: 80, md: 110 },
              width: { xs: 80, md: 110 },
              backgroundColor: "#e5eafa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Permanent Marker, sans-serif",
                fontSize: { xs: 16, sm: 20 },
                textAlign: "center",
                mb: { xs: -13, md: -16 },
              }}
            >
              James
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={2} sm={2} mr={{ xs: 6, md: 2 }}>
          <Paper
            sx={{
              borderRadius: "60px",
              border: "3px solid",
              borderColor: "#3f51b5",
              height: { xs: 80, md: 110 },
              width: { xs: 80, md: 110 },
              backgroundColor: "#e5eafa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Permanent Marker, sans-serif",
                fontSize: { xs: 16, sm: 20 },
                textAlign: "center",
                mb: { xs: -13, md: -16 },
              }}
            >
              Wolfgang
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Second Row */}
      <Grid container spacing={2} sx={{ mt: 0.5, justifyContent: "center" }}>
        <Grid item xs={2} sm={2} mr={{ xs: 6, md: 2 }}>
          <Paper
            sx={{
              height: { xs: 80, md: 90 },
              width: { xs: 80, md: 110 },
              backgroundColor: "#e5eafa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                pt: 1,
                fontSize: { xs: 60, md: 70 },
                textAlign: "center",
              }}
            >
              2
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={2} sm={2} mr={{ xs: 6, md: 2 }} mt={-7}>
          <Paper
            sx={{
              height: { xs: 80, md: 90 },
              width: { xs: 80, md: 110 },
              backgroundColor: "#e5eafa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                pt: 1,
                fontSize: { xs: 60, md: 70 },
                textAlign: "center",
              }}
            >
              1
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={2} sm={2} mr={{ xs: 6, md: 2 }}>
          <Paper
            sx={{
              height: { xs: 80, md: 90 },
              width: { xs: 80, md: 110 },
              backgroundColor: "#e5eafa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                pt: 1,
                fontSize: { xs: 60, md: 70 },
                textAlign: "center",
              }}
            >
              3
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
