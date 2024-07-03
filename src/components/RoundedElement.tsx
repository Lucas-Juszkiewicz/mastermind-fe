import React from "react";
import { Box, Fade, Menu, Typography, darken } from "@mui/material";

interface RoundedElementProps {
  color: string;
  size: number;
  active?: boolean;
  activeSize?: number;
  index?: number;
}

const numbers = [
  { number: 10, color: "#9c27b0", hoverColor: "#7b1fa2" }, // purple
  { number: 9, color: "#2196f3", hoverColor: "#1976d2" }, // blue
  { number: 8, color: "#3f51b5", hoverColor: "#303f9f" }, // indigo
  { number: 7, color: "#673ab7", hoverColor: "#512da8" }, // deep purple
  { number: 6, color: "#e91e63", hoverColor: "#c2185b" }, // pink
  { number: 5, color: "#ff9800", hoverColor: "#f57c00" }, // orange
  { number: 4, color: "#00bcd4", hoverColor: "#0097a7" }, // cyan
  { number: 3, color: "#4caf50", hoverColor: "#388e3c" }, // green
  { number: 2, color: "#ff5722", hoverColor: "#e64a19" }, // deep orange
  { number: 1, color: "#ffeb3b", hoverColor: "#fdd835" }, // yellow
];

export const RoundedElement: React.FC<RoundedElementProps> = ({
  color,
  size,
  active,
  index,
}) => {
  // function getValueBasedOnIndex(index: number): number {
  //   console.log(index);
  //   switch (index) {
  //     case 0:
  //       return 8;
  //     case 1:
  //       return -22;
  //     case 2:
  //       return -60;
  //     case 3:
  //       return -95;
  //     case 4:
  //       return -127;
  //     case 5:
  //       return -163;
  //     case 6:
  //       return -197;
  //     case 7:
  //       return -232;
  //     default:
  //       return 0; // Default case if index is out of specified range
  //   }
  // }

  function getValueBasedOnIndex(index: number): string {
    console.log(index);
    switch (index) {
      case 0:
        return "1%";
      case 1:
        return "-2%";
      case 2:
        return "-4.5%";
      case 3:
        return "-7.2%";
      case 4:
        return "-10%";
      case 5:
        return "-12.7%";
      case 6:
        return "-15.5%";
      case 7:
        return "-18.1%";
      default:
        return "0%"; // Default case if index is out of specified range
    }
  }

  const positionX = index !== undefined ? getValueBasedOnIndex(index) : 0;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
              backgroundColor: color,
              display: "inline-block",
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
          />
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
              // position: "absolute",
              top: -100, // Adjust based on your layout
              // left: positionX,
              left: positionX,
              zIndex: 1, // Ensure menu appears above other elements
              "& .MuiPaper-root": {
                borderRadius: "20px", // Rounded corners for the menu
                padding: "8px", // Optional: padding inside the menu
                background:
                  "radial-gradient(circle, rgba(103, 58, 183, 0.6), rgba(103, 58, 183, 0.1)), #3f51b5", // Gradient layered over semi-transparent color
              },
            }}
          >
            {numbers.map((item) => (
              // <MenuItem onClick={handleClose}>{item.number}</MenuItem>
              <Box
                onClick={handleClose}
                sx={{
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  backgroundColor: color,
                  display: "inline-block",
                  margin: 0.1,
                  marginRight: 0.5,
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.35)",
                }}
              >
                <Typography textAlign={"center"}>{item.number}</Typography>
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
            backgroundColor: color,
            display: "inline-block",
            margin: 0.1,
            marginRight: 0.5,
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.35)",
          }}
        />
      )}
    </>
  );
};
