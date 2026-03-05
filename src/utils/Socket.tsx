import { io } from "socket.io-client";
const URL = import.meta.env.PROD
  ? import.meta.env.IS_NETLIFY ? "goobapp-backend.netlify.app" : "https://goobapp-server.koyeb.app"
  : "http://localhost:3000"; // If import.meta.env.PROD is true, then you are in production. Otherwise just use localhost

export const SERVER_URL = URL;
export const socket = io(URL, {
  autoConnect: false,
});
