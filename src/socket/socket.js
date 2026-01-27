import { io } from "socket.io-client";
import { getCookie } from "@/utils/cookies";
export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  reconnectionDelayMax: 10000,
  withCredentials: true,
  extraHeaders: {
    "Authorization": `Bearer ${getCookie("accessToken")}`
  },
  transports: ["websocket"],
});
