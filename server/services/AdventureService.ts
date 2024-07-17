import {
  Adventure,
  AdventureCreature,
  AdventureHandout,
  AdventureItem
} from '../sequelize/db';
import {
  AdventureResponse,
  AdventuresResponse
} from '../responses';

import {
  AdventureNotFoundException,
  AdventuresNotFoundException,
  MissingArgumentException
} from '../exceptions';

export class AdventureService {
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