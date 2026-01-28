import { io } from "socket.io-client";
import { getCookie } from "@/utils/cookies";
export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  reconnectionDelayMax: 10000,
  withCredentials: true,
  extraHeaders: {
    "Authorization": `Bearer ${getCookie("accessToken")}`
  },
  transports: ["websocket"],
  query: {
    token: getCookie("accessToken")
  },
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  autoConnect: true,
  transports: ["websocket"],
});


export const socketForMessages = (chatId) => {
  socket.connect();
  socket.on(`new-message::${chatId}`, (message) => {
    console.log("new message received 📡", message);
  });
  return () => {
    socket.off(`new-message::${chatId}`);
    socket.disconnect();
  };
};


// export const socketForMessageGlobal = (userId, onMessageCallback) => {
//   if (!userId) {
//     return () => {}; // Return empty cleanup function
//   }
  
//   socket.connect();
//   const eventName = `new-message::${userId}`;
  
//   const handleNewMessage = (message) => {
//     console.log("new message received global 📡", message);
//     // Call the callback if provided
//     if (onMessageCallback && typeof onMessageCallback === "function") {
//       onMessageCallback(message);
//     }
//   };
  
//   socket.on(eventName, handleNewMessage);
//   console.log("socketForMessageGlobal connected 📡", userId);
  
//   // Return cleanup function
//   return () => {
//     socket.off(eventName, handleNewMessage);
//   };
// };