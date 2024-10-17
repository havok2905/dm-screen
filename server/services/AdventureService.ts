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

import { v4 as uuidv4 } from 'uuid';

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

    const adventureCreature = AdventureCreature.build({
      id: uuidv4(),
      adventureid: id,
      content: creature.dataValues.content,
      name: creature.dataValues.name,
      image: creature.dataValues.image,
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
  
    return this.mapResponseJson(
      adventure,
      adventureCreatures,
      adventureHandouts,
      adventureItems
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

    const adventureItem = AdventureItem.build({
      id: uuidv4(),
      adventureid: id,
      content: equipmentItem.dataValues.content,
      name: equipmentItem.dataValues.name,
      image: equipmentItem.dataValues.image,
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
  
    return this.mapResponseJson(
      adventure,
      adventureCreatures,
      adventureHandouts,
      adventureItems
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
  
    return this.mapResponseJson(
      adventure,
      adventureCreatures,
      adventureHandouts,
      adventureItems
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

    const adventureItem = AdventureItem.build({
      id: uuidv4(),
      adventureid: id,
      content: magicItem.dataValues.content,
      name: magicItem.dataValues.name,
      image: magicItem.dataValues.image,
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
  
    return this.mapResponseJson(
      adventure,
      adventureCreatures,
      adventureHandouts,
      adventureItems
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
  
    return this.mapResponseJson(
      adventure,
      adventureCreatures,
      adventureHandouts,
      adventureItems
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
    adventureItems
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
      })
    };
  
    return responseJson;
  }
}