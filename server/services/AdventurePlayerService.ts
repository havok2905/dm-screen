import {
  AdventurePlayerNotFoundException,
  MissingArgumentException
} from '../exceptions';

import { AdventurePlayer } from '../sequelize/db';
import { AdventurePlayerResponse } from '../responses';
import { deleteImageFromDiskIfItExists } from './utils/deleteImageFromDiskIfItExists';

import {
  CreateAdventurePlayerRequest,
  UpdateAdventurePlayerRequest
} from '../requests';

export class AdventurePlayerService {
  static async createAdventurePlayer(adventurePlayerRequest: CreateAdventurePlayerRequest) {
    if (!adventurePlayerRequest) {
      throw new MissingArgumentException();
    }

    adventurePlayerRequest.validate();

    const adventurePlayer = await AdventurePlayer.create({
      ac: adventurePlayerRequest.ac,
      adventureid: adventurePlayerRequest.adventureid,
      charactername: adventurePlayerRequest.charactername,
      id: adventurePlayerRequest.id,
      image: adventurePlayerRequest.image,
      playername: adventurePlayerRequest.playername
    });

    return this.mapResponseJson(adventurePlayer);
  }

  static async destroyAdventurePlayerById(id: string): Promise<boolean> {
    if (!id) {
      throw new MissingArgumentException();
    }

    const adventurePlayer = await AdventurePlayer.findOne({
      where: {
        id
      }
    });

    if (!adventurePlayer) {
      throw new AdventurePlayerNotFoundException();
    }

    deleteImageFromDiskIfItExists(adventurePlayer.dataValues.image);

    adventurePlayer?.destroy();
    adventurePlayer?.save();
  
    return true;
  }

  static async updateAdventurePlayerById(id: string, updateAdventurePlayerRequest: UpdateAdventurePlayerRequest): Promise<AdventurePlayerResponse> {
    if (!id || !updateAdventurePlayerRequest) {
      throw new MissingArgumentException();
    }

    updateAdventurePlayerRequest.validate();

    const adventurePlayer = await AdventurePlayer.findOne({
      where: {
        id: id
      }
    });

    if (!adventurePlayer) {
      throw new AdventurePlayerNotFoundException();
    }

    await adventurePlayer.update({
      ac: updateAdventurePlayerRequest.ac,
      adventureid: updateAdventurePlayerRequest.adventureid,
      charactername: updateAdventurePlayerRequest.charactername,
      image: updateAdventurePlayerRequest.image,
      playername: updateAdventurePlayerRequest.playername
    });

    return this.mapResponseJson(adventurePlayer);
  }

  private static mapResponseJson (
    adventurePlayer
  ): AdventurePlayerResponse {
    return {
      ...adventurePlayer.dataValues
    };
  }
}
