import { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { postPdf } from "./../redux/actions/QAAction";

export default function PdfUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();
  const { isLoadingPostPdf} = useSelector(
    (store) => store.qa || {}
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setError(null);
      setSuccess(null);
    } else {
      setSelectedFile(null);
      setError("Please select a valid PDF file.");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", selectedFile);

    try {
      const data = await dispatch(postPdf(formData));
      setSuccess("PDF uploaded and processed successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Upload Your PDF Document
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          disabled={isLoadingPostPdf}
        >
          Select PDF
          <input type="file" hidden accept=".pdf" onChange={handleFileChange} />
        </Button>
        {selectedFile && (
          <Typography variant="body1">
            Selected: <strong>{selectedFile.name}</strong>
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!selectedFile || isLoadingPostPdf}
          sx={{ mt: 2 }}
        >
          {isLoadingPostPdf ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Process PDF"
          )}
        </Button>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}
    </Paper>
  );
}
