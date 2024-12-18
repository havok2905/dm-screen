import {
  CreateCreatureRequest,
  UpdateCreatureRequest
} from '../requests';
import {
  CreatureNotFoundException,
  CreaturesNotFoundException,
  MissingArgumentException
} from '../exceptions';

import { Creature } from '../sequelize/db';
import { CreatureResponse } from '../responses';
import { deleteImageFromDiskIfItExists } from './utils/deleteImageFromDiskIfItExists';

export class CreatureService {
  static async createCreature(
    createCreatureRequest: CreateCreatureRequest
  ): Promise<CreatureResponse> {
    if (!createCreatureRequest) {
      throw new MissingArgumentException();
    }

    createCreatureRequest.validate();

    const creature = await Creature.create({
      content: createCreatureRequest.content,
      id: createCreatureRequest.id,
      image: createCreatureRequest.image,
      metadata: JSON.stringify(createCreatureRequest.metadata),
      name: createCreatureRequest.name
    });

    return this.mapCreatureResponseJson(creature);
  }

  static async destroyCreatureById(id: string): Promise<boolean> {
    if (!id) {
      throw new MissingArgumentException();
    }

    const creature = await Creature.findOne({
      where: {
        id
      }
    });

    if (!creature) {
      throw new CreatureNotFoundException();
    }

    deleteImageFromDiskIfItExists(creature.dataValues.image);

    creature?.destroy();
    creature?.save();
  
    return true;
  }

  static async getCreatures(): Promise<CreatureResponse[]> {
    const creatures = await Creature.findAll({
      order: [
        [
          'name',
          'ASC'
        ]
      ]
    });

    if (!creatures.length) {
      throw new CreaturesNotFoundException();    
    }

    return this.mapResponseJson(creatures);
  }

  static async getCreatureById(id: string): Promise<CreatureResponse> {
    if (!id) {
      throw new MissingArgumentException();
    }

    const creature = await Creature.findOne({
      where: {
        id: id
      }
    });

    if (!creature) {
      throw new CreatureNotFoundException();
    }

    return this.mapCreatureResponseJson(
      creature
    );
  }

  static async updateCreatureById(id: string, updateCreatureRequest: UpdateCreatureRequest): Promise<CreatureResponse> {
    if (!id || !updateCreatureRequest) {
      throw new MissingArgumentException();
    }

    updateCreatureRequest.validate();

    const creature = await Creature.findOne({
      where: {
        id: id
      }
    });

    if (!creature) {
      throw new CreatureNotFoundException();
    }

    await creature.update({
      content: updateCreatureRequest.content,
      image: updateCreatureRequest.image,
      metadata: JSON.stringify(updateCreatureRequest.metadata),
      name: updateCreatureRequest.name
    });

    return this.mapCreatureResponseJson(creature);
  }

  private static mapCreatureResponseJson (
    creature
  ): CreatureResponse {
    return {
      ...creature.dataValues,
      metadata: JSON.parse(creature.dataValues.metadata)
    };
  }

  private static mapResponseJson (
    creatures
  ): CreatureResponse[] {
    return creatures.map(creature => {
      return {
        ...creature.dataValues,
        metadata: JSON.parse(creature.dataValues.metadata)
      };
    });
  }
}