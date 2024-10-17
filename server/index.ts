import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import multer from 'multer';
import path from 'path';
import { Server } from 'socket.io';

import {
  AddAdventureHandoutRequest,
  AddImageRequest,
  CreateAdventureRequest,
  CreateCreatureRequest,
  CreateEquipmentItemRequest,
  CreateMagicItemRequest,
  CreateSpellRequest,
  RemoveImageRequest,
  UpdateAdventureCreatureRequest,
  UpdateAdventureItemRequest,
  UpdateAdventureRequest,
  UpdateCreatureRequest,
  UpdateEquipmentItemRequest,
  UpdateInitiativeRequest,
  UpdateMagicItemRequest,
  UpdateSpellRequest
} from './requests';
import {
  AdventureCreatureService,
  AdventureHandoutService,
  AdventureItemService,
  AdventureService,
  CreatureService,
  ImageService,
  ImportService,
  InitiativeService,
  ItemService,
  SpellService
} from './services';

import { errorHandler } from './middleware';
import { ServerConfig } from './config';

dotenv.config();

const app = express();
const config = new ServerConfig();
const port = config.getServerPort();

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, 'uploads');
    },
    filename: (_req, file, callback) => {
      callback(null, `image-${Date.now()}.${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 1024 * 1024 * 24 // Limit file size to 24mb
  },
  fileFilter: (_req, file, callback) => {
    const allowedMimes = [
      'image/jpg',
      'image/jpeg',
      'image/png',
      'image/gif'
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(
        new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.')
      );
    }
  }
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
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

app.post('/adventure/:id/addCreature/:creatureId', async (request, response, next) => {
  try {
    const responseJson = await AdventureService.addCreatureToAdventure(
      request.params.id ?? '',
      request.params.creatureId ?? ''
    );

    response.json(responseJson);
  } catch (error) {
    next(error);
  }
});

app.post('/adventure/:id/addEquipmentItem/:itemId', async (request, response, next) => {
  try {
    const responseJson = await AdventureService.addEquipmentItemToAdventure(
      request.params.id ?? '',
      request.params.itemId ?? ''
    );

    response.json(responseJson);
  } catch (error) {
    next(error);
  }
});

app.post('/adventure/:id/addHandout', upload.single('image'), async (request, response, next) => {
  try {
    const {
      id
    } = request.params;

    const {
      description,
      name
    } = request.body;

    const file = request.file;
    const url = `/uploads/${file?.filename ?? ''}`;

    const addAdventureHandoutRequest = new AddAdventureHandoutRequest(
      id,
      name,
      description,
      url
    );

    const responseJson = await AdventureService.addHandoutToAdventure(addAdventureHandoutRequest);
    
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.post('/adventure/:id/addMagicItem/:itemId', async (request, response, next) => {
  try {
    const responseJson = await AdventureService.addMagicItemToAdventure(
      request.params.id ?? '',
      request.params.itemId ?? ''
    );

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

app.get('/adventureCreature/:id', async (request, response, next) => {
  try {
    const responseJson = await AdventureCreatureService.getAdventureCreatureById(request.params.id ?? '');
    response.json(responseJson);
  } catch (error) {
    next(error);
  }
});

app.delete('/adventureCreatures/:id', async(request, response, next) => {
  try {
    const responseJson = await AdventureCreatureService.destroyAdventureCreatureById(request.params.id ?? '');
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.put('/adventureCreature/:id', async (request, response, next) => {
  try {
    const {
      adventureid,
      content,
      id,
      image,
      metadata,
      name
    } = request.body;

    const updateAdventureCreatureRequest = new UpdateAdventureCreatureRequest(
      adventureid,
      content,
      id,
      image,
      metadata,
      name
    );

    const responseJson = await AdventureCreatureService.updateAdventureCreatureById(request.params.id ?? '', updateAdventureCreatureRequest);

    response.json(responseJson);
  } catch (error) {
    next(error);
  }
});

app.delete('/adventureHandouts/:id', async(request, response, next) => {
  try {
    const responseJson = await AdventureHandoutService.destroyAdventureHandoutById(request.params.id ?? '');
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.get('/adventureItem/:id', async (request, response, next) => {
  try {
    const responseJson = await AdventureItemService.getAdventureItemById(request.params.id ?? '');
    response.json(responseJson);
  } catch (error) {
    next(error);
  }
});

app.delete('/adventureItems/:id', async(request, response, next) => {
  try {
    const responseJson = await AdventureItemService.destroyAdventureItemById(request.params.id ?? '');
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.put('/adventureItem/:id', async (request, response, next) => {
  try {
    const {
      adventureid,
      content,
      id,
      image,
      metadata,
      name
    } = request.body;

    const updateAdventureItemRequest = new UpdateAdventureItemRequest(
      adventureid,
      content,
      id,
      image,
      metadata,
      name
    );

    const responseJson = await AdventureItemService.updateAdventureItemById(request.params.id ?? '', updateAdventureItemRequest);

    response.json(responseJson);
  } catch (error) {
    next(error);
  }
});

app.post('/image/:entityType/:id/addImage', upload.single('image'), async(request, response, next) => {
  try {
    const {
      entityType,
      id
    } = request.params;

    const file = request.file;
    const url = `/uploads/${file?.filename ?? ''}`;

    const addImageRequest = new AddImageRequest(
      id,
      entityType as ('creature' | 'equipment-item' | 'magic-item' | 'spell'),
      url
    );

    const responseJson = await ImageService.addImage(addImageRequest);
    
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.delete('/image/:entityType/:id/removeImage', async(request, response, next) => {
  try {
    const {
      entityType,
      id
    } = request.params;

    const removeImageRequest = new RemoveImageRequest(
      id,
      entityType as ('creature' | 'equipment-item' | 'magic-item' | 'spell'),
    );

    const responseJson = await ImageService.removeImage(removeImageRequest);
    
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

app.get('/creatures', async (_request, response, next) => {
  try {
    const responseJson = await CreatureService.getCreatures();
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.delete('/creature/:id', async(request, response, next) => {
  try {
    const responseJson = await CreatureService.destroyCreatureById(request.params.id ?? '');
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.get('/creature/:id', async (request, response, next) => {
  try {
    const responseJson = await CreatureService.getCreatureById(request.params.id ?? '');
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.post('/creatures', async (request, response, next) => {
  try {
    const {
      content,
      id,
      image,
      metadata,
      name
    } = request.body;

    const createCreatureRequest = new CreateCreatureRequest(
      content,
      id,
      image,
      metadata,
      name
    );

    const responseJson = await CreatureService.createCreature(createCreatureRequest);
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.put('/creature/:id', async (request, response, next) => {
  try {
    const {
      content,
      id,
      image,
      metadata,
      name
    } = request.body;

    const updateCreatureRequest = new UpdateCreatureRequest(
      content,
      id,
      image,
      metadata,
      name
    );

    const responseJson = await CreatureService.updateCreatureById(request.params.id ?? '', updateCreatureRequest);

    response.json(responseJson);
  } catch (error) {
    next(error);
  }
});

app.delete('/equipmentItem/:id', async(request, response, next) => {
  try {
    const responseJson = await ItemService.destroyEquipmentItemById(request.params.id ?? '');
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.get('/equipmentItem/:id', async (request, response, next) => {
  try {
    const responseJson = await ItemService.getEquipmentItemById(request.params.id ?? '');
    response.json(responseJson);
  } catch (error) {
    next(error);
  }
});

app.get('/equipmentItems', async (_request, response, next) => {
  try {
    const responseJson = await ItemService.getEquipmentItems();
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.post('/equipmentItems', async (request, response, next) => {
  try {
    const {
      content,
      id,
      image,
      metadata,
      name
    } = request.body;

    const createEquipmentItemRequest = new CreateEquipmentItemRequest(
      content,
      id,
      image,
      metadata,
      name
    );

    const responseJson = await ItemService.createEquipmentItem(createEquipmentItemRequest);

    response.json(responseJson);
  } catch (error) {
    next(error);
  }
});

app.put('/equipmentItem/:id', async (request, response, next) => {
  try {
    const {
      content,
      id,
      image,
      metadata,
      name
    } = request.body;

    const updateEquipmentItemRequest = new UpdateEquipmentItemRequest(
      content,
      id,
      image,
      metadata,
      name
    );

    const responseJson = await ItemService.updateEquipmentItemById(request.params.id ?? '', updateEquipmentItemRequest);

    response.json(responseJson);
  } catch (error) {
    next(error);
  }
});

app.delete('/magicItem/:id', async(request, response, next) => {
  try {
    const responseJson = await ItemService.destroyMagicItemById(request.params.id ?? '');
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.get('/magicItems', async (_request, response, next) => {
  try {
    const responseJson = await ItemService.getMagicItems();
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.get('/magicItem/:id', async (request, response, next) => {
  try {
    const responseJson = await ItemService.getMagicItemById(request.params.id ?? '');
    response.json(responseJson);
  } catch (error) {
    next(error);
  }
});

app.post('/magicItems', async (request, response, next) => {
  try {
    const {
      content,
      id,
      image,
      metadata,
      name
    } = request.body;

    const createMagicItemRequest = new CreateMagicItemRequest(
      content,
      id,
      image,
      metadata,
      name
    );

    const responseJson = await ItemService.createMagicItem(createMagicItemRequest);

    response.json(responseJson);
  } catch (error) {
    next(error);
  }
});

app.put('/magicItem/:id', async (request, response, next) => {
  try {
    const {
      content,
      id,
      image,
      metadata,
      name
    } = request.body;

    const updateMagicItemRequest = new UpdateMagicItemRequest(
      content,
      id,
      image,
      metadata,
      name
    );

    const responseJson = await ItemService.updateMagicItemById(request.params.id ?? '', updateMagicItemRequest);

    response.json(responseJson);
  } catch (error) {
    next(error);
  }
});

app.delete('/spell/:id', async(request, response, next) => {
  try {
    const responseJson = await SpellService.destroySpellById(request.params.id ?? '');
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.get('/spells', async (_request, response, next) => {
  try {
    const responseJson = await SpellService.getSpells();
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.get('/spell/:id', async (request, response, next) => {
  try {
    const responseJson = await SpellService.getSpellById(request.params.id ?? '');
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.post('/spells', async (request, response, next) => {
  try {
    const {
      content,
      id,
      image,
      metadata,
      name
    } = request.body;

    const createSpellRequest = new CreateSpellRequest(
      content,
      id,
      image,
      metadata,
      name
    );

    const responseJson = await SpellService.createSpell(createSpellRequest);

    response.json(responseJson);
  } catch (error) {
    next(error);
  }
});

app.put('/spell/:id', async (request, response, next) => {
  try {
    const {
      content,
      id,
      image,
      metadata,
      name
    } = request.body;

    const updateSpellRequest = new UpdateSpellRequest(
      content,
      id,
      image,
      metadata,
      name
    );

    const responseJson = await SpellService.updateSpellById(request.params.id ?? '', updateSpellRequest);

    response.json(responseJson);
  } catch (error) {
    next(error);
  }
});

app.post('/import/dnd5eapi', async (_request, response, next) => {
  try {
    const responseJson = await ImportService.initiate5eApiImport(io);
    response.json(responseJson);
  } catch(error) {
    next(error);
  }
});

app.use(errorHandler);

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('handout:dispatch-show', (data) => {
    const { adventureId, handout } = data;

    if (adventureId && handout) {
      const handoutReceiveEvent = `handout:receive-show:${adventureId}`;
      io.emit(handoutReceiveEvent, handout);
    }
  });

  socket.on('initiative:dispatch', (data) => {
    const { adventureId } = data;

    if (adventureId) {
      const initiativeReceiveEvent = `initiative:receive:${adventureId}`;
      io.emit(initiativeReceiveEvent);
    }
  });
});

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
