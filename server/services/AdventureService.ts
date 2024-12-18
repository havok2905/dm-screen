import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import {
  AddAdventureHandoutRequest,
  CreateAdventureRequest,
  UpdateAdventureRequest
} from '../requests';
import {
  Adventure,
  AdventureCreature,
  AdventureHandout,
  AdventureItem,
  AdventurePlayer,
  Creature,
  EquipmentItem,
  MagicItem
} from '../sequelize/db';
import {
  AdventureNotFoundException,
  AdventuresNotFoundException,
  CreatureNotFoundException,
  EquipmentItemNotFoundException,
  MissingArgumentException
} from '../exceptions';
import {
  AdventureResponse,
  AdventuresResponse
} from '../responses';

import { AdventureCreatureService } from './AdventureCreatureService';
import { AdventureHandoutService } from './AdventureHandoutService';
import { AdventureItemService } from './AdventureItemService';
import { AdventurePlayerService } from './AdventurePlayerService';
import { cloneFileOnDisk } from './utils/cloneFileOnDisk';

export class AdventureService {
  static async addCreatureToAdventure (
    id: string,
    creatureId: string
  ): Promise<AdventureResponse> {
    if (!id || !creatureId) {
      throw new MissingArgumentException();
    }

    const adventure = await Adventure.findOne({
      where: {
        id
      }
    });

    const creature = await Creature.findOne({
      where: {
        id: creatureId
      }
    });

    if (!adventure) {
      throw new AdventureNotFoundException();
    }

    if (!creature) {
      throw new CreatureNotFoundException();
    }

    let newImagePath = '';
    const imagePath: string = creature.dataValues.image ?? '';

    if (imagePath) {
      const fullImagePath = path.join(path.resolve(__dirname), '..', '..', imagePath);
      const result = cloneFileOnDisk(imagePath, fullImagePath);
      newImagePath = result.newImagePath;
    }

    const adventureCreature = AdventureCreature.build({
      id: uuidv4(),
      adventureid: id,
      content: creature.dataValues.content,
      name: creature.dataValues.name,
      image: newImagePath,
      metadata: creature.dataValues.metadata
    });

    adventureCreature.save();

    const adventureCreatures = await AdventureCreature.findAll({
      where: {
        adventureid: id
      },
      order: [
        [
          'name',
          'ASC'
        ]
      ]
    });
  
    const adventureHandouts = await AdventureHandout.findAll({
      where: {
        adventureid: id
      },
      order: [
        [
          'name',
          'ASC'
        ]
      ]
    });
  
    const adventureItems = await AdventureItem.findAll({
      where: {
        adventureid: id
      },
      order: [
        [
          'name',
          'ASC'
        ]
      ]
    });

    const adventurePlayers = await AdventurePlayer.findAll({
      where: {
        adventureid: id
      },
      order: [
        [
          'playername',
          'ASC'
        ]
      ]
    });
  
    return this.mapResponseJson(
      adventure,
      adventureCreatures,
      adventureHandouts,
      adventureItems,
      adventurePlayers
    );
  }

  static async addEquipmentItemToAdventure (
    id: string,
    equipmentItemId: string
  ): Promise<AdventureResponse> {
    if (!id || !equipmentItemId) {
      throw new MissingArgumentException();
    }

    const adventure = await Adventure.findOne({
      where: {
        id
      }
    });

    const equipmentItem = await EquipmentItem.findOne({
      where: {
        id: equipmentItemId
      }
    });

    if (!adventure) {
      throw new AdventureNotFoundException();
    }

    if (!equipmentItem) {
      throw new EquipmentItemNotFoundException();
    }

    let newImagePath = '';
    const imagePath: string = equipmentItem.dataValues.image ?? '';

    if (imagePath) {
      const fullImagePath = path.join(path.resolve(__dirname), '..', '..', imagePath);
      const result = cloneFileOnDisk(imagePath, fullImagePath);
      newImagePath = result.newImagePath;
    }

    const adventureItem = AdventureItem.build({
      id: uuidv4(),
      adventureid: id,
      content: equipmentItem.dataValues.content,
      name: equipmentItem.dataValues.name,
      image: newImagePath,
      metadata: equipmentItem.dataValues.metadata
    });

    adventureItem.save();

    const adventureCreatures = await AdventureCreature.findAll({
      where: {
        adventureid: id
      }
    });
  
    const adventureHandouts = await AdventureHandout.findAll({
      where: {
        adventureid: id
      }
    });
  
    const adventureItems = await AdventureItem.findAll({
      where: {
        adventureid: id
      }
    });

    const adventurePlayers = await AdventurePlayer.findAll({
      where: {
        adventureid: id
      }
    });
  
    return this.mapResponseJson(
      adventure,
      adventureCreatures,
      adventureHandouts,
      adventureItems,
      adventurePlayers
    );
  }

