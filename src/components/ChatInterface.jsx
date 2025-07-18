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

import { useDispatch, useSelector } from "react-redux";
import { startChat } from "./../redux/actions/QAAction";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();

  const { pdfContent, isLoadingStartChat } = useSelector((store) => store.qa || {});
 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    if (!pdfContent) {
      setError("Please upload a PDF document first.");
      return;
    }

    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setError(null);

    try {
      const data = await dispatch(
        startChat({
          question: input,
          pdfContent: pdfContent,
          history: messages,
        })
      );
      const aiMessage = { role: "assistant", content: data.answer };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setError(err.message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: `Error: ${err.message}` },
      ]);
    }
  };
  
  return (
    <Paper
      elevation={3}
      sx={{ p: 3, display: "flex", flexDirection: "column", height: "70vh" }}
    >
      <Typography variant="h5" gutterBottom>
        Ask Questions About Your Document
      </Typography>
      {!pdfContent && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Upload a PDF to start asking questions.
        </Alert>
      )}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          mb: 2,
          p: 1,
          border: "1px solid #e0e0e0",
          borderRadius: "4px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.length === 0 && pdfContent && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", mt: 4 }}
          >
            No questions asked yet. Type your question below!
          </Typography>
        )}
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              mb: 1,
            }}
          >
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                maxWidth: "70%",
                backgroundColor: msg.role === "user" ? "#e3f2fd" : "#ffffff",
                borderRadius: "15px",
                borderTopRightRadius: msg.role === "user" ? "4px" : "15px",
                borderTopLeftRadius: msg.role === "assistant" ? "4px" : "15px",
              }}
            >
              <Typography variant="body2">{msg.content}</Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your question here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !isLoadingStartChat) {
              handleSendMessage();
            }
          }}
          disabled={isLoadingStartChat || !pdfContent}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSendMessage}
          disabled={isLoadingStartChat || !input.trim() || !pdfContent}
        >
          Send
        </Button>
      </Box>
      {isLoadingStartChat && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress size={24} />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Thinking...
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
