import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

export const Home = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        margin: "20px auto", // Center the Paper with margin
        p: "56px",
        maxWidth: "800px", // Set a maximum width for better readability
        backgroundColor: "#f3f4f6", // Light background color
        borderRadius: "6px", // Rounded corners
        border: "1px solid #ddd",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" }, // Responsive font size
          lineHeight: 1.5, // Adjust line height for readability
          // marginBottom: 2, // Space after the heading
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
        maiores, ducimus aspernatur dolores adipisci eaque incidunt dolore
        veritatis, sunt inventore suscipit nemo, libero ab optio aliquid!
        Laboriosam accusamus id neque atque harum tempora commodi. Enim illum
        suscipit quaerat reiciendis, fugiat modi voluptatibus veritatis
        repellat. Veniam, eveniet sit ab ducimus impedit aut in odit vero
        voluptate voluptates recusandae culpa aliquid dignissimos repellat quia
        illo repellendus dolorem perferendis, quam quos perspiciatis numquam ex.
        Incidunt eligendi non tenetur excepturi ipsum minima saepe rerum
        voluptate cumque eius qui, quas dolorum esse corporis assumenda aliquam
        placeat libero harum cupiditate eveniet impedit. Voluptate eveniet
        magnam optio!
      </Typography>
    </Paper>
  );
};
