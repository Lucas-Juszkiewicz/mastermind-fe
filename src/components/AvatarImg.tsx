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
        marginLeft: {
          xs: "-40px",
          sm: "-35px",
          md: "-25px",
          lg: "-20px",
          xl: "-25px",
        },
        marginTop: {
          xs: "-40px",
          sm: "-35px",
          md: "-25px",
          lg: "-25px",
          xl: "-25px",
        },
        objectFit: "cover",
        borderRadius: "10px",
        width: {
          xs: "120px",
          sm: "180px",
          md: "220px",
          lg: "250px",
          xl: "300px",
        },
        height: {
          xs: "120px",
          sm: "180px",
          md: "220px",
          lg: "600px",
          xl: "300px",
        },
      }}
    />
  );
};
