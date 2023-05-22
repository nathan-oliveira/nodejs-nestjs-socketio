import express from "express";
import { Server as WebSocketServer } from 'socket.io'
import http from 'http';
import { v4 as uuid } from 'uuid'

let notes = [];

const app = express();
app.use(express.static(__dirname + '/public'));

const server =  http.createServer(app)
const io = new WebSocketServer(server);

io.on('connection', (socket) => {
  socket.emit('server:loadnotes', notes);

  socket.on('client:newnote', (newNote) => {
    const note = { ...newNote, id: uuid() }
    notes.push(note);
    oi.emit('server:newnote', note); // para enviar ao todos os clients
    // socket.emit('server:newnote', note);
  });

  socket.on('client:deletenote', (noteId) => {
    notes = notes.filter((note) => note.id !== noteId);
    oi.emit('server:loadnotes', notes); // para enviar ao todos os clients
    // socket.emit('server:loadnotes', notes);
  });

  socket.on('client:getnode', (noteId) => {
    const note = notes.find((notes) => notes.id === noteId);
    socket.emit('server:selectednote', note);
  });

  socket.on('client:updatenote', (updateNote) => {
    notes = notes.map((note) => {
      if (note.id !== updateNote.id) return note;
      return { ...updateNote, id: note.id };
    });

    oi.emit('server:loadnotes', notes); // para enviar ao todos os clients
    // socket.emit('server:loadnotes', notes);
  });
});

server.listen(3000, () => {
  console.log('Server on port 3000');
});

// 01:16:55
