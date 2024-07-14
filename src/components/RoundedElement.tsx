import React, { useEffect, useState } from "react";
import { Box, Fade, Menu, Typography, darken } from "@mui/material";
import { IndeterminateCheckBoxRounded } from "@mui/icons-material";

interface RoundedElementProps {
  color: string;
  size: number;
  active?: boolean;
  activeSize?: number;
  fatherIndex?: number;
  sendGuess?: Function;
  previousGuess?: number | null | undefined;
  colorGreenYellow: string;
  isThisResponse: Boolean;
  answer?: Boolean;
  answerColor?: string;
  answerNumber?: number;
}

const numbers = [
  { number: 1, color: "#ffeb3b", hoverColor: "#ffe082" }, // yellow
  { number: 2, color: "#ff5722", hoverColor: "#ff7043" }, // deep orange
  { number: 3, color: "#4caf50", hoverColor: "#66bb6a" }, // green
  { number: 4, color: "#00bcd4", hoverColor: "#4dd0e1" }, // cyan
  { number: 5, color: "#ff9800", hoverColor: "#ffb74d" }, // orange
  { number: 6, color: "#e91e63", hoverColor: "#ec407a" }, // pink
  { number: 7, color: "#84ffff", hoverColor: "#a7d7f1" }, // deep purple
  { number: 8, color: "#ffff8d", hoverColor: "#fff176" }, // indigo
  { number: 9, color: "#2196f3", hoverColor: "#64b5f6" }, // blue
  { number: 10, color: "#b388ff", hoverColor: "#d1c4e9" }, // purple
];

