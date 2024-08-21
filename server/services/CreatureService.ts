import {
  CreatureNotFoundException,
  CreaturesNotFoundException,
  MissingArgumentException
} from '../exceptions';

import { Creature } from '../sequelize/db';
import { CreatureResponse } from '../responses';

export class CreatureService {
  static async getCreatures(): Promise<CreatureResponse[]> {
    const creatures = await Creature.findAll();

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