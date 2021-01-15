const app = require("./lib/app");
const pool = require("./lib/utils/pool");
// const config = require("config");

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  console.log(`Started on ${PORT}`);
});

// const io = require("socket.io")(
//   app.listen(PORT, () => {
//     console.log(`Started on ${PORT}`);
//   }),
//   {
//     cors: {
//       origin: true,
//     },
//   }
// );

// let numUsers = 0;

// // On connection,
// io.on("connection", (socket) => {
//   const addedUser = false;

//   // When the client emits 'new message',
//   socket.on(config.get("chat.events.NEWMSG"), (data, done) => {
//     // Catch if the user is not part of a room
//     const room = socket.roomname;
//     if (!socket.roomname) {
//       socket.emit(
//         config.get("chat.events.NEWMSG"),
//         "You're not part of a room yet"
//       );
//       return done();
//     }

//     // Otherwise, direct the client to execute 'new message'
//     socket.to(socket.roomname).emit(config.get("chat.events.NEWMSG"), {
//       room,
//       username: socket.username,
//       message: data,
//     });
//     done();
//   });

//   // When the client emits 'join room',
//   socket.on(config.get("chat.events.JOINROOM"), (data, done) => {
//     console.log("Requesting to join a room: ", data);

//     socket.roomname = data.roomname;
//     socket.username = data.username;

//     // Join and notify the room that a new user has joined
//     socket.join(data.roomname, (_) => {
//       socket.to(data.roomname).emit(config.get("chat.events.NEWMSG"), {
//         username: "Game server",
//         message: socket.username + " has joined the party!",
//       });
//       done(null, { joined: true });
//     });
//   });

//   // When a user disconnects,
//   socket.on("disconnect", () => {
//     if (addedUser) {
//       --numUsers;

//       // Echo globally that this client has left
//       socket.to(socket.roomname).emit("user left", {
//         username: socket.username,
//         numUsers,
//       });
//     }
//   });
// });

process.on("exit", () => {
  console.log("Goodbye!");
  pool.end();
});