  static async addHandoutToAdventure (
    addAdventureHandoutRequest: AddAdventureHandoutRequest
  ): Promise<AdventureResponse> {

    if (!addAdventureHandoutRequest) {
      throw new MissingArgumentException();
    }

    addAdventureHandoutRequest.validate();

    const id = addAdventureHandoutRequest.adventureid;

    const adventure = await Adventure.findOne({
      where: {
        id
      }
    });

    if (!adventure) {
      throw new AdventureNotFoundException();
    }

    const adventureHandout = AdventureHandout.build({
      id: uuidv4(),
      adventureid: id,
      description: addAdventureHandoutRequest.description,
      name: addAdventureHandoutRequest.name,
      url: addAdventureHandoutRequest.url
    });

    adventureHandout.save();

    const adventureCreatures = await AdventureCreature.findAll({
      where: {
        adventureid: id
      }
    });
  
    const adventureHandouts = await AdventureHandout.findAll({
      where: {
        adventureid: id
      }
    });
  
    const adventureItems = await AdventureItem.findAll({
      where: {
        adventureid: id
      }
    });

    const adventurePlayers = await AdventurePlayer.findAll({
      where: {
        adventureid: id
      }
    });
  
    return this.mapResponseJson(
      adventure,
      adventureCreatures,
      adventureHandouts,
      adventureItems,
      adventurePlayers
    );
  }

  static async addMagicItemToAdventure (
    id: string,
    magicItemId: string
  ): Promise<AdventureResponse> {
    if (!id || !magicItemId) {
      throw new MissingArgumentException();
    }

    const adventure = await Adventure.findOne({
      where: {
        id
      }
    });

    const magicItem = await MagicItem.findOne({
      where: {
        id: magicItemId
      }
    });

    if (!adventure) {
      throw new AdventureNotFoundException();
    }

    if (!magicItem) {
      throw new EquipmentItemNotFoundException();
    }

    let newImagePath = '';
    const imagePath: string = magicItem.dataValues.image ?? '';

    if (imagePath) {
      const fullImagePath = path.join(path.resolve(__dirname), '..', '..', imagePath);
      const result = cloneFileOnDisk(imagePath, fullImagePath);
      newImagePath = result.newImagePath;
    }

    const adventureItem = AdventureItem.build({
      id: uuidv4(),
      adventureid: id,
      content: magicItem.dataValues.content,
      name: magicItem.dataValues.name,
      image: newImagePath,
      metadata: magicItem.dataValues.metadata
    });

    adventureItem.save();

    const adventureCreatures = await AdventureCreature.findAll({
      where: {
        adventureid: id
      }
    });
  
    const adventureHandouts = await AdventureHandout.findAll({
      where: {
        adventureid: id
      }
    });
  
    const adventureItems = await AdventureItem.findAll({
      where: {
        adventureid: id
      }
    });

    const adventurePlayers = await AdventurePlayer.findAll({
      where: {
        adventureid: id
      }
    });
  
    return this.mapResponseJson(
      adventure,
      adventureCreatures,
      adventureHandouts,
      adventureItems,
      adventurePlayers
    );
  }

  static async createAdventure(
    adventureCreateRequest: CreateAdventureRequest
  ): Promise<AdventureResponse> {
    if (!adventureCreateRequest) {
      throw new MissingArgumentException();
    }

    adventureCreateRequest.validate();

    const adventure = await Adventure.create({
      description: adventureCreateRequest.description,
      id: adventureCreateRequest.id,
      name: adventureCreateRequest.name,
      system: adventureCreateRequest.system
    });

    return this.mapAdventureResponseJson(adventure);
  }

