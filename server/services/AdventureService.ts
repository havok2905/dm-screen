import {
  Adventure,
  AdventureCreature,
  AdventureHandout,
  AdventureItem
} from '../sequelize/db';
import {
  AdventureNotFoundException,
  AdventuresNotFoundException,
  MissingArgumentException
} from '../exceptions';
import {
  AdventureResponse,
  AdventuresResponse
} from '../responses';
import {
  CreateAdventureRequest,
  UpdateAdventureRequest
} from '../requests';

export class AdventureService {
  static async createAdventure(
    adventureCreateRequest: CreateAdventureRequest
  ): Promise<AdventureResponse> {
    if (!adventureCreateRequest) {
      throw new MissingArgumentException();
    }

    adventureCreateRequest.validate();

    const adventure = Adventure.build({
      description: adventureCreateRequest.description,
      id: adventureCreateRequest.id,
      name: adventureCreateRequest.name,
      system: adventureCreateRequest.system
    });

    const savedAdventure = await adventure.save();

    return this.mapAdventureResponseJson(savedAdventure);
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