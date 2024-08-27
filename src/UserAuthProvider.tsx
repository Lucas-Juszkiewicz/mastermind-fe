import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useGameData } from "./GameDataProvider";
import { jwtDecode } from "jwt-decode";

interface UserAuth {
  id: string;
  nick: string;
  email: string;
  token: string;
  refreshToken: string;
  tokenExp: number;
}

const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { gameData, setGameData } = useGameData();

  const [userAuth, setUserAuth] = useState<UserAuth>({
    id: "",
    nick: "",
    email: "",
    token: "",
    refreshToken: "",
    tokenExp: -1,
  });

  // Decode the token when retrieving it from localStorage
  useEffect(() => {
    const storedUserAuth = localStorage.getItem("userAuth");
    if (storedUserAuth) {
      const parsedAuth = JSON.parse(storedUserAuth);

      const decodedAuth = {
        ...parsedAuth,
        id: parsedAuth.userId,
        token: atob(parsedAuth.token),
        refreshToken: atob(parsedAuth.refreshToken),
      };

      setUserAuth(decodedAuth);
      if (localStorage.getItem("isGameInProgress") != null) {
        console.log("Get GIP token: " + decodedAuth.token);
        console.log("Get GIP refreshToken: " + decodedAuth.refreshToken);
        fetchGameInProgressAfterRecall(decodedAuth.token);
      }
    }
  }, []);

  // Encode the token before storing it in localStorage
  useEffect(() => {
    if (userAuth.token) {
      const encodedAuth = {
        ...userAuth,
        id: userAuth.id,
        token: btoa(userAuth.token),
        refreshToken: btoa(userAuth.refreshToken),
      };

      localStorage.setItem("userAuth", JSON.stringify(encodedAuth));
    }
  }, [userAuth]);

  const fetchGameInProgressAfterRecall = async (token: string) => {
    const config = {
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded",
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    };
    try {
      const response = await axios.get(
        `http://localhost:8081/gameinprogress/get`,
        config
      );
      setGameData(response.data);
      console.log(response.data.previousGuesses);
    } catch (error) {
      console.error("Failed to load Game in progress:", error);
    }
  };

  const checkIfGameInProgresExists = async (token: string) => {
    const config = {
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded",
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    };
    try {
      const response = await axios.get(
        `http://localhost:8081/gameinprogress/checkifexists`,
        config
      );
      console.log("doesExists: " + response.data.doesExists);
      return response.data.doesExists;
    } catch (error) {
      console.error("Failed to load Game in progress:", error);
    }
  };

  const refreshAccessToken = async (refreshToken: string) => {
    console.log("Refresh token before: " + userAuth.refreshToken);
    const bodyForRefreshToken = {
      grant_type: "refresh_token",
      client_id: "mastermind",
      // client_secret: "6FTAYhfizk346qspsVbkItw4ypXwgC93",
      refresh_token: refreshToken,
      // redirect_uri: "http://localhost:3000/home",
      // scope: "read_custom_scope",
    };
    const configForToken = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/realms/mastermind/protocol/openid-connect/token",
        bodyForRefreshToken,
        configForToken
      );

      const token = response.data.access_token;
      const { preferred_username, email, userId, exp } = jwtDecode(token);
      if (exp) {
        const userAuth: UserAuth = {
          id: userId,
          nick: preferred_username,
          email: email,
          token: response.data.access_token,
          refreshToken: response.data.refresh_token,
          tokenExp: exp,
        };
        console.log(userAuth.tokenExp);
        console.log("Refresh token" + userAuth.refreshToken);
        setUserAuth(userAuth);
        console.log("Refreshed UserAuth stored" + userAuth.tokenExp);

        return userAuth.token;
      } else {
        console.log("Refreshed UserAuth has not been stored");
      }
      // startCheckingIsTokenValid();
    } catch (error) {
      console.log("Failed to load token: " + error);
      console.log("Refresh token" + userAuth.refreshToken);
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        userAuth,
        setUserAuth,
        fetchGameInProgressAfterRecall,
        checkIfGameInProgresExists,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

const UserAuthContext = createContext<
  | {
      userAuth: UserAuth;
      setUserAuth: React.Dispatch<React.SetStateAction<UserAuth>>;
      fetchGameInProgressAfterRecall: (token: string) => Promise<void>;
      checkIfGameInProgresExists: (token: string) => Promise<boolean>;
    }
  | undefined
>(undefined);

export { UserAuthProvider, UserAuthContext };
