import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useAuthMethods } from "../AuthMethodsProvider";
import { UserAuthContext } from "../UserAuthProvider";
import { useContext, useEffect } from "react";
import axios from "axios";
import { config } from "process";
import { AnswerAndClock } from "./AnswerAndClock";

interface MenuProps {
  setFinishZeroResponse: Function;
}

export const Menu: React.FC<MenuProps> = ({ setFinishZeroResponse }) => {
  const [open, setOpen] = React.useState(false);
  const [shouldShowThisItem, setShouldShowThisItem] = React.useState(false);
  const [shouldShowNewGameButton, setShouldShowNewGameButton] =
    React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const { nick } = useAuthMethods();
  const userAuthContext = useContext(UserAuthContext);
  const navigate = useNavigate();
  const {
    redirectToKeycloak,
    getToken,
    refreshAccessToken,
    isTokenValid,
    checkTokenValidity,
    startCheckingIsTokenValid,
    logOut,
  } = useAuthMethods();
  if (!userAuthContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }
  const {
    userAuth,
    setUserAuth,
    fetchGameInProgressAfterRecall,
    checkIfGameInProgresExists,
  } = userAuthContext;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const location = useLocation();

  const isNotOnGamePage = location.pathname !== "/game";

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // zrobić useState do shouldShowThisItem i dodać zależność na podstawie byćia w trakcie gry. jeśli gra jest w trakcie to 'New game'

  const userId = userAuth.userId;

  // const shouldShowThisItem = userId != "" ? true : false;
  const handleOnClickNewGame = () => {
    // navigate("/preStarter");
    checkTokenValidity(userAuth.tokenExp);
    if (!isTokenValid(userAuth.tokenExp)) {
      logOut(true);
      // navigate("/preStarter");
      navigate("/home");
    }
    const endGameToStartNewGame = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + userAuth.token,
        },
      };
      try {
        const endGameResponse = await axios.get(
          `http://localhost:8081/gameinprogress/endgame/${userAuth.userId}`,
          config
        );
        setFinishZeroResponse(endGameResponse.data);
        // localStorage.removeItem("isGameInProgress");
        navigate("/preStarter");
      } catch (error) {}
    };
    endGameToStartNewGame();
  };

  useEffect(() => {
    if (userId != "") {
      setShouldShowThisItem(true);
    } else {
      setShouldShowThisItem(false);
    }
  }, [userAuth]);

  useEffect(() => {
    if (localStorage.getItem("isGameInProgress")) {
      setShouldShowNewGameButton(true);
    } else {
      setShouldShowNewGameButton(false);
    }
  }, [open]);
  const myAccountButtonText = nick.length < 1 || nick.length > 7 ? "Me" : nick;

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <IconButton
          // size="large"
          edge="start"
          // color="inherit"
          aria-label="menu"
          sx={{
            mr: 2,
          }}
          onClick={handleToggle}
          ref={anchorRef}
        >
          <Typography
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
              color: "#ffca28",
              fontFamily: "teko, sans-serif",
              fontSize: {
                xs: "1rem",
                sm: "1.8rem",
                md: "3.3rem",
                lg: "2.35rem",
                xl: "2.9rem",
              },
            }}
          >
            Menu
          </Typography>
          <MenuIcon
            sx={{
              pb: "10px",
              color: "#ffca28",
              fontSize: { xs: "1.8rem", sm: "1.5rem", md: "2.3rem" },
              display: { xs: "block", sm: "none" },
            }}
          />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          style={{ zIndex: 1500 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper
                sx={{
                  backgroundColor: "#f3f4f6",
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {shouldShowThisItem && isNotOnGamePage ? (
                      <MenuItem
                        component={Link}
                        to="/game"
                        onClick={handleClose}
                      >
                        Game
                      </MenuItem>
                    ) : null}{" "}
                    {shouldShowThisItem && shouldShowNewGameButton ? (
                      <MenuItem
                        // component={Link}
                        // to="/game"
                        onClick={(event) => {
                          handleClose(event);
                          handleOnClickNewGame();
                        }}
                      >
                        New Game
                      </MenuItem>
                    ) : null}
                    <MenuItem component={Link} to="/home" onClick={handleClose}>
                      Home
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/ranking"
                      onClick={handleClose}
                    >
                      Ranking
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/rules"
                      onClick={handleClose}
                    >
                      Rules
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/about"
                      onClick={handleClose}
                    >
                      Tech info
                    </MenuItem>
                    {shouldShowThisItem && (
                      <MenuItem
                        component={Link}
                        to="/user"
                        onClick={handleClose}
                        sx={{
                          fontFamily: "Permanent Marker, sans-serif",
                          fontSize: 26,
                          mt: -1,
                        }}
                      >
                        {myAccountButtonText}
                      </MenuItem>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
};
