import express from 'express';
import http from 'http';
import {Server} from "socket.io";
import cors from 'cors';

// localhost 포트 설정
const port = 4000;

const app = express();
app.use(cors()); // CORS 설정 추가

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://192.168.0.176:3000", // 클라이언트의 주소
    methods: ["GET", "POST"]
  }
});

const users = [];
/**
 * 클라이언트가 소켓에 연결되었을 때의 이벤트 핸들러입니다.
 * 클라이언트가 서버에 연결되면 실행됩니다. socket 객체를 통해 클라이언트와의 통신을 할 수 있습니다.
 * 여기서 on 은 클라이언트에서 데이터를 받을 때 실행되고 emit 은 클라이언트로 데이터를 보낼 때 실행됩니다. */
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('set nickname', (nickname) => {
    users.push({ id: socket.id, nickname });
    io.emit('user connected', nickname);
  });

  socket.on('send message', (msg) => {
    console.log(`message from ${msg.name}: ${msg.message}`);
    io.emit('receive message', { ...msg, id: socket.id }); // 송신자의 소켓 ID 포함
  });

  socket.on('disconnect', () => {
    const user = users.find(u => u.id === socket.id);
    if (user) {
      io.emit('user disconnected', user.nickname);
      users.splice(users.indexOf(user), 1); // 사용자를 목록에서 제거
    }
    console.log(`User disconnected: ${socket.id}`);
  });
});


// socketio 문법
// io.on('connection', socket => {
//   console.log('=== socket User connected');
//   console.log(`User connected: ${socket.id}`);
//
//   // 사용자가 접속하면 nickname을 받아서 저장
//   socket.on('set nickname', (nickname) => {
//     users.push({ id: socket.id, nickname });
//     io.emit('user connected', nickname);
//   });
//
//   socket.on('send message', (item) => {
//     const msg = item.name + ' : ' + item.message;
//     console.log(msg);
//     io.emit('receive message', {name:item.name, message:item.message});
//   });
//
//   socket.on('message', (item) => {
//     const msg = item;
//     // const msg = item.name + ' : ' + item.message;
//     console.log(msg);
//     io.emit('=== socket receive message', {name:item.name, message:item.message});
//   });
//
//   socket.on('disconnect', () => {
//     console.log('=== socket User disconnect');
//   });
// });

server.listen(port, () => console.log(`=== socket Listening on port ${port}`))


// const express = require('express');
// const cors = require('cors');
// const http = require("http");
// const { Server } = require('socket.io');
//
// const app = express();
//
// //  HTTP 서버를 생성합니다.
// const server = http.createServer(app)
//
// // Socket.IO 서버를 생성합니다.
// // 이때 프론트에서 실행할 localhost 를 입력하고 get, post 만 허용한다고 정해줍니다.
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// })
//

// io.on('connection', socket => {
//   socket.on('=== socket send message', (item) => {
//     const msg = item.name + ' : ' + item.message;
//     console.log(msg);
//     io.emit('=== socket receive message', {name:item.name, message:item.message});
//   });
//   socket.on('disconnect', function () {
//     console.log('=== socket user disconnected: ', socket.id + ' ===');
//   });
// });
//
// server.listen(4000, () => {
//   console.log("=== socket server running ===")
// })