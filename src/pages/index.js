import { useState } from "react";
import { Container, Typography } from "@mui/material";
import PdfUploader from "../components/PdfUploader";
import ChatInterface from "../components/ChatInterface";
import LimitAlert from "./../components/LimitAlert";

export default function HomePage() {
  const [pdfContent, setPdfContent] = useState(null);

  const handlePdfUploaded = (content) => {
    setPdfContent(content);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 4 }}
      >
        AI-Powered Document Q&A
      </Typography>
      <PdfUploader onPdfUploaded={handlePdfUploaded} />
      <ChatInterface pdfContent={pdfContent} />
    </Container>
  );
}
