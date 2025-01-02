import Box from "@mui/material/Box";
import React from "react";

interface AvatarImgRankingProps {
  avatar: any;
}

export const AvatarImgRanking: React.FC<AvatarImgRankingProps> = ({
  avatar,
}) => {
  return (
    <Box
      component="img"
      src={avatar}
      alt="avatar"
      sx={{
        alignSelf: {
          xs: "center",
          sm: "center",
          md: "flex-start",
          lg: "flex-start",
          xl: "flex-start",
        },
        marginLeft: {
          xs: "0px",
          sm: "0px",
          md: "5px",
          lg: "50px",
          xl: "5px",
        },
        marginTop: {
          xs: "0px",
          sm: "8px",
          md: "5px",
          lg: "5px",
          xl: "5px",
        },
        objectFit: "cover",
        borderRadius: "80%", // Makes the image circular
        width: {
          xs: "120px",
          sm: "150px",
          md: "120px",
          lg: "100px",
          xl: "120px",
        },
        height: {
          xs: "120px", // Matching height to width for a perfect circle
          sm: "150px",
          md: "120px",
          lg: "100px",
          xl: "120px",
        },
      }}
    />
  );
};
