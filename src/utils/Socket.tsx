import { io } from "socket.io-client";

const URL = import.meta.env.PROD
  ? "https://goobapp-backend-tsil.onrender.com"
  : "http://localhost:3000";

export const SERVER_URL = URL;

export const socket = io(URL, {
  autoConnect: false,
  path: "/socket.io",
  transports: ["polling", "websocket"],
});
