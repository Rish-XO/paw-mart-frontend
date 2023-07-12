
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

// socket.on("chatMessage", (message) => {
//     console.log("ssssssss", message);
//   });

export default socket;

// socket.on("chatMessage", (message) => {
//     console.log("ssssssss", message);
//     setMessages(( prevMessages) => {
//       const uniqueArray = Array.from(
//         new Set([...prevMessages, message].map(JSON.stringify))
//       ).map(JSON.parse);

//       return uniqueArray;
//     });
//   });
