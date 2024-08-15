import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthMethods } from "../AuthMethodsProvider";


export const Home = () => {
  const { redirectToKeycloak, getToken, refreshAccessToken, isTokenValid, checkTokenValidity, startCheckingIsTokenValid } = useAuthMethods();
  const [authCode, setAuthCode] = useState<string>("");
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode: string | null = urlParams.get("code"),
      state = urlParams.get("state"),
      error = urlParams.get("error"),
      errorDescription = urlParams.get("error_description");

    if (error) {
      console.log(
        "Name of error: " + error + "Description: " + errorDescription
      );
    } else {
      console.log("State: " + state + "Auth code: " + authCode);
      if (authCode != null) {
        setAuthCode(authCode);
        getToken(authCode);
      }
    }
  }, []);
  return (
    <Paper
      elevation={3}
      sx={{
        margin: "20px auto", // Center the Paper with margin
        p: "56px",
        maxWidth: "800px", // Set a maximum width for better readability
        backgroundColor: "#f3f4f6", // Light background color
        borderRadius: "6px", // Rounded corners
        border: "1px solid #ddd",
      }}
    >
      <Typography variant="body2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
        maiores, ducimus aspernatur dolores adipisci eaque incidunt dolore
        veritatis, sunt inventore suscipit nemo, libero ab optio aliquid!
        Laboriosam accusamus id neque atque harum tempora commodi. Enim illum
        suscipit quaerat reiciendis, fugiat modi voluptatibus veritatis
        repellat. Veniam, eveniet sit ab ducimus impedit aut in odit vero
        voluptate voluptates recusandae culpa aliquid dignissimos repellat quia
        illo repellendus dolorem perferendis, quam quos perspiciatis numquam ex.
        Incidunt eligendi non tenetur excepturi ipsum minima saepe rerum
        voluptate cumque eius qui, quas dolorum esse corporis assumenda aliquam
        placeat libero harum cupiditate eveniet impedit. Voluptate eveniet
        magnam optio!
      </Typography>
    </Paper>
  );
};
