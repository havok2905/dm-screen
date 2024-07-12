import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import {
  AdventureService,
  InitiativeService
} from './services';

import { ServerConfig } from './config';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

const config = new ServerConfig();
const port = config.getServerPort();

app.use(cors());
app.use(express.json())

app.get('/', (_req, res) => {
  res.send({});
});

app.get('/adventures', async (_request, response) => {
  const responseJson = await AdventureService.getAdventures();
  response.json(responseJson);
});

app.get('/adventure/:id', async (request, response) => {
  const responseJson = await AdventureService.getAdventureById(request.params.id ?? '');
  response.json(responseJson);
});

app.get('/initiative/:adventureid', async(request, response) => {
  const responseJson = await InitiativeService.getInitiativeByAdventureId(request.params.adventureid ?? '');
  response.json(responseJson);
});

app.patch('/initiative/:id', async(request, response) => {
  const requestBody = request.body;
  const responseJson = await InitiativeService.updateInitiativeById(request.params.id ?? '', requestBody);
  response.json(responseJson);
});

app.post('/initiative/:adventureid', async(request, response) => {
  const responseJson = await InitiativeService.bootstrapInitiativeByAdventureId(request.params.adventureid ?? '');
  response.json(responseJson);
});

app.delete('/initiative/:id', async(request, response) => {
  const responseJson = await InitiativeService.destroyInitiativeById(request.params.id ?? '');
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
