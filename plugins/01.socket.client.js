import { io } from "socket.io-client";

export default defineNuxtPlugin(() => {
  const socket = io(`${process.env.API_URI}`)

  return {
    provide: { socket }
  };
}); 