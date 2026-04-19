import { io } from "socket.io-client";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const socket = io(`${config.public.socketUrl}`)
  console.log("SOCKET_URL:", config.public.socketUrl)

  return {
    provide: { socket }
  };
}); 