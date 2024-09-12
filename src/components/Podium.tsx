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
        my: 10, // Margin bottom for spacing from the button
      }}
    >
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {/* First Row */}
        <Grid item xs={4} sm={2}>
          <Paper
            sx={{
              height: { xs: 70, md: 90 },
              width: { xs: 70, md: 110 },
              backgroundColor: "#e5eafa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Permanent Marker, sans-serif",
                fontSize: { xs: 15, sm: 20 },
                textAlign: "center",
              }}
            >
              Lukas
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4} sm={2} mt={-7}>
          <Paper
            sx={{
              height: { xs: 70, md: 90 },
              width: { xs: 70, md: 110 },
              backgroundColor: "#e5eafa",
            }}
          />
        </Grid>
        <Grid item xs={4} sm={2}>
          <Paper
            sx={{
              height: { xs: 70, md: 90 },
              width: { xs: 70, md: 110 },
              backgroundColor: "#e5eafa",
            }}
          />
        </Grid>
      </Grid>

      {/* Second Row */}
      <Grid container spacing={2} sx={{ mt: 0.5, justifyContent: "center" }}>
        <Grid item xs={4} sm={2}>
          <Paper
            sx={{
              height: { xs: 70, md: 90 },
              width: { xs: 70, md: 110 },
              backgroundColor: "#e5eafa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 50, md: 70 },
                textAlign: "center",
              }}
            >
              2
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4} sm={2} mt={-7}>
          <Paper
            sx={{
              height: { xs: 70, md: 90 },
              width: { xs: 70, md: 110 },
              backgroundColor: "#e5eafa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 50, md: 70 },
                textAlign: "center",
              }}
            >
              1
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4} sm={2}>
          <Paper
            sx={{
              height: { xs: 70, md: 90 },
              width: { xs: 70, md: 110 },
              backgroundColor: "#e5eafa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 50, md: 70 },
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
