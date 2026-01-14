import { io } from "socket.io-client";

// 🔥 Single socket connection (industry rule)
export const socket = io("http://localhost:3015", {
  transports: ["websocket"],
  autoConnect: true
});
