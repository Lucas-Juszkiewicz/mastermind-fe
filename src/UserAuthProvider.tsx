import axios from "axios";
import React, { createContext, useState } from "react";
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

  const fetchGameInProgressAfterRecall = async (token: string) => {
    const config = {
      headers: {
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