  static async destroyAdventureById(id: string): Promise<boolean> {
    if (!id) {
      throw new MissingArgumentException();
    }

    const adventure = await Adventure.findOne({
      where: {
        id
      }
    });

    if (!adventure) {
      throw new AdventureNotFoundException();
    }

    const adventureCreatures = await AdventureCreature.findAll({
      where: {
        adventureid: id
      }
    });
  
    const adventureHandouts = await AdventureHandout.findAll({
      where: {
        adventureid: id
      }
    });
  
    const adventureItems = await AdventureItem.findAll({
      where: {
        adventureid: id
      }
    });

    const adventurePlayers = await AdventurePlayer.findAll({
      where: {
        adventureid: id
      }
    });

    for (let x=0; x<adventureCreatures.length; x++) {
      const adventureCreature = adventureCreatures[x];
      await AdventureCreatureService.destroyAdventureCreatureById(adventureCreature.dataValues.id);
    }

    for (let x=0; x<adventureHandouts.length; x++) {
      const adventureHandout = adventureHandouts[x];
      await AdventureHandoutService.destroyAdventureHandoutById(adventureHandout.dataValues.id);
    }

    for (let x=0; x<adventureItems.length; x++) {
      const adventureItem = adventureItems[x];
      await AdventureItemService.destroyAdventureItemById(adventureItem.dataValues.id);
    }

    for (let x=0; x<adventurePlayers.length; x++) {
      const adventurePlayer = adventurePlayers[x];
      await AdventurePlayerService.destroyAdventurePlayerById(adventurePlayer.dataValues.id);
    }

    adventure?.destroy();
    adventure?.save();
  
    return true;
  }

  static async updateAdventureById(id: string, updateAdventureRequest: UpdateAdventureRequest): Promise<AdventureResponse> {
    if (!id || !updateAdventureRequest) {
      throw new MissingArgumentException();
    }

    const adventure = await Adventure.findOne({
      where: {
        id: id
      }
    });

    if (!adventure) {
      throw new AdventureNotFoundException();
    }

    await adventure.update({
      description: updateAdventureRequest.description,
      name: updateAdventureRequest.name,
      notes: updateAdventureRequest.notes,
      system: updateAdventureRequest.system
    });

    return this.mapAdventureResponseJson(adventure);
  }

  static async getAdventures(): Promise<AdventuresResponse> {
    const adventures = await Adventure.findAll();

    if (!adventures.length) {
      throw new AdventuresNotFoundException();    
    }

    return this.mapAdventuresResponseJson(adventures);
  }

  static async getAdventureById(id: string): Promise<AdventureResponse> {
    if (!id) {
      throw new MissingArgumentException();
    }

    const adventure = await Adventure.findOne({
      where: {
        id: id
      }
    });

    if (!adventure) {
      throw new AdventureNotFoundException();
    }
  
    const adventureCreatures = await AdventureCreature.findAll({
      where: {
        adventureid: id
      }
    });
  
    const adventureHandouts = await AdventureHandout.findAll({
      where: {
        adventureid: id
      }
    });
  
    const adventureItems = await AdventureItem.findAll({
      where: {
        adventureid: id
      }
    });

    const adventurePlayers = await AdventurePlayer.findAll({
      where: {
        adventureid: id
      }
    });
  
    return this.mapResponseJson(
      adventure,
      adventureCreatures,
      adventureHandouts,
      adventureItems,
      adventurePlayers
    );
  }

  private static mapAdventureResponseJson (
    adventure
  ): AdventureResponse {
    return adventure.dataValues;
  }

  private static mapAdventuresResponseJson(
    adventures
  ): AdventuresResponse {
    const responseJson: AdventuresResponse = {
      adventures: adventures.map((adventure) => {
        return adventure.dataValues
      })
    };
  
    return responseJson;
  }

  private static mapResponseJson(
    adventure,
    adventureCreatures,
    adventureHandouts,
    adventureItems,
    adventurePlayers,
  ): AdventureResponse {
    const responseJson: AdventureResponse = {
      ...adventure?.dataValues,
      creatures: adventureCreatures.map((c) => {
        return {
          ...c.dataValues,
          metadata: JSON.parse(c.dataValues.metadata)
        };
      }),
      handouts: adventureHandouts.map((h) => h.dataValues),
      items: adventureItems.map((i) => {
        return {
          ...i.dataValues,
          metadata: JSON.parse(i.dataValues.metadata)
        };
      }),
      players: adventurePlayers.map((p) => p.dataValues),
    };
  
    return responseJson;
  }
}