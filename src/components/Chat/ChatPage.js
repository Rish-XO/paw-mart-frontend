import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import Input from "@mui/joy/Input";

import "./ChatPage.css";
import ChatFiller from "./ChatFiller";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState("");
  const [chatIsClosed, setChatIsClosed] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const storedChat = localStorage.getItem("selectedChat");
    if (storedChat) {
      setSelectedChat(storedChat);
      setChatIsClosed(false);
    }
  }, []);

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom whenever messages change
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const selectChatHandler = (name) => {
    // console.log(name);
    setSelectedChat(name);
    setChatIsClosed(false);
    localStorage.setItem("selectedChat", name);
  };

  const chatIsSelected = (name) => {
    return selectedChat === name ? "selected-chat" : "";
  };

  const chatCloseBtnHandler = () => {
    setChatIsClosed(true);
    localStorage.removeItem("selectedChat");
    setSelectedChat("");
  };

  const messageInputHandler = (e) => {
    // console.log(e.target.value);
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim() === "") return;
    const newMessages = {
      id: messages.length + 1,
      content: message,
    };
    setMessages((prevMessages) => [...prevMessages, newMessages]);
    setMessage("");
  };

  const enterKeyHandler = (e) => {
    // console.log(e.keyCode);
    if (e.keyCode === 13) {
      sendMessage();
    }
  };
  return (
    <Container sx={{ marginTop: "5rem" }} className="chat-page">
      <Grid container>
        <Grid item xs={5}>
          <Box className="inbox-header" sx={{ backgroundColor: "#17b890" }}>
            <Typography variant="h5" fontWeight="bold">
              INBOX
            </Typography>
          </Box>
          <Paper
            onClick={() => selectChatHandler("Afrin")}
            sx={{ marginRight: "5px" }}
            className={`chat-list ${chatIsSelected("Afrin")}`}
          >
            <div className="chat-item">Afrin</div>
          </Paper>
          <Paper
            onClick={() => selectChatHandler("Rishal")}
            sx={{ marginRight: "5px" }}
            className={`chat-list ${chatIsSelected("Rishal")}`}
          >
            <div className="chat-item">Rishal</div>
            {/* Add more chat items */}
          </Paper>
        </Grid>

        {/* the chat writing space */}
        <Grid item xs={7}>
          {chatIsClosed ? (
            <ChatFiller />
          ) : (
            <>
              <Box
                sx={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#9DC5BB",
                  zIndex: 1,
                  padding: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" className="chat-header">
                  <FaceIcon sx={{ marginRight: "5px" }} />
                  {selectedChat}
                </Typography>
                <Box
                  sx={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#8EE2D2 ",
                    },
                  }}
                  onClick={chatCloseBtnHandler}
                >
                  <CloseIcon
                    sx={{
                      fontSize: "2rem",
                      cursor: "pointer",
                    }}
                  />
                </Box>
              </Box>
              <Paper
                className="chat-content"
                sx={{ backgroundColor: "#DEE5E5" }}
              >
                <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                  {messages.map((msg) => (
                    <div key={msg.id} className="chat-bubble">
                      <div className="message">{msg.content}</div>
                    </div>
                  ))}
                </Box>
                <div ref={messagesEndRef} />
              </Paper>
              <Box>
                <Input
                  value={message}
                  color="neutral"
                  placeholder="Type a message"
                  size="lg"
                  onChange={messageInputHandler}
                  onKeyDown={enterKeyHandler}
                  endDecorator={
                    message && (
                      <Button onClick={sendMessage}>
                        <SendIcon />
                      </Button>
                    )
                  }
                />
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatPage;