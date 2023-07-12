import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import Input from "@mui/joy/Input";
import { v4 as uuidv4 } from "uuid";
import "./ChatPage.css";
import ChatFiller from "./ChatFiller";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import socket from "../../utils/socket/socket";
import { SocketContext } from "../../utils/socket/chatContext";
import moment from "moment";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(""); //storing room id
  const [selectedChatName, setSelectedChatName] = useState(""); // just storing other user name to render
  const [chatIsClosed, setChatIsClosed] = useState(true);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const messagesEndRef = useRef(null);
  const { roomID } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.authHandler.user_id);
  const { messages, setMessages } = useContext(SocketContext);

  // socket codes
  useEffect(() => {
    //join a room
    socket.emit("joinRoom", { roomID });
    console.log("joingin the room", roomID);
  }, [roomID]);

  useEffect(() => {
    const storedChat = localStorage.getItem("selectedChat");
    const storedName = localStorage.getItem("selectedName");
    if (roomID) {
      const chat = chats.find((chat) => chat.room_id === roomID);
      if (chat) {
        setSelectedChat(chat.room_id);
        setSelectedChatName(chat.otherUser.name);
        setChatIsClosed(false);
        localStorage.setItem("selectedChat", chat.room_id);
        localStorage.setItem("selectedName", chat.otherUser.name);
      }
    } else if (!roomID) {
      setChatIsClosed(true);
      localStorage.removeItem("selectedChat");
      localStorage.removeItem("selectedName");
      setSelectedChat("");
      setSelectedChatName("");
    } else if (storedChat && storedName) {
      setSelectedChat(storedChat);
      setSelectedChatName(storedName);
      setChatIsClosed(false);
    }
  }, [roomID, chats]);

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom whenever messages change
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const selectChatHandler = (id, name, room_id) => {
    // console.log(id);
    setSelectedChat(id);
    setSelectedChatName(name);
    setChatIsClosed(false);
    localStorage.setItem("selectedChat", id);
    localStorage.setItem("selectedName", name);
    navigate(`/chat/${room_id}`);
  };

  const chatIsSelected = (id) => {
    return selectedChat === id ? "selected-chat" : "";
  };

  const chatCloseBtnHandler = () => {
    setChatIsClosed(true);
    localStorage.removeItem("selectedChat");
    localStorage.removeItem("selectedName");
    setSelectedChat("");
    setSelectedChatName("");
    navigate("/chat");
  };

  const messageInputHandler = (e) => {
    // console.log(e.target.value);
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (message.trim() === "") return;
    const newMessage = {
      message_id: uuidv4(),
      content: message,
      room_id: roomID,
      user_id: currentUser,
      created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    socket.emit("chatMessage", { roomID, message: newMessage });
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/saveMessage",
        newMessage
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
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
        const updatedData = chatData.map((chat) => {
          const otherUser = {
            id: chat.user1_id === currentUser ? chat.user2_id : chat.user1_id,
            name:
              chat.user1_id === currentUser
                ? chat.user2_firstname + " " + chat.user2_lastname
                : chat.user1_firstname + " " + chat.user1_lastname,
          };
          return { ...chat, otherUser };
        });
        setChats(updatedData);
        // console.log(chats);
      } catch (error) {
        console.log(error.message);
      }
    };
    getRooms();
  }, [currentUser]);

  // chat details fetching
  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getMessages/${roomID}`
        );
        console.log(response.data);
        setMessages(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (roomID) {
      getChats();
    }
  }, [roomID, setMessages]);

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
              key={chat.room_id}
              onClick={() =>
                selectChatHandler(
                  chat.room_id,
                  chat.otherUser.name,
                  chat.room_id
                )
              }
              sx={{ marginRight: "5px" }}
              className={`chat-list ${chatIsSelected(chat.room_id)}`}
            >
              <div className="chat-item">
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <div className="chat-avatar">
                      <img src={chat.url} alt="post-avatar" />
                    </div>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {chat.otherUser.name}
                    </Typography>
                    <Typography variant="body2">{chat.breed}</Typography>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          ))}
        </Grid>

        {/* the chat writing space */}
        <Grid item xs={7}>
          {chatIsClosed && !roomID ? (
            <ChatFiller />
          ) : (
            roomID && (
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
                    {selectedChatName}
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
                        <Typography variant="body1">{msg.content}</Typography>
                        <Typography variant="caption" sx={{marginLeft: "10px" , marginTop:"3px"}}>
                          {moment(msg.created_at).format("hh:mm A")}
                        </Typography>
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
            )
            // end
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatPage;
