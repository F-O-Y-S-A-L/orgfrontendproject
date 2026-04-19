import { io } from "socket.io-client";

export default defineNuxtPlugin(() => {
  const socket = io(`${process.env.SOCKET_URL}`)

  return {
    provide: { socket }
  };
}); 