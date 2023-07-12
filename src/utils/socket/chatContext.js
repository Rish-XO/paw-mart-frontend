import React, { createContext, useEffect, useState } from "react";
import socket from "./socket";

const SocketContext = createContext();

const ContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chatMessage", (message) => {
      console.log("ssssssss", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  },[]);

  return (
    <SocketContext.Provider
      value={{
        messages,
        setMessages,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export {ContextProvider, SocketContext}
