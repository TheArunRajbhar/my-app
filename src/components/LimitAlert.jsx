import React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import KeyIcon from "@mui/icons-material/Key";

const LimitAlert = () => {
 
  return (
    <div>
      <Alert severity="info" sx={{ mb: 2 }}>
        <Typography variant="body2">
          If you encounter AI service limits, you can use your own Groq API key.
          <br />
          Get one for free from{" "}
          <a
            href="https://console.groq.com/keys"
            target="_blank"
            rel="noopener noreferrer"
          >
            Groq Console
          </a>
          .
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Enter your Groq API Key here..."
       
          
          />
          <Button
            variant="contained"
            startIcon={<KeyIcon />}
          >
            Add
          </Button>
        </Box>
        {true && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            Using custom API Key for this session.
          </Typography>
        )}
      </Alert>
    </div>
  );
};

export default LimitAlert;
