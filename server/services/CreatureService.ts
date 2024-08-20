import { Creature } from '../sequelize/db';
import { CreatureResponse } from '../responses';
import { CreaturesNotFoundException } from '../exceptions';

export class CreatureService {
  static async getCreatures(): Promise<CreatureResponse[]> {
    const creatures = await Creature.findAll();

    if (!creatures.length) {
      throw new CreaturesNotFoundException();    
    }

    return this.mapResponseJson(creatures);
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