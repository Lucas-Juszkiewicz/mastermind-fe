import Box from "@mui/material/Box";
import React from "react";

interface AvatarImgProps {
  avatar: any;
}

export const AvatarImg: React.FC<AvatarImgProps> = ({ avatar }) => {
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
          md: "-25px",
          lg: "-20px",
          xl: "-25px",
        },
        marginTop: {
          xs: "0px",
          sm: "8px",
          md: "-15px",
          lg: "-25px",
          xl: "-25px",
        },
        objectFit: "cover",
        borderRadius: "10px",
        width: {
          xs: "300px",
          sm: "500px",
          md: "290px",
          lg: "250px",
          xl: "320px",
        },
        height: {
          xs: "280px",
          sm: "180px",
          md: "980px",
          lg: "600px",
          xl: "1000px",
        },
      }}
    />
  );
};
