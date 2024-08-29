import { useContext, useEffect } from "react";
import { useAuthMethods } from "../AuthMethodsProvider";
import { useGameData } from "../GameDataProvider";
import { UserAuthContext } from "../UserAuthProvider";
import { useNavigate } from "react-router-dom";

export const GlobalLoginChecker = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const {
        redirectToKeycloak,
        getToken,
        refreshAccessToken,
        isTokenValid,
        checkTokenValidity,
        logOut,
        startCheckingIsTokenValid,
      } = useAuthMethods();
      const { gameData, setGameData } = useGameData();
      const userAuthContext = useContext(UserAuthContext);
      const navigate = useNavigate();
      if (!userAuthContext) {
        throw new Error("useContext must be used within an AuthProvider");
      }
      const { userAuth } = userAuthContext;
      console.log("Document clicked", event);

      checkTokenValidity(userAuth.tokenExp);
      if (!isTokenValid(userAuth.tokenExp)) {
        logOut(true);
        navigate("/home");
      }
    };

    // Add the event listener to the document
    document.addEventListener("click", handleClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return <div>GlobalLoginChecker</div>;
};
