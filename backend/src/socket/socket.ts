interface socketUser {
  socketId: string;
  userId: string;
}

const socketIO = (io: any) => {
  io.on("connection", (socket: any) => {
    console.log("user connected", io.engine.clientsCount);

    registerUser(io, socket);

    socket.on("disconnect", (reason: any) => {
      console.log("user disconnected", reason);
      registerUser(io, socket);
    });
    socket.on("send_message", (data: any) => {
      socket.to(data.receiverSocketId).emit("receive_message", data);
    });
    socket.on("typing_status", (connversationId: string, status: string) => {
      socket.broadcast.emit("typing_status", connversationId, status);
    });
    socket.on("online", (userId: string) => {
      socket.broadcast.emit("online", userId);
    });
    socket.on("connect_error", (err: {}) => {
      console.log("Connect error", err);
    });
  });
};

const registerUser = (io: any, socketInstance: any) => {
  let users: socketUser[] = [];

  //register all the connected user
  for (let [id, socket] of io.of("/").sockets) {
    console.log("This is socket id", id);
    users.push({
      socketId: id,
      userId: socket.userId,
    });
  }
  io.emit("users", users);
  // return users;
};

export default socketIO;
