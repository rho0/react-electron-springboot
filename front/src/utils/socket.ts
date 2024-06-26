import { io }  from "socket.io-client";
const socketClient = io('http://localhost:4000');
// const socketClient = socketIOClient('http://localhost:4000');

export default socketClient;