export const RoundedElement: React.FC<RoundedElementProps> = ({
  color,
  size,
  active,
  fatherIndex,
  sendGuess,
  previousGuess,
  colorGreenYellow,
  isThisResponse,
  answer,
  answerColor,
  answerNumber,
}) => {
  const positionX =
    fatherIndex !== undefined ? getValueBasedOnIndex(fatherIndex) : 0;

  interface DotValue {
    number: number;
    color: string;
    hoverColor: string;
  }
  const blank = {
    number: 0,
    color: "#e8eaf6",
    hoverColor: "#dfe2ed",
  };
  const [dotValue, setDotValue] = useState<DotValue>(blank);
  // function getValueBasedOnIndex(index: number): object {
  //   console.log(index);
  //   switch (index) {
  //     case 0:
  //       return {
  //         xs: "-5px",
  //         sm: "-10px",
  //         md: "-10px",
  //         lg: "-10px",
  //         xl: "-10px",
  //       };
  //     case 1:
  //       return { xs: "2px", sm: "1px", md: "1px", lg: "1px", xl: "0.5px" };
  //     case 2:
  //       return { xs: "2px", sm: "1px", md: "1px", lg: "1px", xl: "0.5px" };
  //     case 3:
  //       return { xs: "2px", sm: "1px", md: "1px", lg: "1px", xl: "0.5px" };
  //     case 4:
  //       return { xs: "2px", sm: "1px", md: "1px", lg: "1px", xl: "0.5px" };
  //     case 5:
  //       return { xs: "2px", sm: "1px", md: "1px", lg: "1px", xl: "0.5px" };
  //     case 6:
  //       return { xs: "2px", sm: "1px", md: "1px", lg: "1px", xl: "0.5px" };
  //     case 7:
  //       return { xs: "2px", sm: "1px", md: "1px", lg: "1px", xl: "0.5px" };
  //     default:
  //       return { xs: "2px", sm: "1px", md: "1px", lg: "1px", xl: "0.5px" }; // Default case if index is out of specified range
  //   }
  // }

  function getValueBasedOnIndex(index: number): object {
    switch (index) {
      case 0:
        return {
          verySmall: "0%",
          xs: "0%",
          sm: "0%",
          md: "0%",
          lg: "0.5%",
          xl: "0.5%",
        };
      case 1:
        return {
          verySmall: "-1%",
          xs: "-6%",
          sm: "-3%",
          md: "-2.5%",
          lg: "-2%",
          xl: "-1%",
        };
      case 2:
        return {
          verySmall: "-2%",
          xs: "-6%",
          sm: "-8%",
          md: "-6%",
          lg: "-4.5%",
          xl: "-2.25%",
        };
      case 3:
        return {
          verySmall: "-2.5%",
          xs: "-6%",
          sm: "-13%",
          md: "-9.5%",
          lg: "-7.2%",
          xl: "-3.6%",
        };
      case 4:
        return {
          verySmall: "-2.5%",
          xs: "-6%",
          sm: "-18%",
          md: "-12.5%",
          lg: "-10%",
          xl: "-5%",
        };
      case 5:
        return {
          verySmall: "-2.2%",
          xs: "-6.5%",
          sm: "-22%",
          md: "-16%",
          lg: "-12.7%",
          xl: "-6.35%",
        };
      case 6:
        return {
          verySmall: "-2.2%",
          xs: "-6.6%",
          sm: "-23%",
          md: "-19.5%",
          lg: "-15.5%",
          xl: "-7.75%",
        };
      case 7:
        return {
          verySmall: "-2.2%",
          xs: "-6.7%",
          sm: "-23%",
          md: "-22.8%",
          lg: "-18.1%",
          xl: "-9.05%",
        };
      default:
        return {
          verySmall: "0%",
          xs: "22%",
          sm: "1%",
          md: "1%",
          lg: "1%",
          xl: "0.5%",
        };
    }
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let guess: (number | undefined)[] = new Array(8);

  const colorToUse =
    previousGuess !== undefined &&
    previousGuess !== null &&
    numbers[previousGuess - 1] !== undefined &&
    numbers[previousGuess - 1] !== null
      ? numbers[previousGuess - 1].color
      : answerColor
      ? answerColor
      : color;

  const numberToUse =
    previousGuess !== undefined &&
    previousGuess !== null &&
    numbers[previousGuess - 1] !== undefined
      ? numbers[previousGuess - 1].number
      : answerNumber
      ? answerNumber
      : "";

  return (
    <>
      {active ? (
        <div>
          {" "}
          <Box
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: dotValue.color,
              display: "inline-block flex",
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically
              margin: 0.1,
              marginRight: 0.5,
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.35)",
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
                backgroundColor: darken(color, 0.1),
              },
            }}
          >
            <Typography paddingTop={0.6}>
              {dotValue.number === 0 ? "" : dotValue.number}
            </Typography>
          </Box>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
            sx={{
              top: {
                verySmall: -55,
                xs: -90,
                sm: -90,
                md: -90,
                lg: -85,
                xl: -100,
              },
              left: positionX,
              zIndex: 1,
              "& .MuiPaper-root": {
                borderRadius: "20px",
                padding: "8px",
                background:
                  "radial-gradient(circle, rgba(63, 81, 181, 0.8), rgba(26, 35, 126, 0.2)), #3f51b5",
              },
            }}
          >
            {numbers.map((item, menuIndex) => (
              <Box
                key={menuIndex}
                onClick={() => {
                  handleClose();
                  setDotValue(item);
                  guess[fatherIndex !== undefined ? fatherIndex : 0] =
                    item.number;
                  sendGuess && sendGuess(guess);
                }}
                sx={{
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  display: "inline-block flex",
                  justifyContent: "center", // Center horizontally
                  alignItems: "center", // Center vertically
                  margin: 0.1,
                  marginRight: 0.5,
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.35)",
                  transition: "background-color 0.3s, transform 0.3s", // Smooth transition for background color and transform
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: item.hoverColor,
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
                    transform: "scale(1.2)", // Scale up on hover
                  },
                }}
              >
                <Typography paddingTop={0.85}>{item.number}</Typography>
              </Box>
            ))}
          </Menu>
        </div>
      ) : (
        <Box
          sx={{
            width: size,
            height: size,
            borderRadius: "50%",
            backgroundColor: isThisResponse ? colorGreenYellow : colorToUse,
            display: "inline-block flex",
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            margin: 0.1,
            marginRight: 0.5,
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.35)",
          }}
        >
          {" "}
          <Typography paddingTop={0.6}>{numberToUse}</Typography>
        </Box>
      )}
    </>
  );
};
