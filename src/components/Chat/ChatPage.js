import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import "./ChatPage.css";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState("");

  useEffect(()=> {
    const storedChat = localStorage.getItem("selectedChat")
    if(storedChat) {
      setSelectedChat(storedChat)
    }
  },[])

  const selectChatHandler = (name) => {
    // console.log(name);
    setSelectedChat(name);
    localStorage.setItem("selectedChat", name)
  };

  const chatIsSelected = (name) => {
    return selectedChat === name ? "selected-chat" : ""
  }
  return (
    <Container sx={{ marginTop: "5rem" }} className="chat-page">
      <Grid container>
        <Grid item xs={4}>
          <Box className="inbox-header" sx={{ backgroundColor: "#94E8D7" }}>
            <Typography variant="h5" fontWeight="bold">
              INBOX
            </Typography>
          </Box>
          <Paper sx={{ marginRight: "5px" }} className={`chat-list ${chatIsSelected("Afrin")}`}>
            <div
            className="chat-item"
              onClick={() => selectChatHandler("Afrin")}
            >
              Afrin
            </div>
          </Paper>
          <Paper sx={{ marginRight: "5px" }} className={`chat-list ${chatIsSelected("Rishal")}`}>
            <div
               className="chat-item"
              onClick={() => selectChatHandler("Rishal")}
            >
              Rishal
            </div>
            {/* Add more chat items */}
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className="chat-content">
            <Typography variant="h6" className="chat-header">
              <FaceIcon sx={{ marginRight: "5px" }} />
              {selectedChat}
            </Typography>
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatPage;
