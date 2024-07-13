import { v4 as uuidv4 } from 'uuid';

import {
  Initiative
} from '../sequelize/db';
import {
  InitiativeResponse
} from '../responses';

export class InitiativeService {
  static async bootstrapInitiativeByAdventureId(adventureid: string): Promise<InitiativeResponse | null> {
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
    const initiative = await Initiative.findOne({
      where: {
        id
      }
    });

    if (!initiative) return false;
  
    initiative?.destroy();
    initiative?.save();
  
    return true;
  }

  static async getInitiativeByAdventureId(adventureid: string): Promise<InitiativeResponse | null> {
    const initiative = await Initiative.findOne({
      where: {
        adventureid
      }
    });
  
    if (!initiative) return null;
  
    return this.mapResponseJson(initiative);
  }

  static async updateInitiativeById(id: string, updateRequest): Promise<InitiativeResponse | null> {
    const initiative = await Initiative.findOne({
      where: {
        id
      }
    });
  
    if (!initiative) return null;

    const { initiativeOrderState } = updateRequest;

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
