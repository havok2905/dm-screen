import { v4 as uuidv4 } from 'uuid';

import {
  InitiativeNotFoundException,
  MissingArgumentException
} from '../exceptions';

import { Initiative } from '../sequelize/db';
import { InitiativeResponse } from '../responses';

export class InitiativeService {
  static async bootstrapInitiativeByAdventureId(adventureid: string): Promise<InitiativeResponse | null> {
    if (!adventureid) {
      throw new MissingArgumentException();
    }

    const foundInitiative = await Initiative.findAll({
      where: {
        adventureid
      }
    });
  
    if(foundInitiative.length) {
      return null;
    }
  
    const initiative = await Initiative.create({
      id: uuidv4(),
      adventureid,
      initiativeOrderState: JSON.stringify({
        currentId: '',
        items: [],
        round: 1
      })
    });
  
    return this.mapResponseJson(initiative);
  }

  static async destroyInitiativeById(id: string): Promise<boolean> {
    if (!id) {
      throw new MissingArgumentException();
    }

    const initiative = await Initiative.findOne({
      where: {
        id
      }
    });

    if (!initiative) {
      throw new InitiativeNotFoundException();
    }
  
    initiative?.destroy();
    initiative?.save();
  
    return true;
  }

  static async getInitiativeByAdventureId(adventureid: string): Promise<InitiativeResponse | null> {
    if (!adventureid) {
      throw new MissingArgumentException();
    }

    const initiative = await Initiative.findOne({
      where: {
        adventureid
      }
    });
  
    if (!initiative) {
      throw new InitiativeNotFoundException();
    }
  
    return this.mapResponseJson(initiative);
  }

  static async updateInitiativeById(id: string, updateRequest): Promise<InitiativeResponse | null> {
    if (!id) {
      throw new MissingArgumentException();
    }

    const initiative = await Initiative.findOne({
      where: {
        id
      }
    });
  
    if (!initiative) {
      throw new InitiativeNotFoundException();
    }

    const { initiativeOrderState } = updateRequest ?? {};

    initiative.update({ initiativeOrderState });
    initiative.save();

    return this.mapResponseJson(initiative);
  }

  private static mapResponseJson(initiative): InitiativeResponse {
    const responseJson: InitiativeResponse = {
      ...initiative?.dataValues,
      initiativeOrderState: JSON.parse(initiative?.dataValues?.initiativeOrderState ?? ''),
    };
  
    return responseJson;
  }
}
