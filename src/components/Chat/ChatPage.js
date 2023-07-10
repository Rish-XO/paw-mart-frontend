import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import Input from "@mui/joy/Input";
import { io } from "socket.io-client";

import "./ChatPage.css";
import ChatFiller from "./ChatFiller";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState("");
  const [chatIsClosed, setChatIsClosed] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const messagesEndRef = useRef(null);
  const socket = useRef();
  const { roomID } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.authHandler.user_id);

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
    navigate("/chat");
  };

  const messageInputHandler = (e) => {
    // console.log(e.target.value);
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim() === "") return;
    // const newMessages = {
    //   id: messages.length + 1,
    //   content: message,
    // };
    // setMessages((prevMessages) => [...prevMessages, newMessages]);
    socket.current.emit("chatMessage", { roomID, message });
    setMessage("");
  };

  const enterKeyHandler = (e) => {
    // console.log(e.keyCode);
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  //getting all chats
  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getAllChats");
        const chatData = response.data;
        setChats(chatData);
      } catch (error) {
        console.log(error.message);
      }
    };
    getRooms();
  }, []);

  //chat details fetching
  // useEffect(() => {
  //   const getChats = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/getChatDetails/${roomID}`
  //       );
  //       console.log(response.data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   getChats();
  // }, [roomID]);

  // socket codes
  useEffect(() => {
    socket.current = io("http://localhost:3001");

    //join a room
    socket.current.emit("joinRoom", { roomID });

    socket.current.on("chatMessage", (message) => {
      console.log("ssssssss", message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: message.length + 1, content: message },
      ]);
      // console.log(messages);
    });

    // return () => {
    //   socket.current.disconnect();
    // };
  }, [roomID]);

  return (
    <Container sx={{ marginTop: "5rem" }} className="chat-page">
      <Grid container>
        <Grid item xs={5}>
          <Box
            borderRadius="8px 8px 0 0"
            className="inbox-header"
            sx={{ backgroundColor: "#38A3A5" }}
          >
            <Typography variant="h5" fontWeight="bold">
              INBOX
            </Typography>
          </Box>

          {/* All chats */}
          {chats.map((chat) => (
            <Paper
              onClick={() => selectChatHandler("Afrin")}
              sx={{ marginRight: "5px" }}
              className={`chat-list ${chatIsSelected("Afrin")}`}
            >
              <div className="chat-item">{chat.user1_firstname}</div>
            </Paper>
          ))}
        </Grid>

        {/* the chat writing space */}
        <Grid item xs={7}>
          {chatIsClosed && !roomID ? (
            <ChatFiller />
          ) : (
            // roomID &&
            <Box
              borderRadius="10px"
              sx={{
                boxShadow:
                  "0px 4px 6px rgba(0, 0, 0, 0.3), 0px -2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Box
                borderRadius="8px 8px 0 0"
                sx={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#38A3A5",
                  zIndex: 1,
                  padding: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  border: "1px solid black",
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
                      backgroundColor: "#1CCAD8 ",
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
                elevation={15}
                className="chat-content"
                sx={{ backgroundColor: "#DEE5E5" }}
              >
                <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                  {/* messages rendering */}
                  {messages.map((msg) => (
                    <Box
                      key={msg.id}
                      className="chat-bubble"
                      sx={{
                        border: "1px solid",
                        borderColor: "primary.main",
                        backgroundColor: "primary.light",
                        p: 1,
                        borderRadius: "10px",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                        width: "fit-content",
                      }}
                    >
                      <Typography variant="body2">{msg.content}</Typography>
                    </Box>
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
            </Box>
            // end
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatPage;
