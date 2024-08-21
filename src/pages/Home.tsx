import { Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useAuthMethods } from "../AuthMethodsProvider";
import { UserAuthContext } from "../UserAuthProvider";
import axios from "axios";

export const Home = () => {
  const {
    redirectToKeycloak,
    getToken,
    refreshAccessToken,
    isTokenValid,
    checkTokenValidity,
    startCheckingIsTokenValid,
  } = useAuthMethods();
  const [authCode, setAuthCode] = useState<string>("");
  const userAuthContext = useContext(UserAuthContext);
  if (!userAuthContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }
  const {
    userAuth,
    setUserAuth,
    fetchGameInProgressAfterRecall,
    checkIfGameInProgresExists,
  } = userAuthContext;

  useEffect(() => {
    const fetchTokenAndCheckUser = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get("code");
      const error = urlParams.get("error");
      const errorDescription = urlParams.get("error_description");
      if (error) {
        console.log("Error: " + error + ", Description: " + errorDescription);
        return;
      }

      if (authCode) {
        setAuthCode(authCode);

        try {
          const token = await getToken(authCode);
          console.log("Retrieved Token: ", token);

          // Now that you have the token, proceed to check the user
          await checkUser(token);
        } catch (tokenError) {
          console.error("Error retrieving token:", tokenError);
        }
      }
    };

    const checkUser = async (tokenFromHere: string) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenFromHere}`,
        },
      };

      try {
        const response = await axios.get(
          `http://localhost:8081/users/checkifexists`,
          config
        );
        console.log("Exists: ", response.data);

        if (response.data) {
          const storedUserAuth = localStorage.getItem("userAuth");
          if (storedUserAuth) {
            const parsedAuth = JSON.parse(storedUserAuth);
            setUserAuth({
              id: response.data.id,
              nick: parsedAuth.nick,
              email: parsedAuth.email,
              token: atob(parsedAuth.token),
              refreshToken: atob(parsedAuth.refreshToken),
              tokenExp: parsedAuth.tokenExp,
            });
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchTokenAndCheckUser();
  }, []);

  useEffect(() => {
    if (userAuth.token) {
      console.log("userAuth Home: " + userAuth.token);
    }
  }, [userAuth]);

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
