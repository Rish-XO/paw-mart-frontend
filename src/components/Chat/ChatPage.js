import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import Input from "@mui/joy/Input";

import "./ChatPage.css";
import ChatFiller from "./ChatFiller";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState("");
  const [chatIsClosed, setChatIsClosed] = useState(true);

  useEffect(() => {
    const storedChat = localStorage.getItem("selectedChat");
    if (storedChat) {
      setSelectedChat(storedChat);
      setChatIsClosed(false);
    }
  }, []);

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
  return (
    <Container sx={{ marginTop: "5rem" }} className="chat-page">
      <Grid container>
        <Grid item xs={5}>
          <Box className="inbox-header" sx={{ backgroundColor: "#94E8D7" }}>
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
              <Paper className="chat-content">
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                <hr></hr>
                <div className="chat-bubble">
                  <div className="message">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                </div>
                <div className="chat-bubble">
                  <div className="message">
                    Ut eget neque aliquam, lacinia ligula at, accumsan turpis.
                  </div>
                </div>
                {/* Add more chat bubbles */}
              </Paper>
              <Box>
                <Input
                  color="neutral"
                  placeholder="Type a message"
                  size="lg"
                  endDecorator={<SendIcon />}
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
