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
  logOut: () => Promise<void>;
  isGoodbyCardOpen: boolean;
  setIsGoodbyCardOpen: (arg0: boolean) => void;
  nick: string;
  // getUserIdIfNotIncludedIInToken: (nick: string) => void;
}
export const AuthMethodsContext = createContext<AuthMethodsContext | undefined>(
  undefined
);

interface UserAuth {
  userId: string;
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
  const [nick, setNick] = useState("");
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [userIdObtainedAlternatively, setUserIdObtainedAlternatively] =
    useState("-1");
  const [responseWithId, setResponseWithId] =
    useState<AxiosResponse<UserAuth>>();

  const getToken = async (authCode: string): Promise<string> => {
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
      setToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
    } catch (error) {
      console.log("Failed to load token: " + error);
    }

    return token;
  };

  useEffect(() => {
    if (token != "") {
      const { preferred_username, email, userId, exp } = jwtDecode(token);
      console.log(exp);
      if (exp) {
        userAuthObject = {
          userId: userId,
          nick: preferred_username,
          email: email,
          token: token,
          refreshToken: refreshToken,
          tokenExp: exp,
        };
        setUserAuth(userAuthObject);
        setNick(userAuthObject.nick);

        // Here I need to obtain id if it's undefined
        if (userAuthObject.userId == undefined) {
          getUserIdIfNotIncludedIInToken(userAuthObject);
        }
      }
      startCheckingIsTokenValid(refreshToken);
      console.log(userAuth);
    }
  }, [token]);

  const getUserIdIfNotIncludedIInToken = async (userAuthObject: UserAuth) => {
    //get user by nick and get userId
    const config = {
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded",
        "Content-Type": "application/json",
        authorization: `Bearer ${userAuthObject.token}`,
      },
    };
    console.log("userAuthObject token " + userAuthObject.token);
    console.log("userAuthObject nick " + userAuthObject.nick);
    console.log("userAuthObject userAuth " + JSON.stringify(userAuth));
    try {
      const responseWithId: AxiosResponse<UserAuth> = await axios.get(
        `http://localhost:8081/users/${userAuthObject.nick}`,
        config
      );
      setResponseWithId(responseWithId);
    } catch (error) {
      console.log("Failed to obtain ID alternatively: " + error);
    }
  };

  useEffect(() => {
    if (responseWithId != undefined) {
      setUserIdObtainedAlternatively(responseWithId.data.userId);
      console.log("!!!!!!!!!!!!!!!!!!!!!!! " + responseWithId.data.userId);
    }
  }, [responseWithId]);

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
      console.log("userAuthUpdate with ID " + JSON.stringify(userAuthUpdate));
      console.log(
        "userIdObtainedAlternatively userAuth " + JSON.stringify(userAuth)
      );
      console.log(
        "userIdObtainedAlternatively id " + userIdObtainedAlternatively
      );
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
    // const intervalId = setInterval(checkTokenValidity, 1500000); // Check every 30 seconds
    const intervalId = setInterval(checkTokenValidity, 12000); // Check every 30 seconds
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
      console.log("obtainRefreshToken: " + token);
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
        // console.log(userAuth.tokenExp);
        // console.log("Refresh token" + userAuth.refreshToken);
        setUserAuth(userAuthUpdate);
        console.log("Refreshed UserAuth stored" + userAuthUpdate.tokenExp);
      } else {
        console.log("Refreshed UserAuth has not been stored");
      }
    } catch (error) {
      console.log("Failed to load token: " + error);
      console.log("Refreshed UserAuth has not been stored");
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
        // getUserIdIfNotIncludedIInToken,
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
