import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import {
  AdventureService,
  InitiativeService
} from './services';
import {
  CreateAdventureRequest,
  UpdateAdventureRequest,
  UpdateInitiativeRequest
} from './requests';

import { errorHandler } from './middleware';
import { ServerConfig } from './config';

dotenv.config();

const app = express();
const config = new ServerConfig();
const port = config.getServerPort();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send({});
});

app.get('/adventures', async (_request, response, next) => {
  try {
    const responseJson = await AdventureService.getAdventures();
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.post('/adventures', async (request, response, next) => {
  try {
    const {
      description,
      id,
      name,
      system
    } = request.body;

    const createAdventureRequest = new CreateAdventureRequest(
      description,
      id,
      name,
      system
    );

    const responseJson = await AdventureService.createAdventure(createAdventureRequest);

    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.put('/adventure/:id', async (request, response, next) => {
  try {
    const {
      description,
      name,
      notes,
      system
    } = request.body;

    const updateAdventureRequest = new UpdateAdventureRequest(
      description,
      name,
      notes,
      system
    );

    const responseJson = await AdventureService.updateAdventureById(request.params.id ?? '', updateAdventureRequest);

    response.json(responseJson);
  } catch (error) {
    next(error);
  }
});

app.get('/adventure/:id', async (request, response, next) => {
  try {
    const responseJson = await AdventureService.getAdventureById(request.params.id ?? '');
    response.json(responseJson);
  } catch (error) {
    next(error);
  }
});

app.delete('/adventures/:id', async(request, response, next) => {
  try {
    const responseJson = await AdventureService.destroyAdventureById(request.params.id ?? '');
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.get('/initiative/:adventureid', async(request, response, next) => {
  try {
    const responseJson = await InitiativeService.getInitiativeByAdventureId(request.params.adventureid ?? '');
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.patch('/initiative/:id', async(request, response, next) => {
  try {
    const requestBody = request.body;
    const updateInitiativeRequest = new UpdateInitiativeRequest(requestBody.initiativeOrderState);
    const responseJson = await InitiativeService.updateInitiativeById(request.params.id ?? '', updateInitiativeRequest);
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.post('/initiative/:adventureid', async(request, response, next) => {
  try {
    const responseJson = await InitiativeService.bootstrapInitiativeByAdventureId(request.params.adventureid ?? '');
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.delete('/initiative/:id', async(request, response, next) => {
  try {
    const responseJson = await InitiativeService.destroyInitiativeById(request.params.id ?? '');
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.use(errorHandler);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  }
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
