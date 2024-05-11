import { Socket, io } from "socket.io-client";
const socket: Socket = io(import.meta.env.VITE_REACT_BACKEND);



export default socket;
