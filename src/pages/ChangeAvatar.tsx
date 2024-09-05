import { Paper, Typography, TextField, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { ConfirmationCard } from "../components";
import { useNavigate } from "react-router-dom";
import UploadIcon from "@mui/icons-material/Upload";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import axios from "axios";

export const ChangeAvatar = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null); // Type added for TS

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; // Make sure a file was selected
    if (selectedFile) {
      setFile(selectedFile);
      console.log("File selected:", selectedFile.name); // Debugging line
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("img", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/upload-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "auto", // Center the Paper with margin
          marginTop: "20px",
          px: "50px",
          pt: "25px",
          pb: "25px",
          maxWidth: "500px", // Set a maximum width for better readability
          backgroundColor: "#f3f4f6", // Light background color
          borderRadius: "6px", // Rounded corners
          border: "1px solid #ddd",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2.7rem", sm: "2.7rem", md: "3rem" },
            lineHeight: 1.5,
          }}
        >
          Change Avatar
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // minHeight: "100vh", // Full viewport height for vertical centering
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex", // Flexbox inside the form
              flexDirection: "column", // Stack items vertically
              alignItems: "center", // Center the buttons horizontally
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="avatar-upload"
              style={{ display: "none" }} // Hide the input field
            />
            <label htmlFor="avatar-upload">
              <Button
                variant="contained"
                component="span"
                sx={{
                  textAlign: "center",
                  fontSize: { xs: "1.8rem", sm: "2rem", md: "2rem" },
                  lineHeight: 1.5,
                  width: "250px",
                  height: "250px",
                  color: "#ffc107",
                  fontFamily: "teko, sans-serif",
                  paddingTop: 1.5,
                  borderRadius: "6px",
                  mb: 2, // Margin bottom for spacing between buttons
                }}
              >
                Click and Select a photo
              </Button>
            </label>

            <Button
              type="submit"
              endIcon={<UploadIcon style={{ fontSize: 28 }} />}
              variant="contained"
              sx={{
                fontSize: { xs: "1.8rem", sm: "2rem", md: "2rem" },
                lineHeight: 1.5,
                width: "250px",
                height: "50px",
                color: "#ffc107",
                fontFamily: "teko, sans-serif",
                paddingTop: 1.5,
                borderRadius: "6px",
              }}
            >
              upload photo
            </Button>
          </form>
        </div>

        <Box
          sx={{
            display: "flex", // Ensure buttons are aligned horizontally
            justifyContent: "center", // Center buttons within the container
            gap: 1, // Add some space between the buttons
            mt: 2, // Add some margin on top of the buttons for spacing
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              fontSize: { xs: "1.8rem", sm: "2rem", md: "2.2rem" },
              lineHeight: 1.5,
              width: "125px",
              height: "45px",
              color: "#ffc107",
              fontFamily: "teko, sans-serif",
              paddingTop: 1.5,
              borderRadius: "6px",
            }}
          >
            OK
          </Button>
          <Button
            variant="contained"
            sx={{
              fontSize: { xs: "1.8rem", sm: "1.6rem", md: "1.8rem" },
              lineHeight: 1.5,
              width: "125px",
              height: "45px",
              color: "#3f51b5",
              backgroundColor: "#ffc107",
              fontFamily: "teko, sans-serif",
              paddingTop: 1.5,
              borderRadius: "6px",
              ":hover": { backgroundColor: "#f9a825" },
            }}
            onClick={() => navigate("/editDetails")}
          >
            back
          </Button>
        </Box>
      </Paper>
    </div>
  );
};
