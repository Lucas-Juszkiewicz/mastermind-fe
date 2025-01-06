import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserAuthContext } from "./UserAuthProvider";

interface AuthMethodsContext {
  redirectToKeycloak: () => void;
  getToken: (authCode: string) => Promise<string>;
  isTokenValid: (tokenExp: number) => boolean;
  checkTokenValidity: (tokenExp: number) => void;
  startCheckingIsTokenValid: () => void;
  refreshAccessToken: (refreshToken: string) => Promise<void>;
  logOut: (isItAutomaticLogoout: boolean) => Promise<void>;
  isGoodbyCardOpen: boolean;
  setIsGoodbyCardOpen: (arg0: boolean) => void;
  isAutomaticLogoutCardOpen: boolean;
  setIsAutomaticLogoutCardOpen: (arg0: boolean) => void;
  nick: string;
}
export const AuthMethodsContext = createContext<AuthMethodsContext | undefined>(
  undefined
);

interface UserAuth {
  userId: string;
  nick: string;
  email: string;
  country: string;
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
  const { userAuth, setUserAuth, checkUser } = userAuthContext;
  let userAuthObject = userAuth;

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
  const [isAutomaticLogoutCardOpen, setIsAutomaticLogoutCardOpen] =
    useState(false);
  const [nick, setNick] = useState("");
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [userIdObtainedAlternatively, setUserIdObtainedAlternatively] =
    useState("-1");

  const getToken = async (authCode: string): Promise<string> => {
    const configForToken = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const bodyForToken = {
      grant_type: "authorization_code",
      client_id: "mastermind",
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
      setToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
    } catch (error) {
      console.log("Failed to load token: " + error);
    }

    return token;
  };

  useEffect(() => {
    const processToken = async () => {
      if (token !== "") {
        const { preferred_username, email, userId, exp } = jwtDecode(token);
        setNick(preferred_username);
        let userIdFromToken = userId;

        // Fetch userId from the database if it's not present in the token
        if (!userId) {
          await checkUser(token, refreshToken);
        } else {
          if (exp) {
            setUserAuth({
              userId: userIdFromToken,
              nick: preferred_username,
              email: email,
              country: "",
              token: token,
              refreshToken: refreshToken,
              tokenExp: exp,
            });
          }
        }

        startCheckingIsTokenValid(refreshToken);
      }
    };
    processToken();
  }, [token]);

  useEffect(() => {
    if (
      userIdObtainedAlternatively != "-1" &&
      userIdObtainedAlternatively != undefined
    ) {
      const userAuthUpdate = {
        ...userAuth,
        userId: userIdObtainedAlternatively,
      };
      setUserAuth(userAuthUpdate);
    }
  }, [userIdObtainedAlternatively]);

  const isTokenValid = (tokenExp: number) => {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return tokenExp - 1 > currentTime; // Return true if token is still valid
  };

  const checkTokenValidity = () => {
    const valid = isTokenValid(userAuth.tokenExp);
    if (!valid) {
      refreshAccessToken(userAuth.refreshToken);
    }
  };

  const startCheckingIsTokenValid = (refreshToken?: string) => {
    const intervalId = setInterval(checkTokenValidity, 300000); // Check every 5 min
    clearInterval(intervalId);
  };

  const refreshAccessToken = async (refreshToken: string) => {
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
      const { preferred_username, email, exp } = jwtDecode(token);
      if (exp) {
        const userAuthUpdate: UserAuth = {
          ...userAuth,
          nick: preferred_username,
          email: email,
          token: response.data.access_token,
          refreshToken: response.data.refresh_token,
          tokenExp: exp,
        };
        setUserAuth(userAuthUpdate);
      } else {
        console.log("Refreshed UserAuth has not been stored");
      }
    } catch (error) {
      console.log("Failed to load token: " + error);
      console.log("Refreshed UserAuth has not been stored");
    }
  };

  const logOut = async (isItAutomaticLogoout: boolean) => {
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
      setUserAuth({
        userId: "",
        nick: "",
        email: "",
        country: "",
        token: "",
        refreshToken: "",
        tokenExp: -1,
      });
      if (isItAutomaticLogoout) {
        setIsAutomaticLogoutCardOpen(true);
      } else {
        setIsGoodbyCardOpen(true);
      }
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
        isAutomaticLogoutCardOpen,
        setIsAutomaticLogoutCardOpen,
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
