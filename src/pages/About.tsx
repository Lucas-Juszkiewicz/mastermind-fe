import { Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const About = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "20px auto",
        p: "56px",
        maxWidth: "800px",
        backgroundColor: "#f3f4f6",
        borderRadius: "6px",
        border: "1px solid #ddd",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{
          fontFamily: "Permanent Marker, sans-serif",
          color: "#3f51b5",
          lineHeight: 1.2,
          letterSpacing: "0.05em",
          mb: 3,
        }}
      >
        Technical informations
      </Typography>
      <Typography
        variant="body2"
        paragraph
        sx={{
          mt: "50px",
          mx: {
            xs: "0px",
            md: "80px",
          },
        }}
      >
        <strong>Backend:</strong> Java, Spring Boot
      </Typography>
      <Typography
        variant="body2"
        paragraph
        sx={{
          mt: "-5px",
          mx: {
            xs: "0px",
            md: "80px",
            textAlign: "left",
          },
        }}
      >
        <strong>Frontend:</strong> TypeScript, React, Material-UI
      </Typography>
      <Typography
        variant="body2"
        paragraph
        sx={{
          mt: "-5px",
          mx: {
            xs: "0px",
            md: "80px",
            textAlign: "left",
          },
        }}
      >
        <strong>Database:</strong> MySQL
      </Typography>
      <Typography
        variant="body2"
        paragraph
        sx={{
          mt: "-5px",
          mx: {
            xs: "0px",
            md: "80px",
            textAlign: "left",
          },
        }}
      >
        <strong>Authentication:</strong> Keycloak, OAuth
      </Typography>
      <Typography
        variant="body2"
        paragraph
        sx={{
          mt: "-5px",
          mx: {
            xs: "0px",
            md: "80px",
            textAlign: "left",
          },
        }}
      >
        <strong>Database Management:</strong> Flyway
      </Typography>
      <Typography
        variant="body2"
        paragraph
        sx={{
          mt: "-5px",
          mx: {
            xs: "0px",
            md: "80px",
            textAlign: "left",
          },
        }}
      >
        <strong>Version Control:</strong> Git
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 10,
          alignSelf: { xs: "center" },
          backgroundColor: "#3f51b5",
          color: "#ffc107",
          "&:hover": {
            backgroundColor: "#3f52c6",
          },
        }}
        onClick={handleBack}
      >
        BACK
      </Button>
    </Paper>
  );
};
