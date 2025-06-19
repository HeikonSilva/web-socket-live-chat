import { io } from 'socket.io-client'

export const socket = io(
  `http://${import.meta.env.VITE_BACK_HOST}:${import.meta.env.VITE_BACK_PORT}`
)
