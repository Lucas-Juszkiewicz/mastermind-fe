import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useContext, useState } from "react";
import { UserAuthContext } from "./UserAuthProvider";

interface AuthMethodsContext {
  redirectToKeycloak: () => void;
  getToken: (authCode: string) => Promise<string>;
  isTokenValid: (tokenExp: number) => boolean;
  checkTokenValidity: (tokenExp: number) => void;
  startCheckingIsTokenValid: () => void;
  refreshAccessToken: () => Promise<void>;
  logOut: () => Promise<void>;
  isGoodbyCardOpen: boolean;
  setIsGoodbyCardOpen: (arg0: boolean) => void;
  nick: string;
}
export const AuthMethodsContext = createContext<AuthMethodsContext | undefined>(
  undefined
);

interface UserAuth {
  id: string;
  nick: string;
  email: string;
  token: string;
  refreshToken: string;
  tokenExp: number;
}

export const AuthMethodsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const userAuthContext = useContext(UserAuthContext);
  if (!userAuthContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }
  const { userAuth, setUserAuth } = userAuthContext;

  const redirectToKeycloak = () => {
    const clientId = "mastermind";
    const redirectUri = encodeURIComponent("http://localhost:3000/home");
    const responseType = "code";
    const scope = encodeURIComponent("openid profile email userId");
    const state = "abcd"; // You can generate a random state for security

    const keycloakUrl = `http://localhost:8080/realms/mastermind/protocol/openid-connect/auth?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;

    // Redirect to Keycloak login
    window.location.href = keycloakUrl;
  };

  const [isGoodbyCardOpen, setIsGoodbyCardOpen] = useState(false);
  const [nick, setNick] = useState("");

  const getToken = async (authCode: string): Promise<string> => {
    let token;
    const configForToken = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const bodyForToken = {
      grant_type: "authorization_code",
      client_id: "mastermind",
      // client_secret: "6FTAYhfizk346qspsVbkItw4ypXwgC93",
      code: authCode,
      redirect_uri: "http://localhost:3000/home",
      scope: "read_custom_scope",
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/realms/mastermind/protocol/openid-connect/token",
        bodyForToken,
        configForToken
      );

      token = response.data.access_token;
      const { preferred_username, email, userId, exp } = jwtDecode(token);
      if (exp) {
        const userAuth = {
          id: userId,
          nick: preferred_username,
          email: email,
          token: response.data.access_token,
          refreshToken: response.data.refresh_token,
          tokenExp: exp,
        };
        await setUserAuth(userAuth);
        setNick(userAuth.nick);
        console.log("getToken: " + userAuth.token);
      }
      if (userAuth.token && userAuth.refreshToken) {
        startCheckingIsTokenValid();
      } else {
        startCheckingIsTokenValid(response.data.refresh_token);
      }
    } catch (error) {
      console.log("Failed to load token: " + error);
    }
    console.log("getToken: " + token);
    return token;
  };

  const isTokenValid = (tokenExp: number) => {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return tokenExp - 1 > currentTime; // Return true if token is still valid
  };

  const checkTokenValidity = (tokenExp: number) => {
    const valid = isTokenValid(tokenExp);

    if (!valid) {
      refreshAccessToken();
    }
  };

  const startCheckingIsTokenValid = (refreshToken?: string) => {
    if (userAuth.refreshToken) {
      refreshAccessToken();
    } else {
      refreshAccessToken(refreshToken);
    }

    // const intervalId = setInterval(checkTokenValidity, 1500000); // Check every 30 seconds
    const intervalId = setInterval(checkTokenValidity, 12000); // Check every 30 seconds
    clearInterval(intervalId);
  };

  const refreshAccessToken = async (refreshToken?: string) => {
    const bodyForRefreshToken = {
      grant_type: "refresh_token",
      client_id: "mastermind",
      // client_secret: "6FTAYhfizk346qspsVbkItw4ypXwgC93",
      refresh_token: userAuth.refreshToken
        ? userAuth.refreshToken
        : refreshToken,
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
      } else {
        console.log("Refreshed UserAuth has not been stored");
      }
      // startCheckingIsTokenValid();
    } catch (error) {
      console.log("Failed to load token: " + error);
      console.log("Refresh token" + userAuth.refreshToken);
    }
  };

  const logOut = async () => {
    const bodyForLogOut = {
      client_id: "mastermind",
      client_secret: "6FTAYhfizk346qspsVbkItw4ypXwgC93",
      refresh_token: userAuth.refreshToken,
    };
    const configForLogOut = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + userAuth.token,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/realms/mastermind/protocol/openid-connect/logout",
        bodyForLogOut,
        configForLogOut
      );
      localStorage.clear();
      setNick(userAuth.nick);
      setIsGoodbyCardOpen(true);
    } catch (error) {
      console.log("Something gonne wrong: " + error);
    }
  };

  return (
    <AuthMethodsContext.Provider
      value={{
        redirectToKeycloak,
        getToken,
        refreshAccessToken,
        isTokenValid,
        checkTokenValidity,
        startCheckingIsTokenValid,
        logOut,
        isGoodbyCardOpen,
        setIsGoodbyCardOpen,
        nick,
      }}
    >
      {children}
    </AuthMethodsContext.Provider>
  );
};

export const useAuthMethods = () => {
  const context = useContext(AuthMethodsContext);
  if (!context) {
    throw new Error("useAuthMethods must be used within an AuthProvider");
  }
  return context;
};
