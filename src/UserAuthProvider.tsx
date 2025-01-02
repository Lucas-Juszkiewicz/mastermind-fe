import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useGameData } from "./GameDataProvider";
import { jwtDecode } from "jwt-decode";

interface UserAuth {
  userId: string;
  nick: string;
  email: string;
  country: string;
  token: string;
  refreshToken: string;
  tokenExp: number;
}

const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { gameData, setGameData } = useGameData();

  const [userAuth, setUserAuth] = useState<UserAuth>({
    userId: "",
    nick: "",
    email: "",
    country: "",
    token: "",
    refreshToken: "",
    tokenExp: -1,
  });

  useEffect(() => {
    console.log("From userAuth " + JSON.stringify(userAuth));
  }, [userAuth]);

  // Decode the token when retrieving it from localStorage
  // useEffect(() => {
  //   const storedUserAuth = localStorage.getItem("userAuth");
  //   if (storedUserAuth) {
  //     const parsedAuth = JSON.parse(storedUserAuth);

  //     const decodedAuth = {
  //       ...parsedAuth,
  //       id: parsedAuth.userId,
  //       token: atob(parsedAuth.token),
  //       refreshToken: atob(parsedAuth.refreshToken),
  //     };

  //     setUserAuth(decodedAuth);
  //     if (localStorage.getItem("isGameInProgress") != null) {
  //       console.log("Get GIP token: " + decodedAuth.token);
  //       console.log("Get GIP refreshToken: " + decodedAuth.refreshToken);
  //       fetchGameInProgressAfterRecall(decodedAuth.token);
  //     }
  //   }
  // }, []);

  // Encode the token before storing it in localStorage
  // useEffect(() => {
  //   if (userAuth.token) {
  //     const encodedAuth = {
  //       ...userAuth,
  //       id: userAuth.id,
  //       token: btoa(userAuth.token),
  //       refreshToken: btoa(userAuth.refreshToken),
  //     };

  //     localStorage.setItem("userAuth", JSON.stringify(encodedAuth));
  //   }
  // }, [userAuth]);

  const fetchGameInProgressAfterRecall = async (token: string) => {
    const config = {
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `http://localhost:8081/gameinprogress/get`,
        config
      );
      setGameData(response.data);
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
      return response.data.doesExists;
    } catch (error) {
      console.error("Failed to load Game in progress:", error);
    }
  };

  // const refreshAccessToken = async (refreshToken: string) => {
  //   const bodyForRefreshToken = {
  //     grant_type: "refresh_token",
  //     client_id: "mastermind",
  //     // client_secret: "6FTAYhfizk346qspsVbkItw4ypXwgC93",
  //     refresh_token: refreshToken,
  //     // redirect_uri: "http://localhost:3000/home",
  //     // scope: "read_custom_scope",
  //   };
  //   const configForToken = {
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   };

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/realms/mastermind/protocol/openid-connect/token",
  //       bodyForRefreshToken,
  //       configForToken
  //     );

  //     const token = response.data.access_token;
  //     const { preferred_username, email, exp } = jwtDecode(token);
  //     if (exp) {
  //       const userAuthUpdate: UserAuth = {
  //         id: userAuth.id,
  //         nick: preferred_username,
  //         email: email,
  //         token: response.data.access_token,
  //         refreshToken: response.data.refresh_token,
  //         tokenExp: exp,
  //       };
  //       console.log("userAuthUpdate token exp " + userAuthUpdate.tokenExp);
  //       setUserAuth(userAuthUpdate);
  //       return userAuthUpdate.token;
  //     } else {
  //       console.log("Refreshed UserAuth has not been stored");
  //     }
  //     // startCheckingIsTokenValid();
  //   } catch (error) {
  //     console.log("Failed to load token: " + error);
  //     console.log("Refresh token" + userAuth.refreshToken);
  //   }
  // };

  const checkUser = async (
    tokenFromHere: string,
    refreshToken: string
  ): Promise<string | null> => {
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
      const { preferred_username, email, exp } = jwtDecode(tokenFromHere);

      if (exp) {
        setUserAuth({
          userId: response.data.id,
          nick: preferred_username,
          email: email,
          country: response.data.country,
          token: tokenFromHere,
          refreshToken: refreshToken,
          tokenExp: exp,
        });
      }

      return response.data.userId;
    } catch (err) {
      console.error("Error fetching user data:", err);
      return null;
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        userAuth,
        setUserAuth,
        fetchGameInProgressAfterRecall,
        checkIfGameInProgresExists,
        checkUser,
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
      checkUser: (
        tokenFromHere: string,
        refreshToken: string
      ) => Promise<string | null>;
    }
  | undefined
>(undefined);

export { UserAuthProvider, UserAuthContext };
