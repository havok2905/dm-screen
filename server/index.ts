import cors from 'cors';
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

import { establishModelRelationships } from './database/models';
import { getAdventureById } from './services';

establishModelRelationships();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

const port = process.env.PORT ?? 3000;

app.use(cors());

app.get('/', (_req, res) => {
  res.send({});
});

app.get('/adventure/:id', async (request, response) => {
  const responseJson = await getAdventureById(request.params.id ?? '');
  response.json(responseJson);
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('handout:dispatch-show', (data) => {
    io.emit('handout:receive-show', data);
  });

  socket.on('initiative:dispatch', (data) => {
    io.emit('initiative:receive', data);
  });
});

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
