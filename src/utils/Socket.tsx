import { io } from "socket.io-client";

const isNetlify = import.meta.env.VITE_IS_NETLIFY === "true";

// If on Netlify, use a relative path to trigger the netlify.toml proxy
// Otherwise, use the direct Render URL (for Cloudflare Pages or local dev)
const URL = import.meta.env.PROD
  ? isNetlify
    ? "/"
    : "https://goobapp-backend-tsil.onrender.com"
  : "http://localhost:3000";

export const SERVER_URL = URL;

export const socket = io(URL, {
  autoConnect: false,
  path: isNetlify ? "/api/socket.io" : "/socket.io",
  transports: ["polling", "websocket"],
});
